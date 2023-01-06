import swal from 'sweetalert';
import waitForElm from '../middlewares/waitForElm';

const registerCtrl = (user, pw, getRole, getSite) => {
    let authorization = localStorage.getItem('token')

    let username = document.getElementById(user).value
    let password = document.getElementById(pw).value
    let role = document.getElementById(getRole).value
    let site = document.getElementById(getSite).value

    var myHeaders = new Headers();
    myHeaders.append("Authorization", authorization);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": username,
      "password": password,
      "role": role,
      "site": site
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://14.225.205.2/account/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.name == "TokenExpiredError"){
            swal("Oops!", "Đã hết thời gian đăng nhập", "error");
            waitForElm('.swal-button-container').then(() => {
                document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
                    window.location.replace('/login')
                })
            })
        } else {
            let mess = '"' + username + ' - ' + role + ' - ' + site + '"'
            if(result) {
                swal("Thành công !", mess, "success");
                console.log('Tạo tài khoản thành công')
                waitForElm('.swal-modal').then(() => {
                  document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
                    window.location.reload()
                  })
                })
            } else {
                swal("Oops!", "Có gì đó sai sai!", "error");
                waitForElm('.swal-modal').then(() => {
                  document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
                    window.location.reload()
                  })
                })
                console.log('Tạo tài khoản thất bại')
            }
        }
        console.log(result)
      })
      .catch(error => {
        console.log('error', error)
      });
}

export default registerCtrl