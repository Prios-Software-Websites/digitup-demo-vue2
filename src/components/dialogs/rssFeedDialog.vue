<template>
  <div>
    <v-dialog v-model="rssDialog" fullscreen>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="rssDialogTitle">{{rssContent.title}}</span>
          <v-spacer />
          <v-btn color="error" icon @click="closeRssDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <div style="min-height:180px;">
          <v-img v-if="rssContent.image" :src="rssContent.image" alt="RSS Image" max-height="300px" contain class="ml-1"></v-img>
          <div v-else style="height:200px; width:auto; background-color:#D1D1D1; margin:0px 15px 0px 15px;"></div>
        </div>
        <div>
          <p class="pt-10 pl-5 rssDialogDate">{{rssContent.date}}</p>
          <p class="pl-5 rssDialogDescription" style="font-size:20px">{{rssContent.content}}</p>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pb-5">
          <!-- <v-btn class="seeAllButtonBorder seeAllButtonText" rounded to="/rss"> -->
          <v-btn class="seeAllButtonBorder seeAllButtonText" rounded @click="closeRssDialog()">
            Go to External Page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      rssDialog: false,
      rssContent: [],

    }
  },
  methods:{

    // Open Dialog
    openRssDialog(data){
      this.rssDialog = true;
      this.resetRssDialog();
      this.rssContent = data;
    },

    // Close Dialog
    closeRssDialog(){
      this.rssDialog = false;
      this.resetRssDialog();
    },

    // Reset Dialog
    resetRssDialog(){
      this.rssContent
    }

  }
}
</script>

<style scoped>
.rssDialogTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssDialogDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssDialogDate {
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