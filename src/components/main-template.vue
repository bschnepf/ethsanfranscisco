<template>
  <div class="container">
    <div id="main">
      <my-navbar></my-navbar>
      <br>
      <br>
      <br>
      <h1>Welcome / こんにちは / Willkommen / 你好</h1>
      <br>
      <img id="banner" src="/public/banner.png" @click="test()">
      <br>
      <br>
      <h1> Tudo Bom? /  أهلا وسهلا</h1>
      <br>
      <h6>Written by Betina Schnepf / copyright private</h6>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('initWeb3')
  },
  computed: {
  },
  methods: {
    test () {
      this.$store.dispatch('initZenbuToken')
    }
  },
  name: 'main'
}
</script>

<style scoped>
  #banner {
    width: 50%;
  }
  #main {
    font-family: 'Helvetica neue', Arial, sans-serif;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: rgba(0, 0, 0, 0.01);
    background-image: url('/public/zenbuKlein.png');
    color: white;
  }
</style>
