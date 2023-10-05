<template>
    <v-row justify="center">
        <v-dialog v-model="statusDialog" persistent max-width="500">
            <v-card>
                <v-card-title class="text-h5">
                    Добавить пост
                </v-card-title>
                <v-card-text>
                    <v-textarea
                            v-model="editTextPost"
                            outlined
                            name="input-7-4"
                            label="Ваш пост"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="closeDialog">
                        Отменить
                    </v-btn>
                    <v-btn color="green darken-1" text @click="addPost">
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DialogForm",
        props: ['page', 'limit'],
        data() {
            return {
                editTextareaPost: null
            }
        },
        methods: {
            addPost() {
                this.$store.dispatch('addPosts',
                    {text: this.editTextareaPost, page: this.page, limit: this.limit, id: this.postID}
                )
                this.$store.commit('updateStatusDialog', false)
            },
            closeDialog() {
                this.$store.commit('updateStatusDialog', false)
                this.$store.commit('updateTextPost', {name: '', id: null})
            }
        },
        computed: {
            ...mapGetters(["statusDialog", 'textPost', 'postId']),
            editTextPost: {
                get() {
                    return this.textPost
                },
                set(newName) {
                    return this.editTextareaPost = newName
                }
            },
            postID() {
                return this.postId
            }
        },
    }
</script>

<style scoped>

</style>