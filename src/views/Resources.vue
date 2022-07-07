<template>
  <div class="homePageWidth">
    <ResourcePage></ResourcePage>
  </div>
</template>

<script>
import ResourcePage from "@/components/Resource/ResourcePage.vue"
export default {
  name: 'Resource Page',
  components: {
    ResourcePage
  },
  data(){
    return {

    }
  },
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}
</style>