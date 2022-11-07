function handleEvents () {
    const accountImage = document.querySelector('.member-image')
    const setingAccount = document.querySelector('.window2')
    const myInformation =  document.querySelector('.my-information-layout')

    accountImage.onclick = () =>{
        setingAccount.style.display = 'block'
    }


    const information = document.querySelector('.information')
    information.onclick = () => {
        myInformation.style.display = 'block'
        setingAccount.style.display = 'none'

        getAccount(function(users){
            users.map(user => {
                if(getUsersNameLocalStorage == user.name){
                    document.querySelector('input[name="myname"]').value = user.name
                    document.querySelector('input[name="myemail"]').value = user.email
                    document.querySelector('input[name="myphone"]').value = user.phone
                    document.querySelector('input[name="myage"]').value = user.age
                    document.querySelector('input[name="myaddress"]').value = user.adderss
                }
            })
        })

    }




    window.addEventListener('click', (e) => {
       
        if (e.target == myInformation) {
            myInformation.style.display = 'none';
        }
        if(e.target == setingAccount) {
            setingAccount.style.display = 'none';
        }
    })



    const manage = document.querySelector('.manage')
    manage.onclick = () => {
        window.location.href = './table.html'
    }

    const logout = document.querySelector('.logout')
    logout.onclick = () => {
        window.location.href = './index.html'
    }

    const getUsersNameLocalStorage = localStorage.getItem('accountName')
    
    
    
    const accountNameHTML = document.querySelector('.member-name')
    accountNameHTML.innerHTML = getUsersNameLocalStorage



    const btnCustomer = document.querySelector('.btncustomer')
    btnCustomer.onclick = () => {
        window.location.href = ''
    }


    const inputShare = document.querySelector('input[name="share-account"]')
    inputShare.oninput = () => {
        
        getAccount(function (users) {
            
            let shareMembers = users.filter((user, index)=> {
                
                return user.name.toUpperCase().includes(inputShare.value.toUpperCase())

               
                
        })
         
        renderMember(shareMembers)  
    })   
}
}

function renderMember(data) {
    
    
    let dataElement = data.map(user =>{
        return `<div class="list-1 list-a" onclick="searchMember">
        <div class="list-img">
            <img src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8=" alt="">
        </div>
        <div class="title-name-phome-list">
            <div class="name-member-search">
              ${user.name}
            </div>
        </div>
    </div>`
    })    
    document.querySelector('.account-list').innerHTML = dataElement.join('')
}





const userApi = 'http://localhost:3000/users'
function getAccount(callback) {
    fetch(userApi)
        .then(response => {
           return response.json()
        })
        .then(callback)


        
}



const btnSaveMyInfo = document.querySelector('.btn-save-myinfo')

btnSaveMyInfo.onclick = () => {
    const saveName = document.querySelector('input[name="myname"]').value
    const saveEmail = document.querySelector('input[name="myemail"]').value
    const savephone = document.querySelector('input[name="myphone"]').value
    const saveAge = document.querySelector('input[name="myage"]').value
    const saveAddress = document.querySelector('input[name="myaddress"]').value
    const getUsersIdLocalStorage = localStorage.getItem('accountId')
    let formData = {
        name: saveName,
        email: saveEmail,
        phone: savephone,
        age: saveAge,
        adderss: saveAddress
    }
    
    saveMyInfo(formData, getUsersIdLocalStorage)
}

function saveMyInfo(data, getUsersIdLocalStorage, callback) { 
    options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(userApi + '/' + getUsersIdLocalStorage, options)
        .then(function(response){
            response.json()
        })
        .then(callback)
    
}

    
    
function start () {
    handleEvents()
    getAccount(function(users){
        
    })
   
    
}
start()