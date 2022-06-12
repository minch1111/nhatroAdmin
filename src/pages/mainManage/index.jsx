import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Context } from '../../App'
import ListCustomer from './components/ListCustomer'
import ListStaff from './components/ListStaff'
import Permission from './components/Permission'
import ReportDetailMonth from './components/ReportDetailMonth'
import ReportSale from './components/ReportSale'
import Vouchers from './components/Vouchers'
import NewsDetail from './components/NewsDetail'
import ListNewsReport from './components/ListNewsReport'
import NewsDetailReported from './components/NewsDetailReported'

export default function MainManage() {
    // let {user} = useContext(Context);
    // if(user.idPermission!=='61aed3c47812fa068eee6d4f') return <Redirect to="/" />
    return (
        <div className="container-fluid">
            <div className="row">
                <Switch>
                    <Route path="/main-manager/report" exact component={ReportSale} />
                    <Route path="/main-manager/report/:slug" exact component={ReportDetailMonth} />

                    <Route path="/main-manager/staffs" exact component={ListStaff} />

                    <Route path="/main-manager/vouchers" exact component={Vouchers} />

                    <Route path="/main-manager/permission" exact component={Permission} />

                    <Route path="/main-manager/news" exact component={ListCustomer} />
                    <Route path="/main-manager/news/:slug" component={NewsDetail} />
                    <Route path="/main-manager/news-reports" exact component={ListNewsReport} />
                    <Route path="/main-manager/news-reports/:slug"  component={NewsDetailReported} />

                </Switch>

            </div>
        </div>
    )
}
