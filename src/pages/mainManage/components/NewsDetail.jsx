import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import mainManageService from '../../../services/mainManagerService'
let $ = window.$


export default function NewsDetail() {
  let { slug } = useParams()
  const [detail, setDetail] = useState()
  const [reason, setReason] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const [hide, setHide] = useState(false)

  useEffect(async () => {
    document.getElementsByClassName("form-control").disabled = true
    let res = await mainManageService.getDetailNews(slug)
    if (res.success) {
      setDetail(res.data)
    }

  }, [])

  const Confirm = async () => {
    console.log("run");
    let res = await mainManageService.confirmNews(detail?._id)
    if (res.success) {
      alert(res.message);
      let res1 = await mainManageService.getDetailNews(slug)
      setDetail(res1.data)
    }
  }
  const Reject = async () => {
    console.log("reject");
    var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    if (reason === null || reason === "" || reason.match(alpha)) {
      alert("Bạn phải nhập lí do")
    } else {
      let res = await mainManageService.rejectNews(detail?._id, reason)
      if (res.success) {
        alert("Đã từ chối tin đăng");
        $(".close").onclick()
        let res1 = await mainManageService.getDetailNews(slug)
        setDetail(res1.data)
      }
    }

  }


  const openReason = () => {
    setHide(!hide)
  }

  const handleChangeReason = (e) => {
    let val = e.currentTarget.value;
    console.log('val', val)
    setReason(val)
  }


  return (
    <div className="p-2 col-md-12 mx-2">
      <div className='row bg-light mx-1'>
        <div className="col-md-12">
          <Link to="/main-manager/news" className='btn btn-warning'>
            Quay lại
          </Link>

          Chi tiết bài đăng
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Mã bài đăng</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" aria-describedby="passwordHelpInline" defaultValue={detail?._id} />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Tiêu Đề</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" aria-describedby="passwordHelpInline" defaultValue={detail?.infor.title} />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Nội Dung</label>
                </div>
                <div className="col-auto">
                  <textarea rows={4} defaultValue={detail?.infor.content_infor} className="form-control" aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Người đăng bài</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" defaultValue={detail?.createbyname} aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"> Địa chỉ</label>
                </div>
                <div className="col-auto">
                  <input value={detail?.address?.address_detail + " " + detail?.address?.street + " " + detail?.address?.district + " " + detail?.address?.city} className="form-control" aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Diện tích</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" defaultValue={detail?.infor?.acreage} aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Giá Thuê</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" defaultValue={detail?.infor.price} aria-describedby="passwordHelpInline" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label">Số điện thoại</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" defaultValue={detail?.infor?.number_phone} aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-6">
                  <label >Ảnh đại diện</label>
                  <img src={`${detail?.img_avatar}`} alt="" className='w-100' />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-md-12">
                  <label className="col-form-label">Album ảnh chi tiết</label>
                </div>
                <div className="col-6">

                  {
                    detail?.img_infor.map((o, i) => (
                      <img src={`${o}`} key={i} className="w-50" />
                    ))
                  }

                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-4">
                  Nhà vệ sinh : {detail?.infor.nb_bath_toilet}
                </div>
                <div className="col-4">
                  Phòng ngủ : {detail?.infor.nb_bedroom}
                </div>
                <div className="col-4">
                  Phòng bếp : {detail?.infor.nb_kitchenroom}
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  Máy Điều Hoà : {
                    detail?.utilities.isChecked_AirConditional ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Máy Giặt :
                  {
                    detail?.utilities.isChecked_WashingMachine ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Camera Giám Sát :
                  {
                    detail?.utilities.isChecked_camera ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Thang Máy :
                  {
                    detail?.utilities.isChecked_elevator ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Tủ lạnh :
                  {
                    detail?.utilities.isChecked_fridge ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Nệm :
                  {
                    detail?.utilities.isChecked_mattress ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Gác Lửng :
                  {
                    detail?.utilities.isChecked_mezzanine ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Công Viên :
                  {
                    detail?.utilities.isChecked_park ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Bãi Đậu Xanh :
                  {
                    detail?.utilities.isChecked_parking ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Hồ Bơi :
                  {
                    detail?.utilities.isChecked_pool ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Ti Vi :
                  {
                    detail?.utilities.isChecked_television ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Wifi :
                  {
                    detail?.utilities.isChecked_wifi ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
              </div>
            </div>
            <div className="col-md-12">
              {/* {
                detail?.infor?.status_news == "Chờ gửi duyệt" ?
                  <button className="btn btn-warning">Duyệt tin</button>
                  :
                  <button className="btn btn-danger">Từ chối tin</button>
              } */}
              {
                detail?.infor.status_news === "Chờ gửi duyệt" && (
                  <div>
                    <button className="btn btn-warning mr-2" onClick={Confirm}>Duyệt tin</button>
                    <button className="btn btn-danger" onClick={openReason} data-toggle="modal" data-target="#exampleModal">Từ chối</button>
                  </div>)
              }

            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> Từ chối tin đăng </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlhtmlFor="reason">Nhập lí do từ chối tin này</label>
                <textarea className="form-control" defaultValue={reason} onChange={e => handleChangeReason(e)} id="reason" rows="3" placeholder='Nhập lí do ...' ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-danger" onClick={Reject}>Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
