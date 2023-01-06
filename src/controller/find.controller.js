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
  
  fetch("http://14.225.205.2/code?site="+ site +"&code_string=" + code_string, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(result == "") {
        document.getElementById('non-status').style.display="flex"
        document.getElementById('non-status').innerHTML = "Mã khuyến mãi không tồn tại hoặc đã bị xóa."
      } else {
        
        document.getElementById('get-code').innerHTML = result[0].code_string
        document.getElementById('get-user').innerHTML = document.getElementById('user').value
        document.getElementById('get-promo').innerHTML = document.getElementById('promo').value
        
        if(result[0].status == "FALSE") {
          document.getElementById('get-status').setAttribute('class', "available")
          document.getElementById('get-status').setAttribute('status', "available")
          document.getElementById('get-status').innerHTML = "Code chưa sử dụng"
          document.getElementById('get-status').addEventListener('mouseover', () => {
            document.getElementById('get-status').innerHTML = "Sử dụng cho " + document.getElementById('user').value
            document.getElementById('get-status').addEventListener('mouseout', () => {
              document.getElementById('get-status').innerHTML = "Code chưa sử dụng"
            })
          })
        } else if(result[0].status == "TRUE"){
          document.getElementById('get-status').setAttribute('class', "used disabled")
          document.getElementById('get-status').setAttribute('status', "used")

          document.getElementById('get-status').innerHTML = "Code đã sử dụng"
        }


        document.getElementsByClassName('result')[0].style.display="flex"

      }
      
    })
    .catch(error => {
      window.location.reload()
      console.log('error', error)
    });
}