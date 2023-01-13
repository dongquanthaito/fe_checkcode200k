import '../../assets/style/user/listUser.css'
import waitForElm from '../../middlewares/waitForElm';
import { getFullAcc } from '../../controller/getAccount.controller';
import { removeUserCtrl } from '../../controller/removeUser.controller';
import { updateUserCtrlPass, updateUserCtrlRoll, updateUserCtrlSite } from '../../controller/updateUser.controller';

const ListUser = () => {
    return(
        <div id="list-user">
            <div className='list-user-cont'>
                <div className="list-user-header">
                    <div className="logo-list-user"></div>
                    <h1 className='title-list-user'>DANH SÁCH TÀI KHOẢN</h1>
                </div>
                <div className='body-list-user'>
                </div>
            </div>
            <div className='notice-remove'>
                <div className='notice-remove-status'>
                    <i className="fa-solid fa-user-large-slash fa-fade"></i>
                    <div className='notice-remove-modal-tit'></div>
                    <div className='btn-modal-remove-list'>
                        <button className='notice-remove-modal-cancel'>Hủy</button>
                        <button className='notice-remove-modal-confirm'>Xác Nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUser;

waitForElm('#list-user').then(() => {
    if(localStorage.getItem('role') == 'superadmin'){
        getFullAcc()
    }
})

waitForElm('.user-item').then(() => {
    document.querySelectorAll('.generate-qr-code').forEach((el) => {
        el.addEventListener('click', () => {
            let i = el.getAttribute('generate-index')
            document.getElementsByClassName('img-qr-code-cont')[i].style.display='flex'
            document.getElementsByClassName('img-qr-code-cont')[i].addEventListener('click', () => {
                document.getElementsByClassName('img-qr-code-cont')[i].style.display='none'
            })
        })
    })

    document.querySelectorAll('.icon-remove-list').forEach((el) => {
        el.addEventListener('click', () => {
            console.log('click')
            let i = el.getAttribute('remove-index')
            let username = document.getElementsByClassName('user-name-list')[i].textContent
            document.getElementsByClassName('notice-remove-modal-tit')[0].innerHTML = 'Xác nhận xóa tài khoản ' + '"' + username + '"'
            document.getElementsByClassName('notice-remove')[0].style.display='flex'

            document.getElementsByClassName('notice-remove-modal-cancel')[0].addEventListener('click', () => {
                document.getElementsByClassName('notice-remove')[0].style.display='none'
            })

            document.getElementsByClassName('notice-remove-modal-confirm')[0].addEventListener('click', () => {
                removeUserCtrl(username)
            })
        })
    })

})

waitForElm('.sub-menu-list').then(() => {
    document.querySelectorAll('.update-user-list').forEach((el) => {
        el.addEventListener('click', ()=> {
            let i = el.getAttribute('update-index')
            if(el.getAttribute('status-id') == 'hide') {
                document.getElementsByClassName('sub-menu-list')[i].style.display='flex'

                el.setAttribute('status-id', 'show')

                document.getElementsByClassName('update-pass')[i].addEventListener('input', () => {
                    if(document.getElementsByClassName('update-pass')[i].value.length > 2) {
                        document.getElementsByClassName('update-role')[i].classList.add('disabled')
                        document.getElementsByClassName('update-site')[i].classList.add('disabled')
                    } else {
                        document.getElementsByClassName('update-role')[i].classList.remove('disabled')
                        document.getElementsByClassName('update-site')[i].classList.remove('disabled')
                    }
                })

                document.getElementsByClassName('update-role')[i].addEventListener('change', () => {
                    if(document.getElementsByClassName('update-role')[i].value != 'default') {
                        document.getElementsByClassName('update-pass')[i].classList.add('disabled')
                        document.getElementsByClassName('update-site')[i].classList.add('disabled')
                    } else {
                        document.getElementsByClassName('update-pass')[i].classList.remove('disabled')
                        document.getElementsByClassName('update-site')[i].classList.remove('disabled')
                    }
                })

                document.getElementsByClassName('update-site')[i].addEventListener('change', () => {
                    if(document.getElementsByClassName('update-site')[i].value != 'default') {
                        document.getElementsByClassName('update-pass')[i].classList.add('disabled')
                        document.getElementsByClassName('update-role')[i].classList.add('disabled')
                    } else {
                        document.getElementsByClassName('update-pass')[i].classList.remove('disabled')
                        document.getElementsByClassName('update-role')[i].classList.remove('disabled')
                    }
                })
                
                document.getElementsByClassName('confirm-update-btn')[i].addEventListener('click', () => {
                    let username = document.getElementsByClassName('user-name-list')[i].textContent
                    let pass = document.getElementsByClassName('update-pass')[i].value
                    let role = document.getElementsByClassName('update-role')[i].value
                    let site = document.getElementsByClassName('update-site')[i].value
                    if(document.getElementsByClassName('update-pass')[i].value != '') {
                        updateUserCtrlPass(username, pass)
                    } else if(document.getElementsByClassName('update-role')[i].value != 'default') {
                        updateUserCtrlRoll(username, role)
                    } else if(document.getElementsByClassName('update-site')[i].value != 'default') {
                        updateUserCtrlSite(username, site)
                    }
                })

            } else if(el.getAttribute('status-id') == 'show') {
                document.getElementsByClassName('sub-menu-list')[i].style.display='none'
                el.setAttribute('status-id', 'hide')
            }


            document.getElementsByClassName('toggle-pass-update')[i].addEventListener('click', () => {
                if(document.getElementsByClassName('update-pass')[i].getAttribute('status_pw') == 'hide'){
                    document.getElementsByClassName('update-pass')[i].type='text'
                    document.getElementsByClassName('toggle-pass-update')[i].classList.remove('fa-eye')
                    document.getElementsByClassName('toggle-pass-update')[i].classList.add('fa-eye-slash')
                    document.getElementsByClassName('update-pass')[i].setAttribute('status_pw', 'show')
                } else {
                    document.getElementsByClassName('update-pass')[i].type='password'
                    document.getElementsByClassName('toggle-pass-update')[i].classList.add('fa-eye')
                    document.getElementsByClassName('toggle-pass-update')[i].classList.remove('fa-eye-slash')
                    document.getElementsByClassName('update-pass')[i].setAttribute('status_pw', 'hide')
                }
            })
        })
    })

})