const net = require('net')
const readline = require('readline')
const crypto = require('crypto')
const myId = crypto.randomUUID() //Id identificador único de cada cliente
const client = new net.Socket()

client.connect(5000, 'localhost', () => {
    client.write(JSON.stringify({client_id:myId}))
    rl.addListener('line', line => {
        if(line){
            client.write(JSON.stringify({
                client_id : myId,
                 msg : line
            }))
        }
    })
    client.on('data', data => {
        let content = JSON.parse(data)
        if (content.client_id == myId && !content.all){
            console.log(content.msg)
        } else if (content.client_id != myId && content.all) { //Não exibir mensagem enviada pelo próprio usuário
            console.log(content.msg)
        }
    })
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})