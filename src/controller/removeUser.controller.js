import swal from 'sweetalert';

export const removeUserCtrl = (user) => {

    let username = document.getElementById(user).value

    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": username
    });
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.appjun.net/account", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.deletedCount != 0) {
            swal("Thành công !", 'Xóa thành công tài khoản ' + '"' + username + '"', "success");
            document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
              window.location.reload()
          })
        } else {
            swal("Oops!", "Không tìm thấy tài khoản "  + '"' + username + '"', "error");
            document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
              window.location.reload()
          })
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
}