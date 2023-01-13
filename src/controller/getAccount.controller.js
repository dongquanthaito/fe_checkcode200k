export const getFullAcc = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://appjun.net/account", requestOptions)
      .then(response => response.json())
      .then(result => {

        console.log(result)
        var container = document.getElementsByClassName('body-list-user')[0]
        container.innerHTML = ''
        let i = -1
        result.forEach((el) => {
            i++
            let role
            let site
    
            if (el.role == 'superadmin'){
                role = 'Super Admin'
            } else if(el.role == 'admin') {
                role = 'Admin'
            } else if(el.role == 'user') {
                role = 'User'
            }

            if(el.site == 'jun88'){
                site = 'Jun88'
            } else if(el.site == 'f8bet') {
                site = 'F8BET'
            } else if(el.site == 'hi88') {
                site = 'Hi88'
            }

            let userItemCont = document.createElement('div')
            userItemCont.setAttribute('class', 'user-item-cont')
            container.appendChild(userItemCont)

            let userItem = document.createElement('div')
            userItem.setAttribute('class', 'user-item')
            userItemCont.appendChild(userItem)

            let icon = document.createElement('i')
            icon.setAttribute('class', 'fa-solid fa-circle-user')
            userItem.appendChild(icon)

            let userNameList = document.createElement('span')
            userNameList.setAttribute('class', 'user-name-list')
            userNameList.innerHTML = el.username
            userItem.appendChild(userNameList)

            let roleUserList = document.createElement('span')
            roleUserList.setAttribute('class', 'role-user-list')
            roleUserList.innerHTML = role
            userItem.appendChild(roleUserList)

            let siteUserList = document.createElement('span')
            siteUserList.setAttribute('class', 'site-user-list')
            siteUserList.innerHTML = site
            userItem.appendChild(siteUserList)

            let generateQrCode = document.createElement('button')
            generateQrCode.setAttribute('class', 'generate-qr-code')
            generateQrCode.setAttribute('generate-index', i)
            generateQrCode.innerHTML = 'Mã QR'
            userItem.appendChild(generateQrCode)

            let imgQr = document.createElement('div')
            imgQr.setAttribute('class', 'img-qr-code-cont')
            userItem.appendChild(imgQr)

            let updateUserList = document.createElement('button')
            updateUserList.setAttribute('class', 'update-user-list')
            updateUserList.setAttribute('update-index', i)
            updateUserList.setAttribute('status-id', 'hide')
            updateUserList.innerHTML = 'Cập nhật tài khoản'
            userItem.appendChild(updateUserList)

            let img = document.createElement('img')
            img.setAttribute('src', el.authenticatorQr)
            imgQr.appendChild(img)

            let iconRemove = document.createElement('i')
            iconRemove.setAttribute('class', 'fa-solid fa-user-slash icon-remove-list')
            iconRemove.setAttribute('title', 'Xóa tài khoản')
            iconRemove.setAttribute('remove-index', i)
            userItem.appendChild(iconRemove)

            let subMenuList = document.createElement('div')
            subMenuList.setAttribute('class', 'sub-menu-list')
            userItemCont.appendChild(subMenuList)

            let updateListMenuCont = document.createElement('div')
            updateListMenuCont.setAttribute('class', 'update-list-menu-cont')
            subMenuList.appendChild(updateListMenuCont)

            let updatePass = document.createElement('div')
            updatePass.setAttribute('class', 'update-pass-sub-menu')
            updateListMenuCont.appendChild(updatePass)

            let updateRoll = document.createElement('div')
            updateRoll.setAttribute('class', 'update-roll-sub-menu')
            updateListMenuCont.appendChild(updateRoll)

            let updateSite = document.createElement('div')
            updateSite.setAttribute('class', 'update-site-sub-menu')
            updateListMenuCont.appendChild(updateSite)

            let textH1Pass = document.createElement('h1')
            textH1Pass.innerHTML = 'ĐỔI MẬT KHẨU'
            updatePass.appendChild(textH1Pass)

            let textH1Role = document.createElement('h1')
            textH1Role.innerHTML = 'CẬP NHẬT QUYỀN'
            updateRoll.appendChild(textH1Role)

            let textH1Site = document.createElement('h1')
            textH1Site.innerHTML = 'CẬP NHẬT ĐÀI'
            updateSite.appendChild(textH1Site)

            let divUpdatePass = document.createElement('div')
            divUpdatePass.setAttribute('class', 'update-pass-cont')
            divUpdatePass.innerHTML = `
            <i class="fas fa-lock update-icon"></i>
            <input type="password" class="update-input update-pass" placeholder="Mật khẩu mới" status_pw='hide' autoComplete="off"></input>
            <i class="fa-solid fa-eye update-icon toggle-pass-update"></i>`
            updatePass.appendChild(divUpdatePass)

            let divUpdateRole = document.createElement('div')
            divUpdateRole.setAttribute('class', 'update-role-cont')
            divUpdateRole.innerHTML = `
            <select class="update-role">
                <option value='default'>-Chọn phân quyền-</option>
                <option value='superadmin'>Super Admin</option>
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
            </select>`
            updateRoll.appendChild(divUpdateRole)

            let divUpdateSite = document.createElement('div')
            divUpdateSite.setAttribute('class', 'update-site-cont')
            divUpdateSite.innerHTML = `
            <select class="update-site">
                <option value='default'>-Chọn đài-</option>
                <option value='jun88'>Jun88</option>
                <option value='f8bet'>F8BET</option>
                <option value='hi88'>Hi88</option>
            </select>`
            updateSite.appendChild(divUpdateSite)

            let btnUpdate = document.createElement('button')
            btnUpdate.setAttribute('class', 'confirm-update-btn')
            btnUpdate.innerHTML = 'XÁC NHẬN'
            subMenuList.appendChild(btnUpdate)
        })
      })
      .catch(error => console.log('error', error));
}