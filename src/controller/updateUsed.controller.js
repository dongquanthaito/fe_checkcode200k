export const updateUsed = (code, user) => {
  let code_string = code
  let user_used = user
  let authorization = localStorage.getItem('token')

  console.log(code_string + " - " + user)


  var myHeaders = new Headers();
  myHeaders.append("Authorization", authorization);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "code_string": code_string,
    "user_used": user_used,
    "status": '1'
  });
  
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let site = localStorage.getItem('site')
  let siteFetch
  if(site == "f8bet") {
    siteFetch = 'km.casinomocbai.info/code?code_string='+code_string+'&site=f8bet'
  } else if(site == 'hi88' || site == 'jun88') {
    siteFetch = 'www.appjun.net/code'+'?code_string='+code_string+'&site='+ site
  }

  fetch("https://"+siteFetch, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}