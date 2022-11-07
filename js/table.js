const userApi = 'http://localhost:3000/users'

fetch(userApi)
    .then(response => {
        return response.json()
    })
    .then(datas => {
        let htmls = datas.map(data => {
            return `<tr class="user-item-${data.id}">
                <th>${data.id}</th>
                <th>${data.name}</th>
                <th>${data.email}</th>
                <th>${data.phone}</th>
                <th>${data.password}</th>
                <th class="th-onclick" onclick="deletedata(${data.id})">&times;</th>
            </tr>`
        })
        const table = document.querySelector('#table-id-user')
        table.innerHTML = htmls.join('\n')
    })

function deletedata(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(userApi + '/' + id, options)
        .then(response => {
            response.json()
        })
        .then(() => {
            let userItem = document.querySelector('.user-item-' + id)
            if(userItem){
                if(confirm('Muốn xóa người này khỏi danh sách ')){
                    userItem.remove()

                }
            }
        })
}

function handelEvents() {
    const xx = document.querySelector('.xx')
    xx.onclick = () => {
        window.location.href = './index1.html'
    }
}
handelEvents()

