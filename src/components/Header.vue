<template>
  <v-app-bar fixed app>
    <v-toolbar-title class="headline">
      <span v-on:click="tohome" class="cursor">Redgie Gravador</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-on:click="logout">
      <span>LOGOUT</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    tohome() {
      this.$router.push({
        path: "/home"
      });
    },
    logout(){
      this.$store.commit("setAuthentication", false);
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
