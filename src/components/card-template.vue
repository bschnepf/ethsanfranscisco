<template>
  <div id="card">
    <div class="card-container">
      <div class="card-body">
        <slot name="body">
        </slot>
      </div>
      <div class="card-footer">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
  },
  name: 'card'
}
</script>

<style scoped>
  .card-container {
    background-clip: border-box;
    background-color: rgb(255, 255, 255);
    border-bottom-color: rgba(0, 0, 0, 0.125);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0.125);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.125);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgba(0, 0, 0, 0.125);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-top-style: solid;
    border-top-width: 1px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 8px;
    min-width: 0px;
    overflow-wrap: break-word;
    position: relative;
    text-align: center;
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    border-image-source: none;
    border-image-repeat: stretch stretch;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: #868e96;
    background-color: rgba(0, 0, 0, 0.025);
  }
  .card-body {
    box-sizing: border-box;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    font-size: 14px;
    overflow-wrap: break-word;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
  }
  .card-footer {
    box-sizing: border-box;
    color: white;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    font-size: 14px;
    overflow-wrap: break-word;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
  }
</style>
