const net = require('net')
const readline = require('readline')
const client = new net.Socket()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const handleConnection = socket => {
    socket.on('error', (err) => {
            console.log("Qualquer erro que possa dar por desconexão ou problemas no socket.")
        }
    )
    rl.addListener('line', line => {
        socket.write("Fulano: "+line)
    })
    socket.on('data', data => {
        console.log(data.toString())
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')