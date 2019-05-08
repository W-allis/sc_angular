<template>
	<div id="app">
		fasdfasdfasd
        <div v-elpmis="'app.pmis'">ces</div>
        <img src="/assets/images/401.gif" alt="">
    <router-view></router-view>
	</div>
</template>

<script>

export default {
  name: 'APP',
  data() {
    return {
      greeting: 'hello'
    }
  },
  mounted() {
    // console.log(elPermission)
  }
}
</script>

<style lang="less" scoped>
  @color: red;

  #app {
    color: @color;
  }
</style>
