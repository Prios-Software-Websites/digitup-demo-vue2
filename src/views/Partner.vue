<template>
  <div class="homePageWidth">
    <PartnersPage></PartnersPage>
  </div>
</template>

<script>
import PartnersPage from "@/components/Partner/PartnersPage.vue"
export default {
  name: 'Partners Page',
  components: {
    PartnersPage
  },
  data() {
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
  margin-bottom: 50px;
}
</style>