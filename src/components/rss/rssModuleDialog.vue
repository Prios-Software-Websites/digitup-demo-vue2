<template>
  <v-dialog v-model="rssModule" width="70vw">
    <v-card class="pa-5">
      <v-row>
        <v-col cols="12">
          <p class="text-center title">{{rssContent.title[0]}}</p>
        </v-col>
        <v-col cols="12">
          <!-- <p class="mb-0">Date: {{rssDate}}</p> -->
          <p class="mb-0">
            <span style="font-weight:bold;">Author: </span>
            <span> {{rssContent["dc:creator"][0]}}</span>
          </p>
          <!-- <p class="mb-0">Category: {{rssContent.category}}</p> -->
        </v-col>
        <v-col cols="12">
          <div v-html="rssContent.description[0]" style="font-size:18px;"></div>
        </v-col>
        <v-col cols="12">
          <v-btn class="seeAllButtonBorder seeAllButtonText" rounded :href="rssContent.link" target="_blank">
            Go to External Page
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      rssModule: false,
      rssContent: [],
      rssDate: ""
    }
  },
  methods: {

    // Open Dialog
    openDialog(rssData){
      this.rssModule = true;
      this.rssContent = rssData;
      this.rssDate = rssData.pubDate[0];
    },

    // Close Dialog
    closeDialog(){
      this.rssModule = false;
    },
  }
}
</script>

<style scoped>
.seeAllButtonText {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #205072;
  opacity: 1;
  text-align: center;
  letter-spacing: 0px;
  text-transform: initial;
}
.seeAllButtonBorder {
  border: 3px solid #205072;
  font-family: 'Lato', sans-serif;
  opacity: 1;
  border-radius: 52px;
}
.seeAllButtonBorder:after {
  border: 3px solid #d6d2d24d;
  content: '';
  position: absolute;
  top: -9px;
  right: -9px;
  bottom: -9px;
  left: -9px;
  border-radius: 4em;
  box-shadow: 0px 2px 12px #00000033;
}
</style>