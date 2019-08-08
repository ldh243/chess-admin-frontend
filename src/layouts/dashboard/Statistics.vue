<template>
  <v-container fluid>
    <div v-if="userRoleId == 1">
      <MonthLineChart 
      :monthChartName="enrollmentMonthLineChartNmae" 
      :chartCaptions="enrollmentChartCaption" 
      :fnGetDataAPI="getEnrollment"/>
      <v-text-field label="Search" v-model="courseNameSearch"/>
      <LearnerStatusCourseChart :courseName="courseNameSearch"/>
    </div>
    <div v-if="userRoleId == 3">
      <MonthLineChart 
      :monthChartName="userRegisterMonthLineChartName" 
      :chartCaptions="userRegisterChartCaption" 
      :fnGetDataAPI="getUsersRegister"/>
      <MonthColumnChart 
            :name="RateWinnableChartName" 
            :monthChartColumns="RateWinnableColumnSettings"
            :fnGetDataAPI="getRateWinnable" @newdata="handleYearTrigger($event)"/>
      <table>
        <tr>
          <td>
            <RateWinnableLevelChart
            :nameChart="winRateLevelChartName"
            :year="yearExchangeComponents"
            :id="winLevelChartId"
            />
            <div id="LevelChart"/>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
import LearnerStatusCourseChart from '@/components/Charts/LearnerStatusCourseChart'
import MonthLineChart from '@/components/Charts/MonthLineChart'
import MonthColumnChart from '@/components/Charts/MonthColumnChart'
import RateWinnableLevelChart from '@/components/Charts/RateWinnableLevelChart'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const reportRepository = RepositoryFactory.get('report')
const userRepository = RepositoryFactory.get('user')
var dt = new Date()
export default {
  data(){
      return{
        userRoleId:0,
        userRegisterMonthLineChartName: "Biểu đồ lượt đăng ký tài khoản",
        userRegisterChartCaption:["Tháng","Google"],
        enrollmentMonthLineChartNmae: "Biểu đồ lượt đăng ký",
        enrollmentChartCaption:["Tháng","Lượt đăng ký"],
        RateWinnableChartName:"Biểu đồ kết quả chơi cờ với bot",
        RateWinnableColumnSettings:[
          ["string","Tháng"],
          ["number","bỏ cuộc"],
          ["number","Thua"],
          ["number","Hòa"],
          ["number","Thắng"],
        ],
        winRateLevelChartName: "Biểu đồ kết quả chơi cờ với bot theo level",
        winLevelChartId:"LevelChart",
        yearExchangeComponents:dt.getFullYear(),
        courseNameSearch:""
      }
  },
  components: {
    MonthLineChart,
    LearnerStatusCourseChart,
    MonthColumnChart,
    RateWinnableLevelChart
  },
  methods:{
    async getCurrentUserDetail(){
      const user = await userRepository.getCurrentUserDetail()
      if(user.roleId){
        this.userRoleId = user.roleId
      }
    },
    async getUsersRegister(year){
      return await reportRepository.getUsersRegister(year)
    },
    async getEnrollment(year){
      return await reportRepository.getEnrollment(year)
    },
    async getRateWinnable(year){
      return await reportRepository.getRateWinnable(year)
    },
    handleYearTrigger(e){
      this.yearExchangeComponents = e
    }
  },
  mounted(){
    this.getCurrentUserDetail()
  }
}
</script>

<style></style>
