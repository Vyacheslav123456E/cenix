const socket = (store) => ({
    debug: false,
    connection: 'http://localhost:5000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
})
export default socket;