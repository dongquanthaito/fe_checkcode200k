import swal from 'sweetalert';
import { random, whiteListUser } from '../helper/whiteListUser';
import { addPoint } from './addPoint.controller';
import { findSiteCode } from './find.controller';

export const findDaNhanKmCtrl = (getUser, point, code, promo) => {
  let getPlayer = getUser.toString().toLowerCase().replace(/\s/g, '')
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem('token'));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch("https://www.appjun.net/nhankm/find-player-km?player=" + getPlayer, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(whiteListUser)
      if(whiteListUser.includes(getPlayer)) {
        console.log('White List')
        addPoint(getPlayer, point, code, random())
      } else {
        if(result.statusCode == 200){
          document.getElementsByClassName('loader')[0].style.zIndex='-1'
          console.log('Tài khoản đã nhận KM')
          swal("Oops !", "Tài khoản "+ '"' + getPlayer + '"' +" đã nhận khuyến mãi", 'error');
          document.getElementsByClassName('swal-button--confirm')[0].addEventListener('click', () => {
              setTimeout(() => {
                  window.location.reload()
              }, 300);
          })
        }else if(result.statusCode == 403){
            console.log('Tài khoản chưa nhận KM')
            addPoint(getPlayer, point, code, promo)
        }
      }
      console.log(result)
    })
    .catch(error => console.log('error', error));
}

export const postDaNhanKmCtrl = (getPlayer, getPromo, getPoint, code_string) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "player": getPlayer,
      "promo": getPromo,
      "point": getPoint,
      "code_string": code_string
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.appjun.net/nhankm/post-player-km", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        console.log('Add player into schema - success')
      })
      .catch(error => console.log('error', error));    
}