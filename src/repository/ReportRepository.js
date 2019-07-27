import Repository from '@/repository/Repository'
const resource = '/report'

export default{
    getEnrollment(year){
        const data = {
            params: {
                year : year 
            }
        }
        return Repository.get(`${resource}/get-enrollment-report`,data)
    },
    getLeanerStatusCourse(page,pageSize,courseName){
        const data = {
            params: {
                page : page ,
                pageSize : pageSize,
                courseName: courseName
            }
        }
        return Repository.get(`${resource}/get-learner-status-course`,data)
    },
    getUsersRegister(year){
        const data = {
            params: {
                year : year 
            }
        }
        return Repository.get(`${resource}/get-users-register-report`,data)
    },
    getRateWinnable(year){
        const data = {
            params: {
                year : year 
            }
        }
        return Repository.get(`${resource}/get-rate-winnable-report`,data)
    },
    getRateLevelWinnable(year,isWin){
        const data = {
            params: {
                year : year ,
                isWin : isWin
            }
        }
        return Repository.get(`${resource}/get-rate-winnable-level-report`,data)
    }
}