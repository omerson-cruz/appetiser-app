<template>
     <v-container>
      <v-row
        class="flex flex-row
        align-center
        justify-center
        align-sm-center
        welcome-container"
        >
          <v-col
            sm="6"
          >
          <div class="mt-5">
            <v-card
            elevation="2"
            shaped
            min-height="300px"
            style="position: relative"
            class="pt-10"
            >

          <div class="d-flex mx-0 justify-center align-center mb-9">
            <div>
                <div class="d-flex">
                <v-img
                  class="ml-n8"
                  alt="Vuetify Name"
                  contain
                  min-width="50"
                  src="https://jobio-prd-s3.s3-ap-southeast-1.amazonaws.com/poster-photo/26522-29287-prd.png"
                  width="90"
                  />
                <div class="d-flex align-center justify-center ml-n3">
                  <span class="text-h6 ">Appetiser Verify</span>
                </div>
            </div>
            </div>
          </div>
          <v-row class="d-flex justify-center">
              <v-col cols="10">
                    <v-alert
                    icon="mdi-shield-lock-outline"

                    text
                    type="info"
                    >
                    <span class="text-caption">
                        <h3>
                            Account not yet verified. Please check your email for verification code.
                        </h3>
                    </span>
                    </v-alert>
              </v-col>
          </v-row>
        <!-- ERROR MESSAGE -->
            <v-row class="flex-row justify-center flex-wrap mx-0 pa-4">
              <v-alert
                toggle=""
                border="right"
                colored-border
                type="error"
                elevation="2"
                class="text-subtitle-2"
                transition="scale-transition"
                dismissible
                v-if="error"
              >
                <span class="red--text">
                  {{error}}
                </span>
              </v-alert>
            </v-row>



            <!-- LOGIN FORM -->
                <v-form
                  v-model="isFormValid"
                  lazy-validation
                  ref="form"
                  class="px-12 pb-3"
                  @submit.prevent
                >

                      <v-row class="">
                        <v-col offset-sm="3" cols="6" class="text-sm-center">
                            <v-text-field
                            v-model="token"
                            prepend-icon="mdi-lock"
                            label="Verification Code"
                            type="number"
                            required
                            :rules="codeRules"
                            >
                            </v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="my-5 align-center align-sm-center flex flex-column flex-sm-row justify-center" no-gutters>
                        <v-col cols="4" class="text-sm-center">
                          <v-btn
                            color="accent"
                            type="submit"
                            :loading="loading"
                            :disabled="!isFormValid"
                            @click.stop="handleVerify"
                          >
                            Verify
                          </v-btn>

                        </v-col>
                        <v-col cols="5" >
                          <v-btn
                            color="accent-lighter"
                            type="submit"
                            :loading="loading"
                            @click.stop="handleResendVerify"
                          >
                            Resend Verification Code
                          </v-btn>
                        </v-col>
                      </v-row>
                      <!-- REFRESH TOKEN -->
                      <!-- <v-row class="d-flex justify-center my-7">
                        <div>
                          <v-btn
                              color="success"
                              type="submit"
                              :loading="loading"
                              @click.stop="handleRefreshToken"
                            >
                              Refresh Token
                            </v-btn>
                        </div>
                      </v-row> -->
                </v-form>

            </v-card>
          </div>
          </v-col>
      </v-row>
      </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: false,

      isFormValid: true,
      token: "",
      // Vuetify Form validation
      codeRules: [
        (code) => {
          return !!code || "Verification code is required";
        },
      ],
    };
  },

  computed: {
      ...mapGetters({
          error: 'error'
      })
  },

  methods: {
      handleVerify() {
        console.log('test')
        this.$store.dispatch('verify',this.token)
      },
      handleResendVerify() {
        console.log('handle Resend verify')
        this.$store.dispatch('resendVerification')
      },
      handleRefreshToken() {
        console.log('handle Refresh Token')
        this.$store.dispatch('refreshToken')
      }
  }

}
</script>

<style scoped>
.welcome-container {
    min-height: 100vh;
}

/* .welcome-content {
    display: inline-block;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
} */
</style>,