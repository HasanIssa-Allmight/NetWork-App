const fs = require('fs')
const path = require('path')

const Log_Dir = path.join(__dirname , 'logs')

function logResults(fileName , label , data){
    const entry = {
        time: new Date().toISOString(),
        label,
        ...data
    }
    const line = JSON.stringify(entry) + '\n'
    fs.appendFileSync(path.join(Log_Dir , fileName) , line)
}

module.exports = {logResults}