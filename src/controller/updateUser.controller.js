import swal from 'sweetalert';

export const updateUserCtrlPass = (user, pass) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    let username = document.getElementsByClassName(user)[0].value
    let password = document.getElementsByClassName(pass)[0].value
    
    var raw = JSON.stringify({
      "username": username,
      "password": password
    });
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.appjun.net/account", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        swal("Thành công !", "Đổi mật khẩu thành công tài khoản " + '"' + username + '"', "success");
        if(localStorage.getItem('username') == username) {
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.replace('/')
                    localStorage.clear()
                }, 300);
            })
        }
      })
      .catch(error => {
        swal("Thất bại !", "Đổi mật khẩu thất bại.", 'error');
      });
}

export const updateUserCtrlRoll = (user, roll) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    let username = document.getElementsByClassName(user)[1].value
    
    var raw = JSON.stringify({
      "username": username,
      "role": document.getElementById(roll).value
    });
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.appjun.net/account", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        swal("Thành công !", "Cập nhật quyền thành công tài khoản " + '"' + username + '"', "success");
        if(localStorage.getItem('username') == username) {
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.replace('/')
                    localStorage.clear()
                }, 300);
            })
        }
      })
      .catch(error => {
        swal("Thất bại !", "Cập nhật quyền thất bại.", 'error');
      });
}

export const updateUserCtrlSite = (user, site) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    let username = document.getElementsByClassName(user)[2].value
    
    var raw = JSON.stringify({
      "username": username,
      "site": document.getElementById(site).value
    });
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.appjun.net/account", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        swal("Thành công !", "Cập nhật trang thành công tài khoản " + '"' + username + '"', "success");
        if(localStorage.getItem('username') == username) {
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.replace('/')
                    localStorage.clear()
                }, 300);
            })
        }
      })
      .catch(error => {
        swal("Thất bại !", "Cập nhật trang thất bại.", 'error');
      });
}