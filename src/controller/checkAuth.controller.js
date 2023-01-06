export const checkAuthLogin = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem('token'));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("http://14.225.205.2/auth", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(!result.username){
          window.location.replace('/login')
      }
    })
    .catch(error => console.log('error', error));
}

export const checkAuthRegis = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem('token'));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("http://14.225.205.2/auth", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(!result.username){
          window.location.replace('/register')
      }
    })
    .catch(error => console.log('error', error)); 
}
