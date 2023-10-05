const app  = require('express')()
const server = require('http').createServer(app )
const fs = require('fs');
const crypto = require("crypto");

const io = require('socket.io')(server, {
    cors: {
        origin: function (origin, callback) {
            if (origin === "http://localhost:3080")
                callback(null, true)
            else callback(null, false)
        },
        credentials: true,
        methods: ["GET", "POST"]
    },
    allowEIO3: true,
    transports: ['polling', 'websocket']
})

io.of("/").on('connection', (socket) => {

    socket.on('add_edit_post', (payload) => {
        let posts = [];
        fs.readFile('./test.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                posts = JSON.parse(data);
                if (payload.id === null) {
                    posts.posts.unshift({
                        id: crypto.randomBytes(13).toString('hex'),
                        name: payload.text
                    })
                }else {
                  posts.posts.find(el => el.id === payload.id).name = payload.text;
                }
                fs.writeFile("./test.json", JSON.stringify(posts), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const page = payload.page;
                    const limit = payload.limit;
                    const startIndex = (page - 1) * limit;
                    const endIndex = page * limit;
                    let res =  posts.posts.slice(startIndex,endIndex);
                    io.sockets.emit('resSavePost', {success: 0,data: res, count: posts.posts.length})
                });
            }
        })
    });

    socket.on('get_post', async (payload,callback) => {
        const page = payload.page;
        const limit = payload.limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = await fs.readFileSync("./test.json", "utf-8");
        let jsons =  JSON.parse(data)
        let res = jsons.posts.slice(startIndex,endIndex);
        callback({success: 0,data: res, count: jsons.posts.length})
    });

    socket.on('delete_post', async (payload) => {
        let posts = [];
        fs.readFile('./test.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                posts = JSON.parse(data);
                const index = posts.posts.findIndex(key  =>  key .id === payload.id );
                posts.posts.splice(index,1);
                fs.writeFile("./test.json", JSON.stringify(posts), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const page = payload.page;
                    const limit = payload.limit;
                    const startIndex = (page - 1) * limit;
                    const endIndex = page * limit;
                    let res =  posts.posts.slice(startIndex,endIndex);
                    io.sockets.emit('resSavePost', {success: 0,data: res, count: posts.posts.length})
                });
            }
        })
    })

    socket.on('search_post', async (payload, callback) => {
        let posts = [];
        fs.readFile('./test.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                posts = JSON.parse(data);
                if (payload.search !== null && payload.search !== '') {
                    posts.posts = posts.posts.filter(el => el.name.toLowerCase().includes(payload.search.toLowerCase()))
                    console.log(posts.posts)
                }
                const page = payload.page;
                const limit = payload.limit;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                let res = posts.posts.slice(startIndex, endIndex);
                console.log(res)
                callback({success: 0, data: res, count: posts.posts.length})
            }
        })
    });
})

module.exports = {app, server}