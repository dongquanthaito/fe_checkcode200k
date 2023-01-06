import { updateUsed } from "./updateUsed.controller";

export const addPoint = (getUser, getPromo, getCode) => {

    let code = document.getElementById(getCode).value
    let user = (document.getElementById(getUser).value).toString().replace(/\s/g, '')
    let promo = document.getElementById(getPromo).value
    let site = localStorage.getItem('site')
    let siteUpper = site.toUpperCase()
    console.log(user, promo, code, site)


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "user": user,
      "adjustment": 1,
      "turnover": 1,
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
    
    fetch("http://14.225.205.2/addpoint/" + site, requestOptions)
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

            document.getElementById('code').classList.add('disabled')
            document.getElementById('user').classList.add('disabled')
            document.getElementById('promo').classList.add('disabled')

            document.getElementById('non-status').addEventListener('mouseover', () => {
              document.getElementById('non-status').innerHTML = "Thử lại"
              document.getElementById('non-status').addEventListener('click', () => {
                window.location.reload()
              })
              document.getElementById('non-status').addEventListener('mouseout', () => {
                document.getElementById('non-status').innerHTML = "Quý khách đã nhận khuyến mãi này"
              })
            })
        } else if(result.code == 200){
            console.log("200")
            updateUsed(code, user)
            document.getElementsByClassName('result')[0].style.display="none"
            document.getElementById('non-status').style.display="flex"
            document.getElementById('non-status').style.backgroundColor='rgb(77, 255, 130)'
            document.getElementById('non-status').innerHTML = "Cộng điểm thành công cho " + user

            document.getElementById('code').classList.add('disabled')
            document.getElementById('user').classList.add('disabled')
            document.getElementById('promo').classList.add('disabled')

            document.getElementById('non-status').addEventListener('mouseover', () => {
              document.getElementById('non-status').innerHTML = "Tiếp tục"
              document.getElementById('non-status').addEventListener('click', () => {
                window.location.reload()
              })
              document.getElementById('non-status').addEventListener('mouseout', () => {
                document.getElementById('non-status').innerHTML = "Cộng điểm thành công cho " + user
              })
            })

        } else if(result.status == 499) {
          console.log("499")
          document.getElementsByClassName('result')[0].style.display="none"
          document.getElementById('non-status').style.display="flex"
          document.getElementById('non-status').innerHTML = "Có lỗi trong quá trình cộng điểm"


          document.getElementById('code').classList.add('disabled')
          document.getElementById('user').classList.add('disabled')
          document.getElementById('promo').classList.add('disabled')

          document.getElementById('non-status').addEventListener('mouseover', () => {
            document.getElementById('non-status').innerHTML = "Thử lại"
            document.getElementById('non-status').addEventListener('click', () => {
              window.location.reload()
            })
            document.getElementById('non-status').addEventListener('mouseout', () => {
              document.getElementById('non-status').innerHTML = "Có lỗi trong quá trình cộng điểm"
            })
          })
        } else if(result.error) {
          console.log("Không tìm thấy tài khoản người chơi")
          document.getElementsByClassName('result')[0].style.display="none"
          document.getElementById('non-status').style.display="flex"
          document.getElementById('non-status').innerHTML = "Không tìm thấy tài khoản người chơi"


          document.getElementById('code').classList.add('disabled')
          document.getElementById('user').classList.add('disabled')
          document.getElementById('promo').classList.add('disabled')

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