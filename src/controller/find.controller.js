import waitForElm from "../middlewares/waitForElm";
import { addPoint } from "./addPoint.controller";

export const findSiteCode = (code) => {
  let site = localStorage.getItem('site')
  let code_string = document.getElementById(code).value
  var myHeaders = new Headers();
  let authorization = localStorage.getItem('token')
  myHeaders.append("Authorization", authorization);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  console.log("site: " + site)
  console.log("code_string " + code_string)
  
  fetch("https://www.appjun.net/code?site="+ site +"&code_string=" + code_string, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(result == "") {
        document.getElementsByClassName('loader')[0].style.zIndex='-1'
        document.getElementById('non-status').style.display="flex"
        document.getElementById('non-status').innerHTML = "Mã khuyến mãi không tồn tại hoặc đã bị xóa."
      } else {

        var container = document.getElementsByClassName('result')[0]
        var username = document.getElementById('user').value
        var promoname = document.getElementById('promo').value
        var i = -1

        result.forEach((el) => {
          i++
          let resultContainer = document.createElement('div')
          resultContainer.setAttribute('class', 'result-container')
          container.appendChild(resultContainer)

          let getCode = document.createElement('span')
          getCode.setAttribute('class', "get-code")
          resultContainer.appendChild(getCode)

          let getUser = document.createElement('span')
          getUser.setAttribute('class', "get-user")
          resultContainer.appendChild(getUser)

          let getPromo = document.createElement('span')
          getPromo.setAttribute('class', "get-promo")
          resultContainer.appendChild(getPromo)

          let getStatus = document.createElement('span')
          getStatus.setAttribute('class', "get-status")
          resultContainer.appendChild(getStatus)

          if(el.status == '0') {
            getCode.innerHTML = el.code_string
            getUser.innerHTML = username
            getPromo.innerHTML = promoname

            getStatus.setAttribute('class', "available")
            getStatus.setAttribute('status', "available")
            getStatus.setAttribute('btn-index', i)

            getStatus.innerHTML = "Code chưa sử dụng"
            getStatus.addEventListener('mouseover', () => {
              getStatus.innerHTML = "Sử dụng cho " + username
              getStatus.addEventListener('mouseout', () => {
                getStatus.innerHTML = "Code chưa sử dụng"
              })
            })            
          } else if(el.status == "1"){
            getCode.innerHTML = el.code_string
            getUser.innerHTML = username
            getPromo.innerHTML = promoname
  
            getStatus.setAttribute('class', "used disabled")
            getStatus.setAttribute('status', "used")
            getStatus.innerHTML = "Code đã sử dụng"
            
          }
        })

        document.getElementsByClassName('loader')[0].style.zIndex='-1'
        document.getElementsByClassName('result')[0].style.display="flex"

        if(document.getElementsByClassName('used')[0]) {
          document.getElementsByClassName('result-main-cont')[0].classList.add('disabled')
        }
      }

      waitForElm('.available').then(() => {
        document.querySelectorAll('.available').forEach((el) => {
            el.addEventListener('click', () => {
                document.getElementsByClassName('loader')[0].style.zIndex='1'
                document.getElementsByClassName('result-main-cont')[0].style.display="none"
                addPoint('user', 'promo', 'code', result[0].point)
            })
        })
      })
      
    })
    .catch(error => {
      window.location.reload()
      console.log('error', error)
    });


}