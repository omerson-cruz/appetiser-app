<template>

      <v-container>
          <v-row
            class="flex-row
            align-center
            justify-center
            align-sm-center
            welcome-container"
            >
              <v-col
                sm="6"
              >
                <div class="">
                <v-card
                elevation="2"
                shaped
                min-height="200px"
                ripple
                style="position: relative"
                >
                    <span>
                        <v-img
                        alt="Vuetify Name"
                        class="shrink mt-1 hidden-sm-and-down"
                        contain
                        min-width="100"
                        src="https://jobio-prd-s3.s3-ap-southeast-1.amazonaws.com/poster-photo/26522-29287-prd.png"
                        width="120"
                        /></span>
                    <span class="welcome-content text-h4" >Welcome {{user.full_name}} to Appetiser Web App!</span>
                </v-card>
              </div>
              </v-col>
          </v-row>
      </v-container>

</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: 'Welcome',

  computed: {
    ...mapGetters([
      'user'
    ])
  }

}
</script>

<style lang="scss" scoped>
.welcome-container {
    min-height: 100vh;
}

.welcome-content {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
;
}
</style>