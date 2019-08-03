<template>
    <v-menu
      v-model="notification"
      :close-on-content-click="false"
      offset-y bottom left
      transition="slide-y-transition"
    >
    <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon color="grey">
      <v-badge color="red darken-1" right overlap>
        <template v-slot:badge>{{unreadNotifications}}</template>
        <v-icon>fa-bell</v-icon>
      </v-badge>
    </v-btn>
      </template>
        <v-list>
          <div v-for="(item,index) in notifications" :key="index" :class=" !item.viewed ? 'unread_notification' : ''">
            <v-list-item @click="redirectToNotificationItem(index)">
              <v-list-item-avatar>
                <img :src="item.objectAvatar" :alt="item.objectName">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{item.objectName}} {{item.content}}</v-list-item-title>
                <v-list-item-subtitle>{{moment(item.createDate).add(VNTimeZone,'hours').fromNow()}}</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          </div>
          <div class="text-xs-center pt-2">
            <v-layout justify-center>
              <a>Xem tất cả</a>
            </v-layout>
          </div>
        </v-list>
    </v-menu>
</template>

<script>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import Moment from '@/assets/js/Moment'
const notificationRepository = RepositoryFactory.get('notification')
const MomentSetting = new Moment()
export default {
    props:{
        pageSize:{
            required:true,
            type:Number
        },
        sortBy:{
            required:false,
            type:String,
            default:''
        },
        sortDirection:{
            required:false,
            type:String,
            default:''
        }
    },
    data(){
      return{
        notifications:[],
        unreadNotifications:0,
        page:1,
        VNTimeZone:7,
        moment:MomentSetting.getInstance(),
        ObjectType:{
          User:0,
          Course:1,
          Review:4
        }
      }
    },
    methods:{
        async getNotification(){
            const data = await notificationRepository.getNotificationPagination(this.page,this.pageSize,this.sortBy,this.sortDirection)
            if(data.data.data){
                this.unreadNotifications = data.data.data.totalNotViewedElements
                this.notifications = data.data.data.data.content
            }
        },
        async updateIsViewed(notificationIds){
            const data = await notificationRepository.updateIsViewed(notificationIds)
            console.log(data.data)
        },
        redirectToNotificationItem(index){
          if(!this.notifications[index].viewed){
            var notificationIds = []
            notificationIds.push(this.notifications[index].notificationId)
            this.updateIsViewed(notificationIds)
            this.notifications[index].viewed = true
            this.unreadNotifications--
          }
          this.handleRedirect(this.notifications[index])
        },
        handleRedirect(notification){
          if(this.$store.state.user.roleId == 3){
            switch(notification.objectTypeId){
              case this.ObjectType.User:
                this.$router.push(`/dashboard/instructor-request?email=${notification.objectName}`)
              break
              case this.ObjectType.Course:
                this.$router.push(`/dashboard/courses?courseName=${notification.objectName}&status=4`)
              break
            }
          }else if(this.$store.state.user.roleId == 1){
            switch(notification.objectTypeId){
              case this.ObjectType.User:
                this.$router.push(`/dashboard/profile`)
              break
              case this.ObjectType.Course:
                this.$router.push(`/dashboard/courses?courseName=${notification.objectName}`)
              break
              case this.ObjectType.Review:
                window.open('http://cols-capstone.ml/course/' + notification.objectId)
              break
            }
          }
        },
    },
    mounted(){
        this.getNotification()
    },
    watch:{
        pageSize:{
            handler:function(){
                this.getNotification()
            }
        }
    }
}
</script>

        