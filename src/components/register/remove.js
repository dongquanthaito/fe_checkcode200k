import React from "react";
import '../../assets/style/register/remove.css';
import waitForElm from "../../middlewares/waitForElm";
import { removeUserCtrl } from "../../controller/removeUser.controller";

const RemoveUser = () => {
    return(
        <div id="register">
            <i class="fa-solid fa-house home-btn" title="Trang chủ"></i>
            <div className="login-container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" id="user" placeholder="Tên tài khoản" autoComplete="off"></input>
                            </div>
                            <button className="button register__submit">
                                <span className="button__text">XÓA TÀI KHOẢN</span>
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

export default RemoveUser;

waitForElm('#register').then(() => {
    document.getElementsByClassName('register__submit')[0].addEventListener('click', () => {
        removeUserCtrl('user')
    })

    document.getElementsByClassName('home-btn')[0].addEventListener('click', () => {
        window.location.replace('/')
    })
})