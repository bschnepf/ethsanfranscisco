<template>
  <div class="container">
    <div id="addProject">
      <my-navbar></my-navbar>
      <hr>
      <div class="container">
        <br>
        <br>
        <h5> <i style="vertical-align: middle;" class="material-icons"> info </i> Who can maintain projects?</h5>
        Professors maintain projects accounts in the research & donate Dapp. Lecturers can maintain project accounts too.
        Researchers holding a doctor’s degree who are responsible for a research project can maintain accounts.
        Employees of a professor of the University who are in charge of a research project can enter their projects under the heading of "project leader" using the account of their employer.
        <br><br>
        <br><br>
        <h1 style="color: white;">Add a Project</h1>
        <br><br>
        <input id="title" autofocus autocomplete="off" placeholder="Title?" size="30" maxlength="64" type="text">
        <br><br>
        <input id="tags" autofocus autocomplete="off" placeholder="Tags" size="30" maxlength="64" type="text">
        <br><br>
        <!--<span>Project photo upload:
         <input id="photoUpload" autofocus autocomplete="off" type="file" enctype="image/jpeg">
        </span>-->
        <br><br>
        <span style="margin: 20px;">Project description:
          <br><br>
          <textarea id="projectDescription" style="padding: 20px;" rows="10" maxlength="2048" class="form-control" placeholder="Project description." type="text" :value="projectDescription" @input="changeDescription"></textarea>
        </span>
        <br><br>
        <button class="material-icons btn btn-outline-secondary"> <i style="vertical-align:middle;color:white;cursor:pointer;" @click="storeProject()" data-toggle="tooltip" title="SAVE PROJECT" class="material-icons"> publish </i></button>
        <b>&nbsp Upload Project Data</b> &nbsp &nbsp PLEASE: only ONE at the moment....
        <br><br>
        <!-- {{ projectDescription }} -->
        <br><br>
        <h6 style="color: rgb(33, 37, 41);">Written by Betina Schnepf / copyright private</h6>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['projectDescription'],
  computed: {
    ...mapGetters({
      photoId: 'photoId',
      photoIdHtml: 'photoIdHtml',
      bzzFlag: 'bzzFlag'
    })
  },
  methods: {
    data () {
      return {
        projectDescription: 'sample description'
      }
    },
    changeDescription (event) {
      this.projectDescription = event.target.value
      this.$emit('descriptionChanged', this.projectDescription)
    },
    storeProject () {
      // var file = document.getElementById('photoUpload').files
      var textTitle = document.getElementById('title').value
      var textTags = document.getElementById('tags').value
      var projectDescription = document.getElementById('projectDescription').value
      var bzzSubmission = {'title': textTitle, 'tags': textTags, 'description': projectDescription}
      this.$store.dispatch('storeFileOnBZZ', bzzSubmission)
      this.$store.dispatch('initProjectContract')
      this.$router.push('/search')
    }
  },
  name: 'addProjectTemplate'
}
</script>

<style scoped>
  #addProject {
  font-family: 'Helvetica neue', Arial, sans-serif;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: rgba(0, 0, 0, 0.03);
  background-image: url('/public/zenbuKlein.png');
  color: white;
}
</style>
