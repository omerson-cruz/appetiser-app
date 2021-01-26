<template>
     <v-container class="mt-9">
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
            <div class="mt-16">
            <v-card
            elevation="2"
            shaped
            min-height="300px"
            style="position: relative"
            >
                <div>
                <v-row class="flex flex-row
                    align-center
                    justify-center
                    align-sm-center
                    ">
                  <v-col sm="6">
                  <v-list-item two-line>
                    <v-list-item-avatar>
                      <v-img
                      alt="Vuetify Name"
                      contain
                      min-width="100"
                      src="https://jobio-prd-s3.s3-ap-southeast-1.amazonaws.com/poster-photo/26522-29287-prd.png"
                      width="100"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="text-h6">Appetiser Sign Up</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  </v-col>
              </v-row>
              </div>

            <!-- ERROR MESSAGE -->
            <v-row class="flex-row justify-center flex-wrap mx-0 pa-5">
              <v-alert
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
                  @submit.prevent="handleSignUpUser"
                  v-model="isFormValid"
                  lazy-validation
                  ref="form"
                  class="px-12 pb-3"

                >

                      <v-row>
                        <v-col cols="12">
                        <v-text-field
                        v-model="email"
                        prepend-icon="mdi-mail"
                        label="Email"
                        type="email"
                        required
                        :rules="emailRules"
                        >
                        </v-text-field>
                      </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                        <v-text-field
                        v-model="name"
                        prepend-icon="mdi-face"
                        label="Full Name"
                        type="text"
                        required
                        :rules="nameRules"
                        >
                        </v-text-field>
                      </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                          v-model="password"
                          prepend-icon="mdi-key"
                          label="Password"
                          type="password"
                          required
                          :rules="passwordRules"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                          v-model="confirmPassword"
                          prepend-icon="mdi-key"
                          label="Confirm Password"
                          type="password"
                          required
                          :rules="passwordRules"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="align-center align-sm-center flex flex-column flex-sm-row justify-center" no-gutters>
                        <v-col sm="12" cols="6" class="text-sm-center">
                          <v-btn
                            color="accent"
                            type="submit"
                            :loading="loading"
                            :disabled="!isFormValid"
                          >
                            SUBMIT
                          </v-btn>

                        </v-col>
                        <v-col cols="8" >
                          <h5 class="my-3 text-sm-center text-center">
                            Already have an account?
                            <router-link to="/login">Sign In</router-link>
                          </h5>
                        </v-col>
                      </v-row>
                </v-form>
            </v-card>
          </div>
          </v-col>
      </v-row>
      </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      loading: false,

      isFormValid: true,
      email: "",
      password: "",
      name: "",
      confirmPassword: "",

      // Vuetify Form validation
      emailRules: [
        (email) => {
          return !!email || "Email is required";
        },
        // using Regular Expression in input validation
        (email) => /.@+./.test(email) || "Email must be valid",
      ],
            // Vuetify Form validation
      nameRules: [
        (email) => {
          return !!email || "Full Name is required";
        },
      ],
      passwordRules: [
        // double bang (!!) means to convert into boolean whatever the value of password
        // and then if it is truee then arrow function will evaulate to the true value
        // of !!password. IF false then it will return the value of the String after the || OR operator
        (password) => !!password || "Password is required",
        // Make sure password is at least 7 characters
        (password) =>
          password.length > 8 || "Password should be more than 8 characters",
                // remember that Password Rules is also linked to the "passwordConfirmation" input field
        (confirmation) =>
          confirmation === this.password || "Password must match",
      ],
    };
  },

  methods: {
    handleSignUpUser() {
      // sign up user action
      if (this.$refs.form.validate()) {
        // with the help of the lazy valiation and the "ref" in the v-form Once the submit button is clicked then we can validate ALL of the inputs and then call the Vuex store to dispatch action to "signUpUser"
        this.$store.dispatch("signUpUser", {
          // below paramaters are based on the GraphQL schema we defined for the SignUp Mutation
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
      }
    }
  },

  computed: {
    ...mapGetters({
      error : 'error'
    })
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