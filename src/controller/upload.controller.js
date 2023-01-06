import axios from "axios";
import swal from 'sweetalert';
import waitForElm from "../middlewares/waitForElm";

export const uploadCtrl = (result) => {


    var data = JSON.stringify(result);

    var config = {
      method: 'post',
      url: 'http://14.225.205.2/code',
      headers: { 
        'Authorization': localStorage.getItem('token'), 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        if(response.data) {
            console.log(response.data)
            swal("Thành công !", "Thêm thành công data", "success");
            waitForElm('.swal-modal').then(() => {
                document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
                  window.location.reload()
                })
              })
        } else {
            swal("Oopss !", "Thêm data thất bại", "error");
            waitForElm('.swal-modal').then(() => {
                document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
                  window.location.reload()
                })
              })
            console.log(response.data)
        }
        console.log(response.data);
    })
    .catch(function (error) {
        swal("Oopss !", "File nặng quá, không gánh nổi ...", "error");
        waitForElm('.swal-modal').then(() => {
            document.getElementsByClassName('swal-button')[0].addEventListener('click', () => {
              window.location.reload()
            })
          })
        console.log(error);
    });
    
}