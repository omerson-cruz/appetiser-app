<template>
    <v-app-bar
      app
      color="accent"
      dark
    >
      <!-- <div class="d-flex align-center logo-container" @click="$router.push('/')" > -->
        <router-link to="/" tag="div">
          <div class="d-flex align-center logo-container">
              <v-img
              alt="Vuetify Name"
              class="shrink mt-1"
              contain
              min-width="100"
              src="https://jobio-prd-s3.s3-ap-southeast-1.amazonaws.com/poster-photo/26522-29287-prd.png"
              width="100"
            />
            <span class="text-h5 shrink mt-1 hidden-sm-and-down">
              Appetiser
            </span>
          </div>
        </router-link>
      <!-- </div> -->
      <v-spacer></v-spacer>
      <!-- HORIZONTAL MAIN LINKS RIGHT SIDE -->


            <template v-if="!user">
              <v-btn
                depressed
                dark
                color="accent"
                elevation="0"
                v-for="item in horizontalNavItems"
                :key="item.title"
                :to="item.link"
                exact
              >
                <v-icon left>{{item.icon}}</v-icon>
                {{item.title}}
              </v-btn>
            </template>


            <!-- Sign Out Button  -->
            <v-btn
              depressed
              elevation="0"
              v-if="user"
              color="accent"
              @click="handleSignOutUser"
            >
              <v-icon
                class="hidden-sm-only"
                left
              >
                mdi-exit-run
              </v-icon>
              Signout
            </v-btn>

      <!-- HORIZONTAL MAIN LINKS - END -->

    </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "Navbar",

    data() {
        return {
            sideNav: false,
            authSnackbar: false,
            authErrorSnackbar: false,
            badgeAnimated: false, // <<--- this will animate the notification if there is new favorite
            searchTerm: '',  // <<-- for searching Posts
        }
    },

    computed: {
      ...mapGetters({
          user: "user"
      }),

      horizontalNavItems() {
          let items = [
          // { icon: "mdi-magnify", title: "Posts", link: "/posts" },
          { icon: "mdi-lock-open-outline", title: "Sign In", link: "/login" },
          { icon: "mdi-login-variant", title: "Sign Up", link: "/register" },
          ];

              // if user not null
          if (this.user) {
          items = [
              {
              icon: "mdi-chat-processing-outline",
              title: "Posts",
              link: "/posts",
              },
              { icon: "mdi-file-star", title: "Create Post", link: "/post/add" },
          ];
          }

          return items
      }
    },

    methods: {
      handleSignOutUser() {
        this.$store.dispatch("signOut")
      }
    }

}
</script>

<style lang="scss" scoped>
.logo-container {
  &:hover {
    cursor: pointer;
  }
}

</style>