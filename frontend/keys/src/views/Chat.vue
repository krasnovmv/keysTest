<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md4>
        <v-list two-line>
          <v-list-tile
            v-for="user in users"
            :key="user.username"
            @click="getChat(user.id)">
            <v-list-tile-content>
              <v-list-tile-title v-html="user.username"></v-list-tile-title>
              <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex md8 v-if="chatOpened">
        <v-list two-line>
          <v-list-tile
            v-for="message in chat"
            :key="message.id">
            <v-list-tile-content>
              <v-list-tile-sub-title>{{message.sender.username}} {{message.date|formatDate}}</v-list-tile-sub-title>
              <v-list-tile-title v-html="message.message"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-text-field v-model="messageText" name="message"></v-text-field>
        <v-btn @click="sendMessage" :disabled="this.messageText===''">Отправить</v-btn>
        <v-btn @click="getChat(currentUser)">Обновить</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  mounted () {
    this.$store.dispatch('chat/getUsers')
  },
  data () {
    return {
      chatOpened: false,
      currentUser: null,
      messageText: ''
    }
  },
  computed: {
    ...mapState({
      users: state => state.chat.users,
      chat: state => state.chat.chat
    })
  },
  methods: {
    getChat (user) {
      this.$store.dispatch('chat/getChat', { user: user }).then(() => {
        this.currentUser = user
        this.chatOpened = true
      })
    },
    sendMessage () {
      this.$store.dispatch('chat/sendMessage', { user: this.currentUser, message: this.messageText }).then(() => {
        this.messageText = ''
      })
    }
  }
}
</script>

<style scoped>

</style>
