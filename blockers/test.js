// test.js
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function testFunction() {
     const keyring = caver.wallet.keyring.generate()
    console.log(keyring)
    console.log(keyring._key._privateKey)
}

export default testFunction()

