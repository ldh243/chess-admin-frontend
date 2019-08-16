<template>
<div>
    <PieChart :name="pieChartName" :dataRows="dataRows" :id="id"/>
</div>
</template>
<script>
import PieChart from './GoogleCharts/PieChart'
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
            this.dataRows.push(['Cấp độ 1',this.calculateTotals(data,0)])
            this.dataRows.push(['Cấp độ 2',this.calculateTotals(data,1)])
            this.dataRows.push(['Cấp độ 3',this.calculateTotals(data,2)])
            this.dataRows.push(['Cấp độ 4',this.calculateTotals(data,3)])
            this.dataRows.push(['Cấp độ 5',this.calculateTotals(data,4)])
        },
        calculateTotals(data,level){
            var total = 0
            for(var i = 0; i < 5;i++){
                total += data[i + 5 * level]
            }
            return total
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
