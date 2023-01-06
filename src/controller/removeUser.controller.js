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
    
    fetch("http://14.225.205.2/account", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.deletedCount != 0) {
            swal("Thành công !", 'Xóa thành công tài khoản ' + '"' + username + '"', "success");
        } else {
            swal("Oops!", "Không tìm thấy tài khoản "  + '"' + username + '"', "error");
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
}