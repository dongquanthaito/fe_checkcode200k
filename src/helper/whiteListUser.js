export const whiteListUser = ['thuhoicode']

export const random = () => {
    var text = "";  
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    text += possible.charAt(Math.floor(Math.random() * possible.length))
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    ;
    return text; 
}