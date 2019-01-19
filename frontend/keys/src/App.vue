<template>
  <v-app id="app">
    <v-toolbar app>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/chat" flat>Чат</v-btn>
        <v-btn to="/auth" flat>Авторизация</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

</style>
