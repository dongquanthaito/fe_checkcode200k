import React, { Component } from "react";
import '../../assets/style/main/Index.css';
import iconsearch from '../../assets/media/images/iconsearch.svg'
import waitForElm from "../../middlewares/waitForElm";
import Loader from "../../helper/loader";
import Sidebar from "../sidebar/sidebar";
import ListUser from "../user/listUser";
import { checkAuthLogin } from "../../controller/checkAuth.controller";
import { findDaNhanKmCtrl } from "../../controller/daNhanKm.controller";
import { findSiteCode } from "../../controller/find.controller";
import { random } from "../../helper/whiteListUser";

class Main extends Component {
    render() {
        return(
            <div id="main">
                <Sidebar />
                <ListUser />
                <div className="container">
                    <div className="logo"></div>
                    <p className="title"></p>
                    <div id="search">
                        <div className="search-cont">
                            <img src={iconsearch}></img>
                            <input type="text" id="code" autoComplete="off" placeholder="Nhập số điện thoại"></input>
                        </div>
                        {/* <div className="search-id-promo">    
                            <div className="search-user">                    
                                <input type="text" id="user" autoComplete="off" placeholder="Tài khoản người chơi"></input>
                            </div>                  
                            <select className="search-user select-promo" id="promo">
                                <option value="default">- Chọn khuyến mãi -</option>
                                <option value="FR200">FR200</option>
                                <option value="KC200">KC200</option>
                                <option value="CODE188">CODE188</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="btn-cont">
                        <button id="add-point-btn">Kiểm Tra</button>
                    </div>
                    <div className="result-main-cont">
                        <div className="result"></div>
                    </div>
                    <span id="non-status"></span>
                    <Loader />
                </div>
                <i className="fa-solid fa-door-open logout-door" title="Đăng xuất"></i>
            </div>
        )
    }
}




waitForElm('#main').then(()=>{
    checkAuthLogin()
    document.getElementById('list-user').style.display='none' //Tắt List User
    
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
        document.getElementById('non-status').style.display="none"
        document.getElementsByClassName('result')[0].style.display="none"
        document.getElementsByClassName('loader')[0].style.zIndex='1'
        findSiteCode()
    })

    // Old Version ------------->
    // document.getElementById('add-point-btn').addEventListener('click', () => {
    //     document.getElementsByClassName('loader')[0].style.zIndex='1'

    //     let code = document.getElementById('code').value
    //     let user = (document.getElementById('user').value).toString().toLowerCase().replace(/\s/g, '')
    //     let promo = document.getElementById('promo').value

    //     console.log(promo)

    //     if(code != "" && user != "" && promo != "default") {
    //         document.getElementById('non-status').style.display="none"
    //         document.getElementsByClassName('result')[0].style.display="none"
    //         findDaNhanKmCtrl(user)
    //     } else {
    //         document.getElementsByClassName('loader')[0].style.zIndex='-1'
    //         document.getElementsByClassName('result')[0].style.display="none"
    //         document.getElementById('non-status').style.display="flex"
    //         document.getElementById('non-status').innerHTML = "Vui lòng nhập đầy đủ thông tin"
    //     }
    // })

    document.getElementsByClassName('logout-door')[0].addEventListener('click', () => {
        localStorage.clear()
        window.location.replace('/')
        console.log("Logout")
    })

    document.getElementsByClassName('list-user-btn')[0].addEventListener('click', () => {
        document.getElementsByClassName('container')[0].style.display='none'
        document.getElementById('list-user').style.display='inline-block'
    })

    //Press Enter ------------>
    document.addEventListener('keydown', (e)=>{
        if(e.keyCode == 13){
            document.getElementById('add-point-btn').click()
        }
    })
})


export default Main;

