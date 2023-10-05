export default {
    state: {
        open: false,
        delete: false
    },
    mutations: {
        updateStatusDialog(state, open){
            state.open = open
        },
        updateStatusDialogDelete(state, deletes){
            state.delete = deletes
        }
    },
    getters: {
        statusDialog(state){
            return state.open
        },
        statusDialogDelete(state){
            return state.delete
        }
    }
}
