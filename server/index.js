const { server } = require('./app')
const port = process.env.API_PORT || 5000

server.listen(port, ()=> console.log(`server start ${port}`))
