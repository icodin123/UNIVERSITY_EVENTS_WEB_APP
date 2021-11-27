const login = document.querySelector('#login_button')
const back = document.querySelector('#back_button')

login.addEventListener('click', e => {
    e.preventDefault();
    const username = document.querySelector('#username_input').value;
    const password = document.querySelector('#password_input').value;

    if(username === 'admin' && password === 'admin'){
        window.location.href = '/admin/home';
    }else{
        alert('Invalid Admin Credentials'); 
    }

})

back.addEventListener('click' , e => {
  window.location.href = '/';
})