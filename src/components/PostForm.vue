<template>
    <div>
        <v-card>
            <v-card-text>
                <v-flex>
                    <v-col>
                        <v-row>
                            <div v-html="post.id"/>
                            <v-spacer/>
                            <v-icon @click="editPost">mdi-pencil</v-icon>
                            <v-icon @click="deletePost">mdi-delete</v-icon>
                        </v-row>
                    </v-col>
                    <v-col>
                        <div class="text-post" v-html="post.name"/>
                    </v-col>
                </v-flex>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "PostForm",
        props: ['post'],
        data() {
            return {

            }
        },
        methods: {
            deletePost(){
                this.$store.commit('updateTextPost',{id: this.post.id})
                this.$store.commit('updateStatusDialogDelete',true)
            },
            editPost(){
                this.$store.commit('updateStatusDialog',true)
                this.$store.commit('updateTextPost',{name: this.post.name,id: this.post.id})
            }
        }
    }
</script>
