import { whiteListUser } from "../helper/whiteListUser";
import { postDaNhanKmCtrl } from "./daNhanKm.controller";
import { updateUsed } from "./updateUsed.controller";

export const addPoint = (getUser, point, code, promo) => {

  let user = getUser.toString().toLowerCase().replace(/\s/g, '')
  let site = localStorage.getItem('site')
  let siteUpper = site.toUpperCase()

  console.log('Add ' + point + ' point')

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "user": user,
    "adjustment": point,
    "turnover": point,
    "remark": promo,
    "ecremark": siteUpper + " chúc mừng quý khách đã nhận được khuyến mãi " + user + " - " + promo,
    "subject": siteUpper+" chúc mừng quý khách đã nhận được khuyến mãi " + promo,
    "content": "<p>Chúc mừng quý khách đã nhận được điểm thưởng từ "+ siteUpper + ". Chúc quý khách may mắn và tham gia vui vẻ tại "+ siteUpper +".com</p>",
    "validateTimeStart": "currentStartDay",
    "validateTimeEnd": "currentEndDay"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  let siteFetch
  if(site == "f8bet") {
    siteFetch = 'km.casinomocbai.info/addpoint/'
  } else if(site == 'hi88' || site == 'jun88') {
    siteFetch = 'www.appjun.net/addpoint/' + site
  }
  console.log('site fetch ' + siteFetch)
  fetch("https://"+ siteFetch, requestOptions)
    .then(response => response.json())
    .then(result => {
      document.getElementsByClassName('loader')[0].style.zIndex='-1'
      console.log(result)

      if(result.code == 403) {
          console.log("403")
          document.getElementsByClassName('result')[0].style.display="none"
          document.getElementById('non-status').style.display="flex"
          document.getElementById('non-status').style.backgroundColor='#ff655d'
          document.getElementById('non-status').innerHTML = "Quý khách đã nhận khuyến mãi này"

      } else if(result.statusCode == 200 || result.code == 200){
          console.log("200")
          updateUsed(code, user)
          if(whiteListUser.includes(user)) {
            console.log('thuhoicode')
          } else {
            postDaNhanKmCtrl(user, promo, point, code)
          }

          document.getElementsByClassName('result')[0].style.display="none"
          document.getElementById('non-status').style.display="flex"
          document.getElementById('non-status').style.backgroundColor='rgb(77, 255, 130)'
          document.getElementById('non-status').innerHTML = "Cộng điểm thành công cho " + user + " " + point + " điểm"
          

      } else if(result.status == 499) {
        console.log("499")
        document.getElementsByClassName('result')[0].style.display="none"
        document.getElementById('non-status').style.display="flex"
        document.getElementById('non-status').innerHTML = "Không tìm thấy tài khoản người chơi"

      } else if(result.error) {
        console.log("Không tìm thấy tài khoản người chơi")
        document.getElementsByClassName('result')[0].style.display="none"
        document.getElementById('non-status').style.display="flex"
        document.getElementById('non-status').innerHTML = "Không tìm thấy tài khoản người chơi"

        document.getElementById('non-status').addEventListener('mouseover', () => {
          document.getElementById('non-status').innerHTML = "Thử lại"
          document.getElementById('non-status').addEventListener('click', () => {
            window.location.reload()
          })
          document.getElementById('non-status').addEventListener('mouseout', () => {
            document.getElementById('non-status').innerHTML = "Không tìm thấy tài khoản người chơi"
          })
        })
      }

    })
    .catch(error => {
      document.getElementsByClassName('loader')[0].style.zIndex='-1'
      document.getElementById('non-status').style.display="flex"
        document.getElementById('non-status').innerHTML = "Không tìm thấy tài khoản"
      document.getElementById('non-status').addEventListener('mouseover', () => {
        document.getElementById('non-status').innerHTML = "Thử lại"
        document.getElementById('non-status').addEventListener('click', () => {
          window.location.reload()
        })
        document.getElementById('non-status').addEventListener('mouseout', () => {
          document.getElementById('non-status').innerHTML = "Không tìm thấy tài khoản"
        })
      })
      console.log('error', error)
    });
}