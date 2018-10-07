<template>
  <div class="container">
    <div id="project">
      <my-navbar></my-navbar>
      <hr>
      <br><br>
      <div class="container">
        <div class="row">
          <div class="col-md-4" style="text-align: left;">
            &nbsp &nbsp <b> Title: </b> {{ project.project_title }} &nbsp &nbsp <br><br>
            &nbsp &nbsp <b> Tags: </b> {{ project.project_tags }} &nbsp &nbsp <br><br>
            &nbsp &nbsp <b> Description: </b> {{ project.project_description }} &nbsp &nbsp <br><br>
            &nbsp &nbsp <b> Contract Address: </b> {{ project.project_contractAddress }} &nbsp &nbsp <br><br>
            &nbsp &nbsp <b> Transaction Hash: </b> {{ project.project_transactionHash }} &nbsp &nbsp <br><br>
            &nbsp &nbsp <b> Donations: </b> &nbsp &nbsp <br><br>
          </div>
          <div class="col-md-4">
            <img :src="projectImg" alt="zenbu research project sample"/>
            <br><br>
          </div>
        </div>
        <br><br>
        <h5>Donate</h5><br>
        <div>
          <input :value="sendVal" type="text" placeholder="Value in Ether">
        </div><br>
        Sending to '{{ project.project_title }}' an amount of {{ sendVal }} ETH.
        <div><br>
          <button @click="sendTransaction(sendVal)" class="btn btn-light">Send Ether</button>
        </div>
        <br><br>
        <h6>Written by Betina Schnepf / copyright private</h6>
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
      project: 'project',
      projectImg: 'projectImg'
    })
  },
  methods: {
  },
  name: 'projectTemplate'
}
</script>

<style scoped>
  h1 {
    color: white;
  }
  #project {
    font-family: 'Helvetica neue', Arial, sans-serif;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: rgba(0, 0, 0, 0.03);
    background-image: url('/public/zenbuKlein.png');
    color: white;
  }
  h6 {
    color: rgb(33, 37, 41);
  }
</style>
