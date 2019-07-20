<template>
  <v-container fluid>
    <v-layout align-center justify-center row wrap>
        <v-flex xs10>
          <v-form ref="form" lazy-validation>
                <v-card class="hide-overflow">
                    <p v-if="errors.length > 0">
                        <ul style="list-style-type:none;">
                            <li v-for="error in errors" class="text-danger">{{ error }}</li>
                        </ul>
                    </p>
                    <v-toolbar card>
                        <v-text-field label="Tên Bài Học:" v-model="name"></v-text-field>
                    </v-toolbar>
                    <v-card-text>
                        <ckeditor5 :content="content"/>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                    color="success" 
                    @click="isEditting ? updateUninteractiveLesson() : createUninteractiveLesson()" 
                    v-text="isEditting ? 'Lưu' : 'Thêm'"></v-btn>
                </v-card-actions>
                </v-card>
            </v-form>
        </v-flex>
        <Loader v-if="loader" />
    </v-layout>
  </v-container>
</template>
<script>
    import ckeditor5 from '@/components/HtmlEditor/Ckeditor5'
    import Loader from '@/components/Loader'
    import Swal from 'sweetalert2'
    import { RepositoryFactory } from '@/repository/RepositoryFactory'
    const lessonRepository = RepositoryFactory.get('lesson')
    
    export default {
        components:{
            ckeditor5,
            Loader  
        },
        props:{
            
            isEditting:{
                required:true,
                type:Boolean
            },

            lessonId:{
                required : false,
                type:Number,
                default:0
            },

            courseId:{
                required : false,
                type:Number,
                default:0
            }
        },
        data(){
            return{
                lessonIdCreated:0,
                content: "",
                name:"",
                editor: ckeditor5,
                errors:[],
                loader: false,
                uninteractiveLessonId:0
            }
        },
        watch:{
            //help passing data from child to parent after created
            // id and name will help you display in list lesson
            lessonIdCreated:{
                handler:function(){
                    this.$emit('newdata',[this.lessonIdCreated,this.name])
                },
                deep:true
            }
        },
        mounted(){
            if(this.isEditting){
                this.getById(this.lessonId)
            }
        },
        methods:{
            async createUninteractiveLesson(){
               this.loader = true
               if(this.checkForm()){
                   this.loader = false
                   return
               }
               const data = await lessonRepository.createUninteractiveLesson(
                   this.name,this.editor.methods.getVal(),this.courseId
               )
               if(data.data.data.success){
                   //set id when success
                   this.lessonIdCreated = data.data.data.savedId

                   Swal.fire({
                    title:this.name,
                    text:"đã được thêm thành công",
                    type:'success'
                    })
               }else{
                   Swal.fire({
                    title:'Oops...',
                    text:"đã có lỗi diễn ra trong quá trình lưu",
                    type:'error'
                    })
               }
               this.loader = false
            },
            async getById(){
                this.loader = true
                const data = await lessonRepository.getById(this.lessonId)
                this.loader = false
                this.name = data.data.data.name
                this.content = data.data.data.uninteractiveLesson.content
                this.uninteractiveLessonId = data.data.data.uninteractiveLesson.uninteractiveLessonId
            },
            async updateUninteractiveLesson(){
                this.loader = true
               if(this.checkForm()){
                   this.loader = false
                   return
               }
               const data = await lessonRepository.updateUninteractiveLesson(
                   this.lessonId,this.name,{
                       content:this.editor.methods.getVal(),
                       uninteractiveLessonId:this.uninteractiveLessonId
                   }
               )
               if(data.data.data){
                    Swal.fire({
                    title:this.name,
                    text:"đã được lưu thành công",
                    type:'success'
                    })
               }else{
                    Swal.fire({
                    title:'Oops...',
                    text:"đã có lỗi diễn ra trong quá trình lưu",
                    type:'error'
                    })
               }
               this.loader = false
            },
            //return true if error
            checkForm : function(){
                this.errors = [];
                
                if(!this.name || this.name.length < 6){
                    this.errors.push("Tên bài học phải nhiều hơn 6 ký tự")
                }

                return this.errors.length > 0 ? true : false
            },
        }

    }
</script>
<style scoped>
 input {
  color: #757575 !important;
}
.text-danger {
    color: #dc3545!important;
}
</style>
