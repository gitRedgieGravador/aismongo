<template>
  <div>
    <v-card class="mx-auto mt-12 pa-5" width="500">
      <form @submit="login">
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Username"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :type="'password'"
          label="Password"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn block class="mr-4" type="submit" @click="login">LOG IN</v-btn>
      </form>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    password: { required },
    username: { required, email }
  },

  data: () => ({
    password: "",
    username: "",
    show1: false,
    remark: ""
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      return errors;
    },
  },

  methods: {
    login() {
      if (this.username == "admin" && this.password == "admin") {
        this.$store.commit("setAuthentication", true);
        this.$router.push({ name: "home" });
      } else {
          this.username = ""
          this.password = ""
      }
    }
  }
};
</script>
