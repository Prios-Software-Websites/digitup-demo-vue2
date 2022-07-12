<template>
  <div class="homePageWidth">
    <TrainingModulePage></TrainingModulePage>
  </div>
</template>

<script>
import TrainingModulePage from "@/components/TrainingModule/TrainingModulePage.vue"
export default {
  name: 'Training-Modules',
  components: {
    TrainingModulePage
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