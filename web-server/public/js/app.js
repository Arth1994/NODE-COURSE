console.log("Client Side JavaScript is Loaded")


const weatherForm = document.querySelector('form')

const searchKey = document.querySelector('input')

const message1 = document.querySelector('#message1')

const message2 = document.querySelector('#message2')

message1.textContent = ''

message2.textContent = ''

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = searchKey.value


    fetch('/weather?address=' + searchKey.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message2.textContent = ''
                message1.textContent = data.error
            } else {
                message1.textContent = ''
                message2.textContent = data.forecast
            }
        })
    })

})