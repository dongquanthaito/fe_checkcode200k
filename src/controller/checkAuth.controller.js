export const checkAuthLogin = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem('token'));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://www.appjun.net/auth", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(result.username){
        // window.location.replace('/admin')        
      }
    }).catch(error => {
      window.location.replace('/')
      console.log('error', error)
    });
}

export const checkAuthRegis = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem('token'));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://www.appjun.net/auth", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(result.role != "superadmin"){
        window.location.replace('/admin')
      }
    })
    .catch(error => {
      window.location.replace('/admin')
      console.log('error', error)
    }); 
}
