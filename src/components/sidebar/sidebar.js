import '../../assets/style/sidebar/sidebar.css'
import waitForElm from '../../middlewares/waitForElm'
import Upload from '../upload/upload'
import swal from 'sweetalert';


const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className='sidebar-cont'>
                <div className='roll-title'></div>
                <div className='header-sidebar'>
                    <i className="fa-solid fa-circle-user"></i>
                    <span className='user-text'></span>
                    <i className="fa-solid fa-door-open logout-sidebar" title="Đăng xuất"></i>
                </div>
                <div className='body-sidebar'>
                    <span className='title-body-sidebar'>Menu chức năng</span>
                    <div className='menu-cont'>
                        <a href='/admin' className='tim-kiem'>
                            <div className='menu-btn-cont'>
                                <div className='menu-btn btn-top'>
                                    <div className='title-btn'>Kiểm tra khuyến mãi</div>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </a>
                        <a href='#' className='user-admin'>
                            <div className='menu-btn-cont'>
                                <div className='menu-btn'>
                                    <div className='title-btn'>Quản lý người dùng</div>
                                    <i className="fa-regular fa-user"></i>
                                </div>
                                <div className='user-modal'>
                                    <a href='#' className='list-user-btn'>
                                        <div className='regis-btn user-modal-btn'>
                                            <i className="fa-solid fa-users-viewfinder"></i>
                                            <p>Danh sách tài khoản</p>
                                        </div>
                                    </a>
                                    <a href='/register'>
                                        <div className='regis-btn user-modal-btn'>
                                            <i className="fa-solid fa-user-plus"></i>
                                            <p>Tạo tài khoản</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <a href='#'>
                            <div className='menu-btn-cont upload-btn'>
                                <div className='menu-btn close-upload'>
                                    <div className='title-btn'>Upload data</div>
                                    <i className="fa-solid fa-upload"></i>
                                </div>
                                <Upload />
                            </div>
                        </a>
                        <a href='#' className='thong-ke'>                        
                            <div className='menu-btn-cont'>
                                <div className='menu-btn btn-bottom'>
                                    <div className='title-btn'>Thống kê</div>
                                    <i className="fa-solid fa-list-check"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='footer-sidebar'>
                    <div className='footer-text'>ATT Check Promo Code</div>
                    <div className='footer-text'>Version 1.2.0</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

waitForElm('.sidebar').then(() => {
    document.getElementsByClassName('logout-sidebar')[0].addEventListener('click', () => {
        localStorage.clear()
        window.location.replace('/')
        console.log("Logout")
    })

    var aLength
    var modalLength

    document.getElementsByClassName('menu-btn')[1].addEventListener('click',()=>{
        let baseLenght = document.getElementsByClassName('user-modal')[0].style.height
        if((baseLenght.replace(/px/g,'')*1)==0){
            aLength = document.getElementsByClassName('user-modal')[0].querySelectorAll('a')[0].offsetHeight
            modalLength = document.getElementsByClassName('user-modal')[0].querySelectorAll('a').length
            document.getElementsByClassName('user-modal')[0].style.height=aLength*modalLength+"px"
            console.log(document.getElementsByClassName('user-modal')[0].style.height)
        }else{
            aLength = document.getElementsByClassName('user-modal')[0].querySelectorAll('a')[0].offsetHeight
            modalLength = document.getElementsByClassName('user-modal')[0].querySelectorAll('a').length
            document.getElementsByClassName('user-modal')[0].style.height=0+"px"
            console.log(document.getElementsByClassName('user-modal')[0].style.height)
        }
    })
})

waitForElm('.upload-btn').then(() => {
    let state = true
    document.getElementsByClassName('card')[0].classList.add('card-hidden')
    document.getElementsByClassName('card')[0].classList.remove('card-show')
    document.getElementsByClassName('close-upload')[0].addEventListener('click', () => {
        if(state == true) {
            document.getElementById('upload').style.height='210px'
            document.getElementsByClassName('card')[0].classList.add('card-show')
            document.getElementsByClassName('card')[0].classList.remove('card-hidden')
            document.getElementsByClassName('fa-upload')[0].style.transform='rotate(180deg)'
            state = false
        } else if(state == false) {
            document.getElementById('upload').style.height='0'
            document.getElementsByClassName('card')[0].classList.add('card-hidden')
            document.getElementsByClassName('card')[0].classList.remove('card-show')
            document.getElementsByClassName('fa-upload')[0].style.transform='rotate(0deg)'
            state = true
        }
    })

    document.getElementsByClassName('thong-ke')[0].addEventListener('click', () => {
        swal("Oops !", "Chức năng chưa được cập nhật. Vui lòng thử lại sau", 'error');
    })
})