import swal from 'sweetalert';

export const loginCtrl = (userId, pwId, authCode) => {
    let username = document.getElementById(userId).value
    let password = document.getElementById(pwId).value
    let authcode = document.getElementById(authCode).value

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": username,
      "password": password,
      "authcode": authcode
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.appjun.net/account/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.code == 404) {
          swal("Oops!", "Mã xác thực hoặc tài khoản không chính xác !", "error");
          console.log(result)
        } else if(result.code == 403) {
          swal("Oops!", "Sai mật khẩu !", "error");
          console.log(result)
        } else {
          localStorage.setItem('username', result.username)
          localStorage.setItem('role', result.role)
          localStorage.setItem('site', result.site)
          localStorage.setItem('token', result.token)
          console.log(result)
          setTimeout(() => {
              window.location.replace('/admin')
          }, 300);
        }

      })
      .catch(error => {
        swal("Oops!", "Có lỗi trong quá trình đăng nhập !", "error");
        console.log('error', error)
      });
}