import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mainManagerService from '../../../services/mainManagerService'

export default function ListNewsReport() {
  let [customers, setCustomers] = useState()
  useEffect(async () => {
    let res = await mainManagerService.getListNewsReport()
    await setCustomers(res.data)
  }, [])
  return (
    <>
      <div className="col">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Danh sách Bài Đăng Chờ Duyệt </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTableeee" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã Tin Tức</th>
                    <th>Tiêu Đề</th>
                    <th>Báo cáo</th>
                    <th>Ảnh đại diện</th>
                    <th>Người đăng</th>
                    <th>Thao tác</th>
                    {/* <th>Hệ thống</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    customers?.map((o, i) => (
                      <ReportItem
                        data={o}
                        number={i}
                        key={i}

                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const ReportItem = (props) => {
  return (
    <tr>
      <td> {props.number} </td>
      <td style={{ fontSize: "12px" }}> {props.data.news._id} </td>
      <td>{props.data.news.infor.title} </td>
      <td> {props.data.title} <br /> {props.data.content} </td>
      <td><img src={`${props.data.news.img_avatar}`} className="" style={{ width: "100px", height: "100px" }} alt="avatar" /> </td>
      <td>{props.data.news.createbyname} </td>
      <td>
        <Link to={`/main-manager/news-reports/${props?.data._id}`} className="btn-circle btn-warning product_action-edit margin-0-20 " >
        <i className="fas fa-eye font-size-20 text-light"></i>

        </Link>
      </td>
    </tr>
  )
}
