import React, { useEffect, useState } from 'react'
import mainManagerService from '../../../services/mainManagerService'
import { Link } from 'react-router-dom'


export default function ListCustomer() {
  let [customers, setCustomers] = useState()
  useEffect(async () => {
    let res = await mainManagerService.getListCustomer()
    await setCustomers(res.news)
  }, [])
  console.log(`customers`, customers)
  return (
    <>
      <div className="col">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Danh sách Bài Đăng Chờ Duyệt </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTableeee" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã Tin Tức</th>
                    <th>Tiêu Đề</th>
                    <th>Địa chỉ</th>
                    <th>Ảnh đại diện</th>
                    <th>Người đăng</th>
                    <th>Thao tác</th>
                    <th>Hệ thống</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    customers?.map((o, i) => (
                      <Customer
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

export const Customer = (props) => {
  return (
    <tr>
      <td> {props.number} </td>
      <td style={{ fontSize: "12px" }}> {props.data._id} </td>
      <td>{props.data.infor.title} </td>
      <td>{props.data.address.address_detail}, {props.data.address.district}, {props.data.address.city} </td>
      <td><img src={`${props.data.img_avatar}`} className="" style={{width:"100px",height:"100px"}} alt="avatar" /> </td>
      <td>{props.data.createbyname} </td>
      <td>
        <Link className="btn-circle btn-warning product_action-edit margin-0-20 " to={`/main-manager/news/${props?.data?._id}`}>
          <i className="fas fa-eye font-size-20 text-light"></i>
        </Link>
      </td>
      <td>
        Tạo bởi {props.data.createbyname}
        <br />
        Cập nhật bởi {props.data.updatebyname}
      </td>
    </tr>
  )
}
