class Promise {
    constructor (fn) {
        this.callBacks = []
        this.resolve = (data) => {
            this.callBacks.forEach(item => item(data))
        }
        fn(this.resolve);
    }
    then(sucess) {
        this.callBacks.push(sucess);
    }
}

let p = new Promise(function (resolve) {
    setTimeout(() => {
        resolve('ok')
    }, 2000);
});


p.then(data => console.log(data))
