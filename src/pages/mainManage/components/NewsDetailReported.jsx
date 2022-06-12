import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import mainManageService from '../../../services/mainManagerService'
let $ = window.$

export default function NewsDetailReported() {

  let { slug } = useParams()
  const [report, setReport] = useState()
  const [reason, setReason] = useState("")

  useEffect(async () => {
    let res = await mainManageService.getDetailNewsReported(slug)
    if (res.result) {
      setReport(res.data)
    }
  }, [])

  const confirmReport = async () => {
    console.log("reject");
    var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    if (reason === null || reason === "" || reason.match(alpha)) {
      alert("Bạn phải nhập lí do")
    } else {
      let res = await mainManageService.confirmNewsReported(report?._id, reason)
      if (res.success) {
        alert("Đã xác nhận báo cáo tin đăng");
        $(".close").click()
        let res1 = await mainManageService.getDetailNewsReported(slug)
        setReport(res1.data)
      }
    }
  }

  const rejectReport = async () => {
    console.log("run");

    let res = await mainManageService.rejectNewsReported(report?._id)
    if (res.result) {
      $(".close").click()
      alert(res.message);
      let res1 = await mainManageService.getDetailNews(slug)
      setReport(res1.data)
    }
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
          <Link to="/main-manager/news-reports" className='btn btn-warning'>
            Quay lại
          </Link>

          Chi tiết bài đăng
        </div>
        <div className="col-md-9 border">
          <div className="row">
            <div className="col-md-6">
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Mã bài đăng</strong></label>
                </div>
                <div className="col-auto">
                  <input className="form-control" aria-describedby="passwordHelpInline" readOnly defaultValue={report?.news?._id} />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Tiêu Đề</strong></label>
                </div>
                <div className="col-auto">
                  <input className="form-control" aria-describedby="passwordHelpInline" readOnly defaultValue={report?.news?.infor.title} />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Nội Dung</strong></label>
                </div>
                <div className="col-auto">
                  <textarea readOnly rows={4} defaultValue={report?.news?.infor.content_infor} className="form-control" aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Người đăng bài</strong></label>
                </div>
                <div className="col-auto">
                  <input readOnly className="form-control" defaultValue={report?.news?.createbyname} aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"> <strong>Địa chỉ</strong></label>
                </div>
                <div className="col-auto">
                  <div className='border p-2'>{report?.news?.address?.address_detail + " " + report?.news?.address?.street + " " + report?.news?.address?.district + " " + report?.news?.address?.city}</div>
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Diện tích</strong></label>
                </div>
                <div className="col-auto">
                  <input readOnly className="form-control" defaultValue={report?.news?.infor?.acreage} aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Giá Thuê</strong></label>
                </div>
                <div className="col-auto">
                  <input readOnly className="form-control" defaultValue={report?.news?.infor.price} aria-describedby="passwordHelpInline" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-3 align-items-center mt-2">
                <div className="col-3">
                  <label htmlFor="inputPassword6" className="col-form-label"><strong>Số điện thoại</strong></label>
                </div>
                <div className="col-auto">
                  <input readOnly className="form-control" defaultValue={report?.news?.infor?.number_phone} aria-describedby="passwordHelpInline" />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-9">
                  <label >Ảnh đại diện</label>
                  <img src={`${report?.news?.img_avatar}`} alt="" className='w-100' />
                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-md-12">
                  <label className="col-form-label">Album ảnh chi tiết</label>
                </div>
                <div className="col-9">

                  {
                    report?.news?.img_infor.map((o, i) => (
                      <img src={`${o}`} key={i} className="w-50" />
                    ))
                  }

                </div>
              </div>
              <div className="row g-3 align-items-center mt-2">
                <div className="col-4">
                  Nhà vệ sinh : {report?.news?.infor.nb_bath_toilet}
                </div>
                <div className="col-4">
                  Phòng ngủ : {report?.news?.infor.nb_bedroom}
                </div>
                <div className="col-4">
                  Phòng bếp : {report?.news?.infor.nb_kitchenroom}
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  Máy Điều Hoà : {
                    report?.news?.utilities.isChecked_AirConditional ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Máy Giặt :
                  {
                    report?.news?.utilities.isChecked_WashingMachine ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Camera Giám Sát :
                  {
                    report?.news?.utilities.isChecked_camera ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Thang Máy :
                  {
                    report?.news?.utilities.isChecked_elevator ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Tủ lạnh :
                  {
                    report?.news?.utilities.isChecked_fridge ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Nệm :
                  {
                    report?.news?.utilities.isChecked_mattress ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Gác Lửng :
                  {
                    report?.news?.utilities.isChecked_mezzanine ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Công Viên :
                  {
                    report?.news?.utilities.isChecked_park ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Bãi Đậu Xanh :
                  {
                    report?.news?.utilities.isChecked_parking ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Hồ Bơi :
                  {
                    report?.news?.utilities.isChecked_pool ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Ti Vi :
                  {
                    report?.news?.utilities.isChecked_television ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
                <div className="col-4">
                  Wifi :
                  {
                    report?.news?.utilities.isChecked_wifi ?
                      <i className="fas fa-check"></i>
                      :
                      <i className="fa fa-times"></i>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 border">
          <div className="row">
            <div className="col-12">
              <h3>Chi tiết báo cáo</h3>
            </div>
            <div className="col-12">
              <strong>Tiêu đề :</strong> {report?.title}
            </div>
            <div className="col-12">
              <div className="form-group">
                <label><strong>Nội dung</strong> </label>
                <textarea className="form-control" rows="3" defaultValue={report?.content}></textarea>
              </div>
            </div>
            <div className="col-12 mb-4">
              <strong>Hình ảnh</strong> (nếu có)
            </div>
            <div className="col-6 text-center">
              <div className="btn btn-warning" data-toggle="modal" data-target="#modalConfirm"> Xác nhận </div>
            </div>
            <div className="col-6">
              <div className="btn btn-danger text-center" data-toggle="modal" data-target="#modalReject"> Từ chối</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalConfirm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> Xác nhận báo cáo </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <i>Bạn có chắc xác nhận báo cáo này ?</i>
                <div className="form-group">
                  <br />
                  <label htmlFor="reason">Nhập lí do xác nhận báo cáo tin này</label>
                  <textarea className="form-control" defaultValue={reason} onChange={e => handleChangeReason(e)} id="reason" rows="3" placeholder='Nhập lí do ...' ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
              <button type="button" onClick={confirmReport} className="btn btn-success" >Ok</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalReject" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> Từ chối báo cáo </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <i>Bạn có chắc từ chối báo cáo này ?</i>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-success" onClick={rejectReport} >Ok</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
