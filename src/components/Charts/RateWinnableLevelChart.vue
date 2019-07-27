<template>
<div>
    <PieChart :name="pieChartName" :dataRows="dataRows" :id="id"/>
</div>
</template>
<script>
import PieChart from '@/components/GoogleCharts/PieChart'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const reportRepository = RepositoryFactory.get('report')
export default {
    components:{
        PieChart
    },
    props:{
        nameChart:{
            required:true,
            type:String
        },
        isWin:{
            required:false,
            type:Number,
            default:1
        },
        year:{
            required:true,
            type:Number
        },
        id:{
            required:true,
            type:String
        }
    },
    data(){
        return{
            dataRows:[],
            pieChartName:"",
        }
    },
    methods:{
        async getData(){
            const data = await reportRepository.getRateLevelWinnable(this.year,this.isWin)
            if(data.data.data){
                this.handleData(data.data.data)
            }
        },
        handleData(data){
            this.pieChartName = this.nameChart + " " + this.year
            this.dataRows = []

            this.dataRows.push(['This is header','header type'])
            for(var i = 0; i < data.length;i++){
                this.dataRows.push(['Level ' + (i + 1),data[i]])
            }
        }
    },
    mounted(){
        this.getData()
    },
    watch:{
        year:{
            handler:function(){
                this.getData()
            },
            deep:true
        }
    }
}
</script>
