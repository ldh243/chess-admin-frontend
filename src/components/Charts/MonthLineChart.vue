<template>
  <div>
    <div v-if="isLoading">
      <v-img height="50px" width="50px" :src="loadingImg"/>
    </div>
    <div v-if="!isLoading">
      <select v-model="chartYear">
        <option v-for="year in listYears">{{year}}</option>
      </select>
      <LineChart :name="lineChartName" :data="chartData"/>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/GoogleCharts/LineChart'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
var dt = new Date()

export default {
  props:{
      monthChartName:{
          require:true,
          Type:String
      },
      chartCaptions:{
          require:true,
          Type:Array
      },
      fnGetDataAPI:{
          require:true,
          Type:Function
      }
  },  
  data(){
      return{
        lineChartName:"",
        chartData:[],
        chartYear:dt.getFullYear(),
        listYears:[],
        loadingImg: require('@/assets/images/loading.gif'),
        isLoading: false
      }
  },
  components: {
    LineChart
  },
  mounted(){
    //setting for enrollment report
    this.getData()
    this.handleYearDisplay()
  },
  methods:{
    async getData(){
      this.isLoading = true
      const data = await this.fnGetDataAPI(this.chartYear)
      if(data.data.data){
        this.lineChartName = this.monthChartName + " " + this.chartYear
        this.handleData(data.data.data)
        this.isLoading = false
      }
    },
    handleData(data){
      var currentYear = dt.getFullYear()
      var currentMonth = dt.getMonth() + 1

      var lengthMonthReport = currentYear == this.chartYear ? currentMonth : data.length 
      //clear data 
      this.chartData = []

      //set first row caption
      this.chartData.push(this.chartCaptions)
      for(var i = 0; i < lengthMonthReport;i++){
        this.chartData.push(["Tháng " + (i + 1),data[i]])
      }
    },
    async handleYearDisplay(){
      const data = await userRepository.getCurrentUserDetail()
      var userCreatedYear = (new Date(data.createdDate)).getFullYear()
      for(var i = dt.getFullYear();i >= userCreatedYear; i--){
        this.listYears.push(i)
      }
    },
  },
  watch:{
    chartYear:{
      handler:function(){
        this.getData()
      }
    }
  }
}
</script>
