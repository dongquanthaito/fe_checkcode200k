import React, { Component } from "react";
import '../../assets/style/main/Index.css';
import iconsearch from '../../assets/media/images/iconsearch.svg'
import { checkAuthLogin } from "../../controller/checkAuth.controller";
import waitForElm from "../../middlewares/waitForElm";
import { findSiteCode } from "../../controller/find.controller";
import { addPoint } from "../../controller/addPoint.controller";
import Loader from "../../helper/loader";
import Sidebar from "../sidebar/sidebar";

class Main extends Component {
    render() {
        return(
            <div id="main">
                <Sidebar />
                <div className="container">
                    <div className="logo"></div>
                    <p className="title"></p>
                    <div id="search">
                        <div className="search-cont">
                            <img src={iconsearch}></img>
                            <input type="text" id="code" autoComplete="off" placeholder="Nhập mã khuyến mãi"></input>
                        </div>
                        <div className="search-id-promo">    
                            <div className="search-user">                    
                                <input type="text" id="user" autoComplete="off" placeholder="Tài khoản người chơi"></input>
                            </div>                  
                            <select className="search-user select-promo" id="promo">
                                <option value="default">- Chọn khuyến mãi -</option>
                                <option value="FR200">FR200</option>
                                <option value="KC200">KC200</option>
                            </select>
                        </div>
                    </div>
                    <div className="btn-cont">
                        <button id="add-point-btn">Kiểm Tra</button>
                    </div>
                    <div className="result">
                        <div className="result-container">
                            <span id="get-code"></span>
                            <span id="get-user"></span>
                            <span id="get-promo"></span>
                            <span id="get-status"></span>
                        </div>
                        <Loader />
                    </div>
                    <span id="non-status"></span>
                </div>
                <i class="fa-solid fa-door-open logout-door" title="Đăng xuất"></i>
            </div>
        )
    }
}



waitForElm('#main').then(()=>{
    
    document.getElementById('code').classList.remove('disabled')
    document.getElementById('user').classList.remove('disabled')
    document.getElementById('promo').classList.remove('disabled')

    checkAuthLogin()

    //Check role - Ẩn Sidebar - logout
    if(localStorage.getItem('role') == 'user') {
        document.getElementsByClassName('sidebar')[0].style.display='none'
    } else {
        document.getElementsByClassName('logout-door')[0].style.display='none'
        if(localStorage.getItem('role') == 'superadmin'){
            document.getElementsByClassName('roll-title')[0].innerHTML = "Super Admin"
        } else if(localStorage.getItem('role') == 'admin'){
            document.getElementsByClassName('roll-title')[0].innerHTML = "Admin"
            document.getElementsByClassName('user-admin')[0].style.display='none'
        }
        document.getElementsByClassName('user-text')[0].innerHTML = localStorage.getItem('username')
        document.getElementsByClassName('sidebar')[0].style.display='block'
    }
    document.getElementsByClassName('result')[0].style.display="none"
    document.getElementsByClassName('title')[0].innerHTML = "KIỂM TRA KHUYẾN MÃI " + localStorage.getItem('site').toUpperCase() + ' - ' + localStorage.getItem('username').toUpperCase()
    document.getElementById('add-point-btn').addEventListener('click', () => {
        let code = document.getElementById('code').value
        let user = document.getElementById('user').value
        let promo = document.getElementById('promo').value
        console.log(promo)
        if(code != "" && user != "" && promo != "default") {
            document.getElementById('non-status').style.display="none"
            document.getElementsByClassName('result')[0].style.display="none"
            findSiteCode('code')        
        } else {
            document.getElementsByClassName('result')[0].style.display="none"
            document.getElementById('non-status').style.display="flex"
            document.getElementById('non-status').innerHTML = "Vui lòng nhập đầy đủ thông tin"
        }
        document.getElementsByClassName('result-container')[0].style.display="flex"
    })

    document.getElementsByClassName('logout-door')[0].addEventListener('click', () => {
        localStorage.clear()
        window.location.replace('/login')
        console.log("Logout")
    })
})

waitForElm('.available').then(() => {
    document.getElementsByClassName('available')[0].addEventListener('click', () => {
        document.getElementsByClassName('result-container')[0].style.display="none"
        document.getElementsByClassName('loader')[0].style.zIndex='1'
        addPoint('user', 'promo', 'code')
    })
})   

export default Main;

