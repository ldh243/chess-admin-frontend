<template>
<div>
  <div v-if="isLoading">
    <v-img height="50px" width="50px" :src="loadingImg"/>
  </div>
  <div v-if="!isLoading">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-flex xs2>
        <v-select label="Số lượng dòng" :items="pageSizeOptions" v-model="pageSize"/>
      </v-flex>
    </v-card-title>
    <TableChart 
    :name="name" 
    :columnSettings="columnSettings" 
    :dataRows="dataRows" 
    :height="height" 
    :width="width"
    :page="page"
    :totalPages="totalPages"
    @newdata="handlePagination($event)"/>
  </div>
</div>
</template>
<script>
import TableChart from '@/components/GoogleCharts/TableChart'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const reportRepository = RepositoryFactory.get('report')

export default {
  components: {
    TableChart
  },
  props:{
    courseName:{
      require:false,
      type:String,
      default:""
    }
  },
  data(){
      return {
        name:"Bảng báo cáo trạng thái học của học viên",
        columnSettings:[
            ['string','Khóa học'],
            ['number','Đạt'],
            ['number','Đang học'],
            ['number','Không đạt'],
            ['string','Công khai']
        ],
        dataRows:[],
        height:'100%',
        width:'100%',
        page:1,
        pageSize:10,
        pageSizeOptions:[10,20,50],
        totalPages:0,
        loadingImg: require('@/assets/images/loading.gif'),
        isLoading: false
      }
  },
  mounted(){
    this.getLeanerStatusCourse()
  },
  methods:{
    async getLeanerStatusCourse(){
      this.isLoading = true
      const data = await reportRepository.getLeanerStatusCourse(this.page,this.pageSize,this.courseName.trim())
      if(data.data.data){
        this.handleLearnerStatusCourseData(data.data.data)
        this.isLoading = false
      }
    },
    handleLearnerStatusCourseData(data){
      this.dataRows = []

      for(var i = 0; i < data.content.length;i++){
        this.dataRows.push([data.content[i].courseName
        ,data.content[i].counterPassedStatus
        ,data.content[i].counterInProcessStatus
        ,data.content[i].counterNotPassedStatus
        ,data.content[i].courseStatus === 2 ? '<i aria-hidden="true" style="color:green;" class="v-icon fas fa-check-circle"/>' : '<i aria-hidden="true" class="v-icon fas fa-check-circle theme--light"/>'])
      }

      this.totalPages = data.totalPages
    },
    handlePagination(e){
      this.page = e
      this.getLeanerStatusCourse()
    }
  },
  watch:{
    courseName:{
      handler:function(){
        if(this.courseName.trim().length >= 2 || this.courseName == ''){
          this.page = 1
          this.getLeanerStatusCourse()
        }
      }
    },
    pageSize:{
      handler:function(){
        this.page = 1
        this.getLeanerStatusCourse()
      }
    }
  }
}
</script>
