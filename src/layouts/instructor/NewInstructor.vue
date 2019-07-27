<template>
    <v-container>
        <v-layout align-center justify-center row wrap>
      <v-flex xs12 my-5>
        <v-layout justify-center align-center>
          <v-avatar size="100" color="grey lighten-4">
            <img :src="user.avatar" alt="avatar">
          </v-avatar>
          <span class="font-weight-medium display-1 ml-4">{{user.fullName}}</span>
        </v-layout>
      </v-flex>
      <v-flex xs10>
        <v-layout>
          <v-flex>
            <FixedProfile/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10 mt-4>
        <Certificate/>
      </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import FixedProfile from '@/components/Profile/FixedProfile'
import Certificate from '@/components/Profile/Certificate'
export default {
    components: {
        FixedProfile,
        Certificate
    },
    data() {    
        return  {
            user: {
                userId:276,
                email:"tuyetnganphamhoang@gmail.com",
                fullName:"Julie Pham",
                avatar:"https://lh4.googleusercontent.com/-c4efecSF-vM/AAAAAAAAAAI/AAAAAAAADdA/9h-G2HMkrOM/photo.jpg",
                createdDate:"2019-06-22T04:17:42.000+0000",
                point:1000,
                roleId:3,
                achievement:null,
                certificates:[],
                courseDetailViewModels:[],
                provider:"google",
                providerId:"100927363146913875662",
                active:true,
                roleName:"Quản trị viên",
                status:"Kích hoạt"
            }
        }
    },
}
</script>

<style>

</style>
