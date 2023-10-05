import VueRouter from "vue-router";
import MainPage from '../views/MainPage'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainPage
        },
        {
            path: '*/*',
            redirect: {name: 'main'}
        },

    ]
})