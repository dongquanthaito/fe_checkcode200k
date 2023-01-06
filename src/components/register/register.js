import React from "react";
import '../../assets/style/register/register.css';
import waitForElm from "../../middlewares/waitForElm";
import registerCtrl from "../../controller/register.controller";

const Register = () => {
    return(
        <div id="register">
            <i class="fa-solid fa-house home-btn" title="Trang chủ"></i>
            <div className="login-container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" id="regis-user" placeholder="Tên tài khoản" autoComplete="off"></input>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" id="regis-pw" placeholder="Mật khẩu" autoComplete="off"></input>
                            </div>
                            <div className="login__field regis-select">
                                <select  id="regis-role" >
                                    <option value='default'>-Chọn phân quyền-</option>
                                    <option value='superadmin'>Super Admin</option>
                                    <option value='admin'>Admin</option>
                                    <option value='user'>User</option>

                                </select>
                            </div>
                            <div className="login__field regis-select">
                                <select  id="regis-site" >
                                    <option value='default'>-Chọn đài-</option>
                                    <option value='jun88'>Jun88</option>
                                    <option value='f8bet'>F8BET</option>
                                    <option value='hi88'>Hi88</option>
                                </select>
                            </div>
                            <button className="button register__submit">
                                <span className="button__text">TẠO TÀI KHOẢN</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>				
                        </div>
                        <div className="social-login">
                            <h3>Copyright © 2022  ATT</h3>
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

export default Register;

waitForElm('#register').then(() => {
    document.getElementsByClassName('register__submit')[0].addEventListener('click', () => {
        registerCtrl("regis-user", "regis-pw", "regis-role", "regis-site")
    })

    document.getElementsByClassName('home-btn')[0].addEventListener('click', () => {
        window.location.replace('/')
    })
})