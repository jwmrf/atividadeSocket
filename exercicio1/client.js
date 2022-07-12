const net = require('net')
const readline = require('readline')

const client = new net.Socket()

client.connect(4000, 'localhost', () => {
    rl.addListener('line', line => {
        client.write("Cicrano: "+line)
    })
    client.on('data', data => {
        console.log(data.toString())
    })
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})