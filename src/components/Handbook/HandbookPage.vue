<template>
  <div class="homePageWidth">
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <p class="handbookTitle">Handbook</p>
        <!-- <p class="handbookDescription">
          Our partnership is still working on the curriculum, resources center and the training materials.  <br>
          Once they are available, you will be able to find them here.
          <br>
          Below you will find an example of one such module.
        </p> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}

.handbookTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.handbookDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}

</style>