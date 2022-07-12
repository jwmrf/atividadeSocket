const net = require('net')

var clientsName = [] //Array que fará a relação de cada id de cliente com seu respectivo nome
var socketsList = [] //Array que irá armazenar o socket sempre que um usuário fizer o 'cadastro' com username

const handleConnection = socket => {
    socket.on('error', (err) => {
            console.log("Qualquer erro que possa dar por desconexão ou problemas no socket.")
        }
    )
    socket.on('data', data => {
        try {
            let content = JSON.parse(data)
            if(content.client_id) {
                if (!clientsName[content.client_id]) { //Verifica que é um usuário novo e ainda não possui username cadastrado
                    if (!content.msg) {
                        socket.write(JSON.stringify({
                            client_id: content.client_id,
                            msg : 'Olá, informe seu username para entrar no chat',
                            all : false
                        }))
                    } else {
                        clientsName[content.client_id] = { name: content.msg}
                        socketsList.push(socket)
                        socket.write(JSON.stringify({
                            client_id: content.client_id,
                            msg : 'Usuário Criado, seja bem vindo ' + content.msg,
                            all : false
                        }))
                    }
                } else {
                    let mensagem = clientsName[content.client_id].name + ": " + content.msg
                    for (let client of socketsList) {
                        client.write(JSON.stringify({
                            client_id: content.client_id,
                            msg : mensagem,
                            all : true
                        }))
                    }
                    console.log(mensagem)
                }
            }
        } catch (error) {
            console.log("Mensagem recebida em formato incorreto")
        }
    })
}

const server = net.createServer(handleConnection)
server.listen(5000, '127.0.0.1')