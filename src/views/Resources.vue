<template>
  <div class="homePageWidth">
    <ResourcePage></ResourcePage>
  </div>
</template>

<script>
import ResourcePage from "@/components/Resource/ResourcePage.vue"
export default {
  components: {
    ResourcePage
  },
  data(){
    return {

    }
  },
  mounted() {
    // this.getAllResources();
  },

  methods:{
    
  }
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}


</style>