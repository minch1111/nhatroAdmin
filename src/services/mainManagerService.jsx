import api from "../config/api"
import React, { useContext } from 'react'





const mainManageService = {
    getAllStaff() {
        return fetch(`${api}/account/staff`).then(res => res.json())
    },
    updatePermissionStaff(id, form) {
        return fetch(`${api}/account/staff/update/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
        ).then(res => res.json())
    },
    addNewStaff(form) {
        return fetch(`${api}/account/staff/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    removeStaff(id) {
        return fetch(`${api}/account/staff/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getAllPermissions() {
        return fetch(`${api}/permission`).then(res => res.json())
    },
    getAllVouchers() {
        return fetch(`${api}/voucher`).then(res => res.json())
    },
    addNewVoucher(form) {
        return fetch(`${api}/voucher/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    updateVoucher(id, form) {
        return fetch(`${api}/voucher/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    addNews(form) {
        return fetch(`${api}/media/news/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    getListNews() {
        return fetch(`${api}/media/news`).then(res => res.json())
    },
    updateNewsItem(slug, form) {
        return fetch(`${api}/media/news/update/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    removeNewsItem(slug) {
        return fetch(`${api}/media/news/delete/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getListOrder() {
        return fetch(`${api}/order/staff`).then(res => res.json())
    },
    confirmOrder(staff, idOrder) {
        return fetch(`${api}/order/staff/confirm/${idOrder}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staff)
        }).then(res => res.json())
    },
    addNewReport(form) {
        return fetch(`${api}/order/staff/statistical/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    getAllReport() {
        return fetch(`${api}/order/staff/statistical`).then(res => res.json())
    },
    getReportByIdMonth(id) {
        return fetch(`${api}/order/staff/statistical/${id}`).then(res => res.json())
    },
    getOrderDetail(id) {
        return fetch(`${api}/order/staff/detail/${id}`).then(res => res.json())
    },
    getListRate() {
        return fetch(`${api}/media/rate`).then(res => res.json())
    },
    getRateDetailById(id) {
        return fetch(`${api}/media/rate/${id}`).then(res => res.json())
    },
    repRate(id, form) {
        return fetch(`${api}/media/rate/rep/${id} `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    removeRepRate(id) {
        return fetch(`${api}/media/rate/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    updateRepRate(id, form) {
        return fetch(`${api}/media/rate/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    removeReport(id) {
        return fetch(`${api}/order/staff/statistical/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
    ,
    home() {
        return fetch(`${api}/all`).then(res => res.json())
    },
    getListCustomer() {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        return fetch(`${api}cho-gui-duyet-tin-tuc`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(res => res.json())
    },
    getDetailNews(id) {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        return fetch(`${api}chi-tiet-tin-tuc/${id}`, {
            // method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(res => res.json())
    },
    confirmNews(id) {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        console.log('user', user)
        return fetch(`${api}chap-nhan-tin-tuc`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body:JSON.stringify({
                _id:id
            })
        }).then(res => res.json())
    },
    rejectNews(id,reason) {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        console.log('user', user)
        return fetch(`${api}tu-choi-tin-tuc`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body:JSON.stringify({_id:id,reason:reason})
        }).then(res => res.json())
    },
    getListNewsReport(){
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        return fetch(`${api}danh-sach-bao-cao`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(res => res.json())
    },
    getDetailNewsReported(id) {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        return fetch(`${api}chi-tiet-bao-cao/${id}`, {
            // method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(res => res.json())
    },
    confirmNewsReported(id,reason) {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        console.log('user', user)
        return fetch(`${api}xac-nhan-bao-cao`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body:JSON.stringify({
                idReport:id,
                reason:reason
            })
        }).then(res => res.json())
    },
    rejectNewsReported(id) {
        let user = JSON.parse(localStorage.getItem('tokenAdmin'))
        return fetch(`${api}tu-choi-bao-cao/${id}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
        }).then(res => res.json())
    },

}

export default mainManageService