import swal from 'sweetalert';

export const updateUserCtrlPass = (username, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    
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
        document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
          setTimeout(() => {
              window.location.reload()
          }, 300);
        })
      })
      .catch(error => {
        swal("Thất bại !", "Đổi mật khẩu thất bại.", 'error');
      });
}

export const updateUserCtrlRoll = (username, roll) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": username,
      "role": roll
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
        document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
          setTimeout(() => {
              window.location.reload()
          }, 300);
        })
      })
      .catch(error => {
        swal("Thất bại !", "Cập nhật quyền thất bại.", 'error');
      });
}

export const updateUserCtrlSite = (username, site) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": username,
      "site": site
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
        document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
          setTimeout(() => {
              window.location.reload()
          }, 300);
        })
      })
      .catch(error => {
        swal("Thất bại !", "Cập nhật trang thất bại.", 'error');
      });
}