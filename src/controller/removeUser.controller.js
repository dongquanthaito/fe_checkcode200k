import swal from 'sweetalert';

export const removeUserCtrl = (username) => {

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
          document.getElementsByClassName('notice-remove')[0].style.display='none'
          swal("Thành công !", 'Xóa thành công tài khoản ' + '"' + username + '"', "success");
          if(localStorage.getItem('username') == username) {
            document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.replace('/')
                    localStorage.clear()
                }, 300);
            })
          }
          document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
            window.location.reload()
          })


        } else {
          document.getElementsByClassName('notice-remove')[0].style.display='none'
          swal("Oops!", "Không tìm thấy tài khoản "  + '"' + username + '"', "error");
          document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
            window.location.reload()
          })
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
}