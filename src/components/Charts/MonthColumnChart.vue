<template>
  <div>
    <div v-if="isLoading">
      <v-img height="50px" width="50px" :src="loadingImg"/>
    </div>
    <div v-if="!isLoading">
      <select v-model="chartYear">
        <option v-for="year in listYears">{{year}}</option>
      </select>
      <ColumnChart :name="columnChartName" :columnSettings="monthChartColumns" :dataRows="chartData"/>
    </div>
  </div>
</template>
<script>
import ColumnChart from '@/components/GoogleCharts/ColumnChart'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')

var dt = new Date()
export default {
    props:{
        name:{
            required:true,
            type:String,
        },
        monthChartColumns:{
            required:true,
            type:Array
        },
        fnGetDataAPI:{
          require:true,
          Type:Function
        }
    },
    components:{
        ColumnChart
    },
    data(){
        return{
            chartData:[],
            columnChartName:"",
            chartYear:dt.getFullYear(),
            listYears:[],
            loadingImg: require('@/assets/images/loading.gif'),
            isLoading: false
        }
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
                this.columnChartName = this.name + " " + this.chartYear
                this.handleData(data.data.data)
                this.isLoading = false
            }
        },
        async handleYearDisplay(){
            const data = await userRepository.getCurrentUserDetail()
            var userCreatedYear = (new Date(data.createdDate)).getFullYear()
            for(var i = dt.getFullYear();i >= userCreatedYear; i--){
                this.listYears.push(i)
            }
        },
        handleData(data){
            var currentYear = dt.getFullYear()
            var currentMonth = dt.getMonth() + 1

            var lengthMonthReport = currentYear == this.chartYear ? currentMonth : 12 
            //clear data 
            this.chartData = []

            for(var i = 0; i < lengthMonthReport;i++){
                this.chartData.push(["Tháng " + (i + 1),data[i],data[i + 12]])
            }
        },
    },
    watch:{
        chartYear:{
        handler:function(){
            this.getData()
            this.$emit('newdata',parseInt(this.chartYear))
        }
        }
    }
}
</script>
