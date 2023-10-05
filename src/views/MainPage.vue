<template>
     <div>
          <v-col v-for="post in allPosts" :key="post.id">
               <PostForm :post="post"/>
          </v-col>
          <v-col cols="12">
               <v-pagination
                       v-model="page"
                       :length="Math.ceil(postsCount / this.limit)"
                       @input="pagination()">
               </v-pagination>
          </v-col>
          <DialogForm :page="page" :limit="limit"/>
          <DialogDelete :page="page" :limit="limit"/>
     </div>
</template>

<script>
     import PostForm from "@/components/PostForm";
     import DialogForm from "@/components/DialogForm";
     import {mapGetters} from "vuex";
     import DialogDelete from "@/components/DialogDelete";

     export default {
          name: "MainPage",
          components: {DialogDelete, PostForm,DialogForm},
          data() {
               return {
                    page: 1,
                    limit: 5
               }
          },
          methods: {
               pagination() {
                    this.$store.dispatch('getPosts', {page: this.page,limit: this.limit})
               }
          },
          created() {
               this.$store.dispatch('getPosts', {page: this.page, limit: this.limit})
          },
          computed: mapGetters(["allPosts", "postsCount"]),

     }
</script>

<style scoped>
     .theme--light.v-pagination .v-pagination__item{
          color: #000000;
     }
</style>