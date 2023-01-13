import React from "react";
import '../../assets/style/user/update.css';
import waitForElm from "../../middlewares/waitForElm";
import { updateUserCtrlPass, updateUserCtrlRoll, updateUserCtrlSite } from "../../controller/updateUser.controller";
import swal from 'sweetalert';

const UpdateUser = () => {
    return(
        <div id="update">
            <i className="fa-solid fa-house home-btn" title="Trang chủ"></i>
            <div className="update-container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="update update-top">
                            <button className="button update__submit" btn-index='0' status-display='hide'>
                                <span className="button__text">ĐỔI MẬT KHẨU</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                            <div className="sub-modal-update-cont">
                                <div className="update__field">
                                    <i className="update__icon fas fa-user"></i>
                                    <input type="text" className="update__input update-user" placeholder="Tài khoản" autoComplete="off"></input>
                                </div>
                                <div className="update__field">
                                    <i className="update__icon fas fa-lock"></i>
                                    <input type="password" className="update__input update-pass" placeholder="Mật khẩu mới" status_pw='hide' autoComplete="off"></input>
                                    <i className="fa-solid fa-eye update__icon toggle-pass"></i>
                                </div>
                                <button className="confirm-update">Xác Nhận</button>
                            </div>
                        </div>
                        <div className="update">
                            <button className="button update__submit" btn-index='1' status-display='hide'>
                                <span className="button__text">CẬP NHẬT QUYỀN</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                            <div className="sub-modal-update-cont">
                                <div className="update__field">
                                    <i className="update__icon fas fa-user"></i>
                                    <input type="text" className="update__input update-user" placeholder="Tài khoản" autoComplete="off"></input>
                                </div>
                                <div className="update__field update-select">
                                    <select  id="update-role" >
                                        <option value='default'>-Chọn phân quyền-</option>
                                        <option value='superadmin'>Super Admin</option>
                                        <option value='admin'>Admin</option>
                                        <option value='user'>User</option>
                                    </select>
                                </div>
                                <button className="confirm-update">Xác Nhận</button>
                            </div>
                        </div>
                        <div className="update">
                            <button className="button update__submit" btn-index='2' status-display='hide'>
                                <span className="button__text">CẬP NHẬT ĐÀI</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                            <div className="sub-modal-update-cont">
                                <div className="update__field">
                                    <i className="update__icon fas fa-user"></i>
                                    <input type="text" className="update__input update-user" placeholder="Tài khoản" autoComplete="off"></input>
                                </div>
                                <div className="update__field update-select">
                                    <select  id="update-site" >
                                        <option value='default'>-Chọn đài-</option>
                                        <option value='jun88'>Jun88</option>
                                        <option value='f8bet'>F8BET</option>
                                        <option value='hi88'>Hi88</option>
                                    </select>
                                </div>
                                <button className="confirm-update">Xác Nhận</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="social-update">
                        <h3>Copyright © 2022  ATT</h3>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>		
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>		
                </div>
            </div>
        </div>
    )
}

export default UpdateUser;

waitForElm('#update').then(() => {
    if(localStorage.getItem('role') != 'superadmin'){
        window.location.replace('/admin')
    }


    document.getElementsByClassName('home-btn')[0].addEventListener('click', () => {
        console.log('ABC')
        window.location.replace('/admin')
    })

    document.getElementsByClassName('toggle-pass')[0].addEventListener('click', () => {
        if(document.getElementsByClassName('update-pass')[0].getAttribute('status_pw') == 'hide'){
            document.getElementsByClassName('update-pass')[0].type='text'
            document.getElementsByClassName('toggle-pass')[0].classList.remove('fa-eye')
            document.getElementsByClassName('toggle-pass')[0].classList.add('fa-eye-slash')
            document.getElementsByClassName('update-pass')[0].setAttribute('status_pw', 'show')
        } else {
            document.getElementsByClassName('update-pass')[0].type='password'
            document.getElementsByClassName('toggle-pass')[0].classList.add('fa-eye')
            document.getElementsByClassName('toggle-pass')[0].classList.remove('ffa-eye-slash')
            document.getElementsByClassName('update-pass')[0].setAttribute('status_pw', 'hide')
        }
    })

    let y
    document.querySelectorAll('.update__submit').forEach((el) => {
        el.addEventListener('click', () => {
            y = el.getAttribute('btn-index')
            if(el.getAttribute('status-display') == 'hide') {
                document.getElementsByClassName('button__icon')[y].style.transform='rotate(90deg)'
                document.getElementsByClassName('sub-modal-update-cont')[y].style.display='block'
                el.setAttribute('status-display', 'show')
            } else {
                document.getElementsByClassName('button__icon')[y].style.transform='rotate(0deg)'
                document.getElementsByClassName('sub-modal-update-cont')[y].style.display='none'
                el.setAttribute('status-display', 'hide')
            }
        })
    })

    document.getElementsByClassName('confirm-update')[0].addEventListener('click', () => {
        if(document.getElementsByClassName('update-user')[0].value == "" || document.getElementsByClassName('update-pass')[0].value == "") {
            swal("Oops!", "Vui lòng điền đầy đủ thông tin.", "error");
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.reload()
                }, 300);
            })
        } else {
            updateUserCtrlPass('update-user', 'update-pass')
        }

    })
    document.getElementsByClassName('confirm-update')[1].addEventListener('click', () => {
        if(document.getElementsByClassName('update-user')[1].value == "" || document.getElementById('update-role').value == "default") {
            swal("Oops!", "Vui lòng điền đầy đủ thông tin.", "error");
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.reload()
                }, 300);
            })
        } else {
        updateUserCtrlRoll('update-user', "update-role")
        }
    })
    document.getElementsByClassName('confirm-update')[2].addEventListener('click', () => {
        if(document.getElementsByClassName('update-user')[2].value == "" || document.getElementById('update-site').value == "default") {
            swal("Oops!", "Vui lòng điền đầy đủ thông tin.", "error");
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.reload()
                }, 300);
            })
        } else {
        updateUserCtrlSite('update-user', "update-site")
        }
    })
})