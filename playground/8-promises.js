import { resolve } from "dns";

const customPromise  = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 4, 1])
    }, 2000)
})

customPromise.then((result) => {
    console.log('Success!', result) 
}).catch((error) => {
    console.log('Error! ', error)
})