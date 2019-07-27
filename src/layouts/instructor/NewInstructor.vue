<template>
    <v-container class="pa-6">
    <v-layout align-start justify-space-between v-if="user != null">
      <v-flex xs4>
            <HighlightProfile/>
            <v-card-actions class="mt-2">
                <v-spacer></v-spacer>
                <v-btn width="120" depressed large class="mr-2" color="success">Đồng ý</v-btn>
                <v-btn width="120" depressed large color="error">Từ chối</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
      </v-flex>
      <v-flex xs8>
        <ProfileInfo :isInstructor="true"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HighlightProfile from '@/components/Profile/HighlightProfile'
import ProfileInfo from '@/components/Profile/ProfileInfo'
export default {
    components: {
        HighlightProfile,
        ProfileInfo
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

<style scoped>
.xs4 {
  max-width: 31.5%;
}
</style>
