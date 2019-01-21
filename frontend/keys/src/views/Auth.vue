<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form v-model="form.valid">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <h1>{{form.headerText}}</h1>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :rules="[rules.required, rules.min]"
                  v-model="form.username"
                  name="username" label="Логин" box>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :rules="[rules.required, rules.min]"
                  :type="form.showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  name="password" label="Пароль" box
                  :append-icon="form.showPassword ? 'visibility_off' : 'visibility'"
                  @click:append="form.showPassword = !form.showPassword">
                </v-text-field>
              </v-flex>
              <v-flex xs12 v-if="form.type===formTypes.registration.typeName">
                <v-text-field
                  :rules="[rules.required, rules.min, rules.email]"
                  v-model="form.email"
                  name="email" label="Почтовый адрес" box>
                </v-text-field>
              </v-flex>
              <v-flex xs12 layout justify-center>
                <v-btn :disabled="loginBtnDisabled" @click="checkAndAction(formTypes.login.typeName)"
                       :flat="!(form.type===formTypes.login.typeName)">
                  Войти
                </v-btn>
                <v-btn :disabled="registrationBtnDisabled" @click="checkAndAction(formTypes.registration.typeName)"
                       :flat="!(form.type===formTypes.registration.typeName)">
                  Регистрация
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
function validateEmail (email) {
  let emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
  return emailRegexp.test(email)
}

const formTypes = {
  login: {
    typeName: 'login',
    headerText: 'Вход'
  },
  registration: {
    typeName: 'registration',
    headerText: 'Регистрация'
  }
}

export default {
  name: 'Auth',
  data () {
    return {
      form: {
        headerText: formTypes.login.headerText,
        type: formTypes.login.typeName,
        username: '',
        password: '',
        email: '',
        showPassword: false,
        valid: null
      },
      formTypes,
      rules: {
        required: value => !!value || 'Требуется заполнить',
        min: value => (value && value.length >= 8) || 'Минимальная длина 8 символов',
        email: value => validateEmail(value) || 'Ввведите корректный почтовый адрес'
      }
    }
  },
  computed: {
    loginBtnDisabled () {
      return !this.form.valid && this.form.type === formTypes.login.typeName
    },
    registrationBtnDisabled () {
      return !this.form.valid && this.form.type === formTypes.registration.typeName
    }
  },
  methods: {
    checkAndAction (type) {
      if (this.form.type === type) {
        this[type]()
      } else {
        this.form.type = type
        this.form.headerText = formTypes[type].headerText
      }
    },
    registration () {
      console.log('dispatch auth/register need here')
    },
    login () {
      this.$store.dispatch('auth/login', { username: this.form.username, password: this.form.password }).then(() => {
        localStorage.setItem('keys_token', this.$store.state.auth.jwt)
        this.$router.push({ name: 'chat' })
      })
    }
  }
}
</script>

<style scoped>

</style>
