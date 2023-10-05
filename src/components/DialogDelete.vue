<template>
    <v-dialog v-model="statusDialogDelete" width="500">
<!--        <v-alert
                :value="alert"
                color="pink"
                dark
                border="top"
                class="mb-0 text-center"
                transition="scale-transition">
            Ты че делаешь? ты удаляешь пост не смей.
        </v-alert>-->
        <v-card>
            <v-card-title/>
            <v-card-text>
                <h3>Ты че делаешь? ты удаляешь пост не смей.</h3>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="closeDialogDelete">
                    Отменить
                </v-btn>
                <v-btn color="green darken-1" text @click="deletePost">
                    Удалить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DialogDelete",
        props: ['page', 'limit'],
        data() {
            return {
                alert: true,
            }
        },
        methods: {
            closeDialogDelete() {
                this.$store.commit('updateStatusDialogDelete',false)
            },
            deletePost(){
                this.$store.dispatch('deletePosts',
                    {page: this.page, limit: this.limit, id: this.postID})
                this.$store.commit('updateStatusDialogDelete',false)
            }
        },
        computed: {
            ...mapGetters(["statusDialogDelete",'postId']),
            postID() {
                return this.postId
            }
        }
    }
</script>

<style scoped>

</style>