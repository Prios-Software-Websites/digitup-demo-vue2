<template>
  <div>
    <v-dialog v-model="newsDialog" fullscreen>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <span v-if="$vuetify.breakpoint.mdAndDown" class="newsDialogTitlePhone" >{{newsCardData.title}}</span>
          <span v-else class="newsDialogTitle" >{{newsCardData.title}}</span>
          <v-spacer />
          <v-btn large class="closeButtonStyling" color="error" icon @click="closeNewsDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <div style="min-height:180px;" class="pb-10">
          <v-img v-if="newsCardData.media_url" :src="newsCardData.media_url" alt="News Image" max-height="300px" contain ></v-img>
          <div v-else style="height:200px; width:auto; background-color:#D1D1D1; margin:0px 15px 0px 15px;"></div>
        </div>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-col cols="12" sm="12" xs="12" :xl="item.class_list.split('xs')[1]" :lg="item.class_list.split('xs')[1]" :md="item.class_list.split('xs')[1]" class="ma-0 pa-0 pa-5" v-for="(item, index) in newsCardContentData" :key="index">
            <div v-if="item.type == 'image'">
              <v-img v-if="item.content" :src="item.content" alt="News Image" max-height="600" contain></v-img>
            </div>
            <div v-else-if="item.type == 'text'">
              <p v-html="item.content" class="pl-5 pb-5 mb-0 newsDialogDescription"></p>
            </div>
            <div v-else>
              <p>{{item}}</p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      newsDialog: false,
      newsCardData: [],
      newsCardData: [],
      newsCardContentData: []
    }
  },
  methods: {

    // Open Dialog
    openNewsDialog(originalData, contentData){
      this.newsDialog = true;
      this.newsCardData = originalData;
      this.newsCardContentData = contentData;
    },

    // Close Dialog
    closeNewsDialog(){
      this.newsDialog = false;
      this.resetDialogData();
    },

    // Reset Dialog
    resetDialogData(){
      this.newsCardData = [];
      this.newsCardContentData = [];
    },

  }
}
</script>

<style scoped>

.closeButtonStyling {
  position:fixed; 
  top:30px; 
  right:30px; 
  z-index: 5; 
  border:1px solid black; 
  background-color:rgba(255, 0, 0, 0.2);
}
.newsDialogTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}

.newsDialogTitlePhone {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.newsDialogDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.newsDialogDate {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 11px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}

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