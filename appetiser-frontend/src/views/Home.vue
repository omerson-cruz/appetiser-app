<template>
  <div class="home">
    <welcome></welcome>
  </div>
</template>

<script>
import Welcome from "../components/Welcome"

export default {
  name: 'Home',
  components: {
    welcome: Welcome
  }
}
</script>
