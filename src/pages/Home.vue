<template>
  <div class="home">
    <Container></Container>
  </div>
</template>

<script>
import Container from "@/components/Container";
export default {
  components: { Container },
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
