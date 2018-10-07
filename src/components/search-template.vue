<template>
  <div class="container">
    <div id="search">
     <my-navbar></my-navbar>
      <hr>
      <div class="container">
        <br>
        <br>
        <h5> <i id="info" class="material-icons"> info </i> What is this search for?</h5>
        The search is used by every user to search for academics research projects and to inform about research projects.
        It enables the interested public to inform themselves via the internet about research projects of Universities and Hospitals.
        This search does not offer quantitative information on the number or the financial scope of the projects.
        <br><br>
        <h5> <i id="info" class="material-icons"> info </i> What is a valid research project?</h5>
        A valid research project is work which contributes to scientific research and is already accepted from a national research foundation.
        <br><br>
        <br><br>
        <h1>Search for Projects</h1>
        <br><br>
        <input autofocus autocomplete="off" placeholder="What are you looking for?" size="30" maxlength="64" type="text">
        <router-link to="/search" class="material-icons btn btn-outline-secondary" @click.native="searchButtonClick ()">search</router-link>
        <br><br>
        <router-link to="/addProject" class="material-icons btn btn-outline-secondary"> <i id="pointer" data-toggle="tooltip" title="add a project" class="material-icons"> note_add </i></router-link>
        <b>&nbsp add new project</b>
        <br><br>
        <button class="material-icons btn btn-outline-secondary"> <i style="vertical-align:middle;color:white;cursor:pointer;" @click="retrieveProjects()" data-toggle="tooltip" title="RETRIEVE PROJECTs" class="material-icons"> pageview </i></button>
        <b>&nbsp view all projects</b>
        <br><br><br>
        <div class="row">
          <div v-for="project in allProjectsText">
            &nbsp &nbsp
            <my-card>
              <div slot="body">
              <img class="card-img-top" src="/public/logo-48.png" alt="zenbus Card image cap">
                {{ project.body.description._value }}
              </div>
              <div slot="footer">
                {{ project.body.title }} &nbsp
                <button style="vertical-align:middle;cursor:pointer;" @click="donate(project)" class="btn btn-light" data-toggle="tooltip" title="DONATE">donate</button>
              </div>
            </my-card>
          </div>
        </div>
        <br><br>
        <h6 style="color: rgb(33, 37, 41);">Written by Betina Schnepf / copyright private</h6> 全部
        </div>
        <br>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      allProjects: 'allProjects',
      allProjectsText: 'allProjectsText',
      loginAddress: 'loginAddress',
      zenbuTokens: 'zenbuTokens'
    })
  },
  methods: {
    retrieveProjects () {
      var ids = this.$store.getters.allProjects
      var id = ''
      for (id in ids) {
        var hash = ids[id]
        this.$store.dispatch('retrieveFileOnBZZ', hash)
      }
    },
    donate (project) {
      this.$store.dispatch('setProjectData', project)
      this.$router.push('/project')
    },
    searchButtonClick () {
      // var param = this.$store.getters.loginAddress
      this.$store.dispatch('createTokens')
    }
  },
  name: 'searchTemplate'
}
</script>

<style scoped>
#pointer {
  vertical-align: middle;
  color: white;
  cursor: pointer;
}
#info {
  vertical-align: middle;
}
#search {
  font-family: 'Helvetica neue', Arial, sans-serif;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: rgba(0, 0, 0, 0.03);
  background-image: url('/public/zenbuKlein.png');
  color: white;
}
</style>
