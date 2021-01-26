<template>
  <v-app>
    <nav-bar></nav-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from "./components/Navbar"

export default {
  name: 'App',

  components: {
    'nav-bar': Navbar
  },
}
</script>

<style lang="scss">
.bordered {
  border: 5px solid yellow
}



</style>
