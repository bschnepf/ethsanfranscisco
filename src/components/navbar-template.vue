<template>
  <nav class="navbar navbar-toggleable-sm navbar-expand-lg navbar-light">
    <router-link to="/" class="navbar-brand"><img id="logo" src="/public/logo.png"><b>Research & Donate<span class="sr-only">(current)</span></b></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link to="/search" class="nav-link"> <i id="material" data-toggle="tooltip" title="search for projects" class="material-icons"> search </i>&nbsp<b style="color: white;">Add / View Projects</b></router-link></li>
        <li class="nav-item">
          <router-link to="/explorer" class="nav-link"> <i id="material" data-toggle="tooltip" title="check your transactions" class="material-icons"> control_camera </i>&nbsp<b style="color: white;">Blockchain Explorer</b></router-link></li>
        &nbsp &nbsp  &nbsp &nbsp
        <li class="nav-item" >
          <div v-show="newLogin">
            <input v-model="firstName" type="text" placeholder="first name" size="10" maxlength="64">
            <input v-model="lastName" type="text" placeholder="last name" size="10" maxlength="64">
            <i id="pointer" class="material-icons" data-toggle="tooltip" title="login" @click="createLogin (firstName, lastName)"> accessibility_new </i>
          </div>
          <div v-show="!newLogin" id="border" class="border border-white">
            Welcome
            <i id="loginName" class="material-icons" data-toggle="tooltip" title="you are logged in"> perm_identity </i> {{ loginFirstName }} {{ loginLastName }}
            <br> <br>
            Logout:
            <i id="material" class="material-icons" data-toggle="tooltip" title="logout"> indeterminate_check_box </i>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      newLogin: 'newLogin',
      loginFirstName: 'loginFirstName',
      loginLastName: 'loginLastName'
    })
  },
  methods: {
    createLogin (first, last) {
      var params = [first, last]
      this.$store.dispatch('createLogin', params)
    }
  },
  name: 'navbarTemplate'
}
</script>

<style scoped>
#border {
  padding: 4px;
  margin: 4px;
  border: 4px solid;
}
#loginName {
  color: white;
  vertical-align: middle;
}
#material {
  vertical-align: middle;
  color: white;
  cursor: pointer;
}
#pointer {
  vertical-align: middle;
  color: white;
  cursor: pointer;
}
#logo {
  width: 20%;
  margin: 0px;
  padding: 0px;
}
.navbar-brand {
  -webkit-text-fill-color: white;
  -moz-text-decoration-color: white;
  color: white;
  padding-left: 0px;
  margin-left: 0px;
}
.navbar {
  color: white;
}
</style>
