export default {
    state: {
        posts: [],
        post_search: [],
        count: 0,
        name: '',
        id: null
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        countPost(state, count) {
            state.count = count
        },
        updateTextPost(state, data){
            state.name = data.name
            state.id = data.id
        },
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
        postsCount(state) {
            return state.count
        },
        textPost(state){
            return state.name
        },
        postId(state){
            return state.id
        }
    },
    actions: {
        SOCKET_resSavePost({commit}, response) {
            if (response.success === 0) {
                commit('updatePosts', response.data);
                commit('countPost',response.count)
            }else {
                commit('errors', response)
            }
        },
        getPosts({ commit },payload) {
            this._vm.$socket.emit('get_post', payload,
                response => {

                    if (response.success === 0) {
                        commit('updatePosts',response.data)
                        commit('countPost',response.count)
                    }else {
                        commit('errors', response)
                    }
                })
        },
        addPosts({commit}, payload) {
            commit('updateTextPost', '')
            this._vm.$socket.emit('add_edit_post', payload,
                response => {
                    if (response.success === 0) {
                        commit('updatePosts', response.data)
                        commit('countPost', response.count)
                    } else {
                        commit('errors', response)
                    }
                })
        },
        deletePosts({ commit },payload){
            this._vm.$socket.emit('delete_post', payload,
                response => {
                    if (response.success === 0) {
                        commit('updatePosts', response.data)
                        commit('countPost', response.count)
                    } else {
                        commit('errors', response)
                    }
                })
        },
        searchPost({ commit },payload){
            this._vm.$socket.emit('search_post', payload,
                response => {
                    if (response.success === 0) {
                        commit('updatePosts', response.data)
                        commit('countPost', response.count)
                    } else {
                        commit('errors', response)
                    }
                })
        }
    }
}
