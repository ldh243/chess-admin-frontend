import Repository from '@/repository/Repository'

const resource = '/notification'

export default {
    getNotificationPagination(page, pageSize,sortBy,sortDirection) {
        const data = { 
            params: { 
                page: page, 
                pageSize: pageSize,
                sortBy: sortBy,
                sortDirection: sortDirection
            } 
        }
        return Repository.get(`${resource}/get-current-user-notifications-pagination`, data)
    },
    updateIsViewed(notificationIds){
        const data = {
            notificationIds: notificationIds
        }
        return Repository.put(`${resource}/update-is-viewed`, data)
    },
    updateNotificationToken(token){
        const data = {
            token: token
        }
        return Repository.post(`${resource}/update-notification-token`, data)
    }
}