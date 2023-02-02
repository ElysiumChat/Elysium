const bcrypt = require('bcrypt')

const stdin = process.stdin
const password = "$Huu^dNuMh^oha!f93QF@TcP4G8Kuns%!d3y#HsBtW2JRNSf7v&#JH2$yCYB#xGGh4vbr3K*nTopoT59Z2ePjtY9oV8CYL3L#h8rDQ9KJDCmJbguGA26o3HYAapo@8HX"

stdin.resume()
stdin.setEncoding('utf8');

console.log('This will run forever unless aborted (ctrl+c)!\nPress enter to start')

stdin.on('data', start)

async function start() {
    stdin.removeListener('data', start)
    let rounds = 0
    let lastTimestamp = 0
    let duration = 0
    while (true) {
        rounds += 1
        lastTimestamp = Date.now()
        await bcrypt.hash(password, rounds)
        duration = (Date.now() - lastTimestamp) / 1000
        console.log(`Rounds: ${rounds} | Duration: ${duration}s`)
    }
}