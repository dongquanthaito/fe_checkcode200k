import waitForElm from "../middlewares/waitForElm";
import swal from 'sweetalert';
import { addPoint } from "./addPoint.controller";
import { findDaNhanKmCtrl } from "./daNhanKm.controller";

export const findSiteCode = () => {
  let site = localStorage.getItem('site')
  let code_string
  let code_fix = (document.getElementById('code').value).toString().replace(/\s/g, '')
  if(code_fix.indexOf(0) == 0) {
    code_string = code_fix.slice(1)
  } else {
    code_string = code_fix
  }

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem('token'));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  console.log("Site: " + site)
  console.log("Code: " + code_string)
  
  fetch("https://www.appjun.net/code?site="+ site +"&code_string=" + code_string, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('Find Code + Site')
      console.log(result)
      if(result == "") {
        document.getElementsByClassName('loader')[0].style.zIndex='-1'
        document.getElementById('non-status').style.display="flex"
        document.getElementById('non-status').innerHTML = "Mã khuyến mãi không tồn tại hoặc đã bị xóa."
      } else {
        console.log("Append")
        var container = document.getElementsByClassName('result')[0]
        container.innerHTML=''
        var i = -1

        result.forEach((el) => {
          i++
          let resultContainer = document.createElement('div')
          resultContainer.setAttribute('class', 'result-container')
          container.appendChild(resultContainer)

          let getCode = document.createElement('span')
          getCode.setAttribute('class', "get-code")
          resultContainer.appendChild(getCode)

          let getPoint = document.createElement('span')
          getPoint.setAttribute('class', "get-point")
          getPoint.innerHTML = 'Điểm:'
          resultContainer.appendChild(getPoint)

          let getStatus = document.createElement('span')
          getStatus.setAttribute('class', "get-status")
          resultContainer.appendChild(getStatus)

          let searchCont = document.createElement('div')
          searchCont.setAttribute('class', 'modal-search-cont')
          searchCont.innerHTML = `
          <div class="search-cont-frame">
            <div class="search-user">                    
              <input type="text" class="user" autoComplete="off" placeholder="Tài khoản người chơi"></input>
            </div>                  
            <select class="search-user select-promo" class="promo">
                <option value="default">- Chọn khuyến mãi -</option>
                <option value="FR200">FR200</option>
                <option value="KC200">KC200</option>
                <option value="CODE188">CODE188</option>
            </select>
          </div>`
          resultContainer.appendChild(searchCont)

          let pointResult = document.createElement('span')
          pointResult.setAttribute('class', 'point-result')
          pointResult.innerHTML = el.point
          getPoint.appendChild(pointResult)

          let btnConfirm = document.createElement('button')
          btnConfirm.setAttribute('class', 'confirm-btn')
          btnConfirm.innerHTML = 'Cộng điểm'
          searchCont.appendChild(btnConfirm)

          document.getElementsByClassName('result-main-cont')[0].style.display="flex"

          if(el.status == '0') {
            getCode.innerHTML = el.code_string


            btnConfirm.setAttribute('btn-index', i)

            getStatus.setAttribute('class', "available")
            getStatus.setAttribute('status', "available")

            getStatus.innerHTML = "Code chưa sử dụng"

          } else if(el.status == "1"){
            searchCont.innerHTML=''
            getCode.innerHTML = el.code_string
            getStatus.setAttribute('class', "used disabled")
            getStatus.setAttribute('status', "used")
            getStatus.innerHTML = "Code đã sử dụng"
            
          }
        })

        document.getElementsByClassName('result')[0].style.display="flex"
        document.getElementsByClassName('loader')[0].style.zIndex='-1'

      }

      waitForElm('.available').then(() => {
        document.querySelectorAll('.confirm-btn').forEach((el) => {
            el.addEventListener('click', () => {
              let y = el.getAttribute('btn-index')
                document.getElementsByClassName('loader')[0].style.zIndex='1'
                document.getElementsByClassName('result-main-cont')[0].style.display="none"
                let user = document.getElementsByClassName('user')[y].value
                let point = document.getElementsByClassName('point-result')[y].textContent
                let code = document.getElementsByClassName('get-code')[y].textContent
                let promo = document.getElementsByClassName('select-promo')[y].value

                if(user != '' && promo != 'default') {
                  findDaNhanKmCtrl(user, point, code, promo)
                } else {
                  document.getElementsByClassName('loader')[0].style.zIndex='-1'
                  swal("Oops !", "Vui lòng nhập đầy đủ thông tin", 'error');
                }
            })
        })
      })
      
    })
    .catch(error => {
      console.log('error', error)
    });


}