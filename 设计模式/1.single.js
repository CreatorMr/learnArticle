/*
 * @@author: Creator
 * @LastEditTime: 2023-06-07 16:41:20
 * @Description: 
 */

function check () {
    //    let username =  document.querySelector('#username').value
    //    if(!username || username.length < 6 || username.length > 12) {
    //     console.log('长度不合法')
    //    }

    //    let email =  document.querySelector('#email').value
    //    if(!email || email.length < 6 || email.indexOf('@') == -1) {
    //     console.log('email不合法')
    //    }

    let form = document.querySelector('#username')
    let inputs = form.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
        let validate = inputs[i].dataset.validate
        let validateFn = window[validate]
        if(validateFn) {
            let error = validateFn(inputs[i])
            if(error) {
                return alert(error)
            }
        }
    }
}