<template>
  <div class="homePageWidth">
    <NewsDialog ref="openingNewsDialog"></NewsDialog>
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12" class="pt-0"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="pt-0">
        <NewsMainPage></NewsMainPage>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewsMainPage from "@/components/News/NewsMainPage.vue"
export default {
  name: 'News',
  components: {
    NewsMainPage
  },
  data(){
    return {}
  },
  methods: {},
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}
</style>