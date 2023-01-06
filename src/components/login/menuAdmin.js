import React from "react";
import '../../assets/style/login/menuAdmin.css';
import waitForElm from "../../middlewares/waitForElm";
import { loginCtrl } from "../../controller/login.controller";

const MenuAdmin = () => {
    return(
        <div id="menu-admin">
            <div className="menu-admin-container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="button-cont">
                            <a href='#'>                              
                                <button className="button register-btn">
                                    <span className="button__text">TẠO TÀI KHOẢN</span>
                                    <i className="button__icon fas fa-user"></i>
                                </button>
                            </a>
                            <a href='/'>
                                <button className="button register-btn">
                                    <span className="button__text">CỘNG KHUYẾN MÃI</span>
                                    <i className="button__icon fas fa-check-double"></i>
                                </button>
                            </a>
                            <a href='#'>
                                <button className="button register-btn">
                                    <span className="button__text">TÌM KIẾM</span>
                                    <i className="button__icon fas fa-magnifying-glass"></i>
                                </button>
                            </a>
                            <a href='#'>
                                <button className="button register-btn">
                                    <span className="button__text">THỐNG KÊ</span>
                                    <i className="button__icon fas fa-list-check"></i>
                                </button>
                            </a>
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

export default MenuAdmin;

waitForElm('#login').then(() => {
    document.getElementsByClassName('login__submit')[0].addEventListener('click', () => {
        loginCtrl('user-id', 'pw-id')
    })

})