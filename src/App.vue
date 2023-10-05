<template>
  <v-app>
    <AppBar/>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "@/components/AppBar";

export default {
  name: 'App',
  components: {AppBar},
  data: () => ({
    //
  }),
};
</script>
