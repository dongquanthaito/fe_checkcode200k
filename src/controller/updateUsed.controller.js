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
      "status": true
    });
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://14.225.205.2/code", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}