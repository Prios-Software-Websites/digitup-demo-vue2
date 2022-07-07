<template>
  <div class="homePageWidth">
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <p class="trainingChapterTitle">Training Modules</p>
        <p class="trainingChapterDescription">This page will be designed when the content is decided</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Training-Modules',
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}

.trainingChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.trainingChapterDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}

</style>