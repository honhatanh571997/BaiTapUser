const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnRegister = $('.btn-register')
const btnLogin = $('.btn-login');
const dkForm = $('.window')
const dnForm = $('.window1')
const btnDkUser = $('#btn-dk-save')
const btnDkClose = $('#btn-dk-close')
const btnAdd = $('#btn-add-user')
const btnClose = $('#btn-close-user')
const table = $('#table-id-user')
const signup = $('.signup-success')
const accountImage = $('.member-image')
const setingAccount = $('.window2')


let rowTable = []
function handleEvents() {
    btnRegister.addEventListener('click', (event) => {
        dkForm.style.display = 'block';
        
    })
    btnLogin.addEventListener('click', (event) => {
        dnForm.style.display = 'block';

    })

    window.addEventListener('click', (e) => {
       
        if (e.target == dkForm) {
            dkForm.style.display = 'none';
        }
        if (e.target == dnForm){
            dnForm.style.display = 'none';
        }
        if(e.target == setingAccount) {
            setingAccount.style.display = 'none';
        }
    })
   
    btnDkClose.onclick = () =>{
        $('input[name="name"]').value = ''
        $('input[name="email"]').value = ''
        $('input[name="phone"]').value = ''
        $('input[name="password"]').value = ''
    }

    btnAdd.onclick = () =>{
        const error = $('#error-message')
        let logEmail = $('input[name="login-email"]').value
        let logPassword = $('input[name="login-password"]').value
        getUser(function(users){
            users.map(user => {
                
                if(logEmail == user.email && logPassword == user.password && logEmail != '' && logPassword != '') {    
                    localStorage.setItem('accountName', user.name)         
                    localStorage.setItem('accountEmail', user.email)         
                    localStorage.setItem('accountPhone', user.phone)
                    localStorage.setItem('accountId', user.id)                
                    window.location.href = './index1.html'

                }else{
                    error.style.display = 'block'
                }
            })
            
        })
    }


    btnClose.onclick = () =>{
        $('input[name="login-email"]').value = ''
        $('input[name="login-password"]').value = ''
    }

    accountImage.onclick = () =>{
        setingAccount.style.display = 'block'
    }

    const logout = $('.logout')
    logout.onclick = () =>{
        location.reload();
    }
   
}   





// /////////////
const userApi = 'http://localhost:3000/users'



function getUser(callback) {
    fetch(userApi)
    .then((response) =>{
        return response.json();
        })
        .then(callback)
}


function createUser(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(userApi, options)
        .then(function(response){
            response.json()
        })
        .then(callback)
    
}








function handleDkForm(){
    btnDkUser.onclick = function(){
        let name = $('input[name="name"]').value
        let email = $('input[name="email"]').value
        let phone = $('input[name="phone"]').value
        let password = $('input[name="password"]').value
        
        let formData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        }

        createUser(formData, function() {
            getUser(function(users){
                renderUser(users)
            })
        })
    }
}


function start() {
    handleEvents()
    getUser(function(users){
        
        renderUser(users)
    })
    handleDkForm()
}

start()



