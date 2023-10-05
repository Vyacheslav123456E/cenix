<template>
    <div>
        <v-app-bar app>
            <div class="d-flex align-center">
                <h3>Тест</h3>
            </div>
            <v-spacer></v-spacer>
            <v-col cols="5">
                <v-text-field dark dense outlined hide-details="auto" v-model="search"
                        label="Поиск" prepend-inner-icon="mdi-magnify" clearable/>
            </v-col>
            <v-btn text @click="openDialog" dark>
                <v-icon left>
                    mdi-plus
                </v-icon>
                Добавить пост
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>

    export default {
        name: "AppBar",
        data() {
            return {
                search: null
            }
        },
        watch: {
            search(val){
                this.$store.dispatch('searchPost',{search: val,page: 1, limit: 5})
            }
        },
        methods: {
            openDialog(){
                this.$store.commit('updateTextPost', {name: '',id: null})
                this.$store.commit('updateStatusDialog',true)
            }
        }
    }
</script>