import React from "react";
import '../../assets/style/login/login.css';
import waitForElm from "../../middlewares/waitForElm";
import { loginCtrl } from "../../controller/login.controller";
import swal from 'sweetalert';

const Login = () => {
    return(
        <div id="login">
            <div className="login-container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" id="user-id" placeholder="Tài khoản"></input>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" id="pw-id" placeholder="Mật khẩu" status_pw='hide'></input>
                                <i className="fa-solid fa-eye update__icon toggle-pass"></i>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-key"></i>
                                <input type="text" className="login__input" id="auth-code" placeholder="Mã xác thực"></input>
                            </div>
                            <button className="button login__submit">
                                <span className="button__text">Đăng Nhập</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>				
                        </div>
                        <div className="social-login">
                            <h3>Copyright © 2023  ATT</h3>
                        </div>
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

export default Login;


waitForElm('#login').then(() => {
    document.getElementsByClassName('login__submit')[0].addEventListener('click', () => {
        if(document.getElementById('user-id').value == ""
        ||document.getElementById('pw-id').value == ""
        ||document.getElementById('auth-code').value == "") {
            swal("Oops!", "Vui lòng nhập đầy đủ thông tin", "error");
        } else {
            loginCtrl('user-id', 'pw-id', "auth-code")
        }
    })

    document.addEventListener('keydown', (e)=>{
        if(e.keyCode == 13){
            document.getElementsByClassName('login__submit')[0].click()
        }
    })

    document.getElementsByClassName('toggle-pass')[0].addEventListener('click', () => {
        if(document.getElementById('pw-id').getAttribute('status_pw') == 'hide'){
            console.log('aa')
            document.getElementById('pw-id').type='text'
            document.getElementsByClassName('toggle-pass')[0].classList.remove('fa-eye')
            document.getElementsByClassName('toggle-pass')[0].classList.add('fa-eye-slash')
            document.getElementById('pw-id').setAttribute('status_pw', 'show')
        } else {
            document.getElementById('pw-id').type='password'
            document.getElementsByClassName('toggle-pass')[0].classList.add('fa-eye')
            document.getElementsByClassName('toggle-pass')[0].classList.remove('fa-eye-slash')
            document.getElementById('pw-id').setAttribute('status_pw', 'hide')
        }
    })
})