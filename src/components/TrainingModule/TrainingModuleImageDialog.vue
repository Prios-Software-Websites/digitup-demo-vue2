<template>
  <v-dialog v-model="imageDialog" persistent fullscreen>
    <v-card>
      <v-app-bar clipped-left style="top: 0; position: sticky; z-index: 2;" color="primaryColor" :extension-height="8">
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-row>
        <v-col cols="12" class="pt-10">
          <!-- <v-img contain aspect-ratio="1" :src="imageToDisplay.content"></v-img> -->
          <v-img contain max-width="100vw" max-height="100vh" :src="imageToDisplay" @click="closeDialog"></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data(){
    return {
      imageToDisplay: "",
      imageDialog: false,
    }
  },
  methods:{

    // Open Dialog
    openDialog(imageURL){
      this.resetFunction();
      this.imageToDisplay = imageURL;
      this.imageDialog = true;
    },

    // Close Dialog
    closeDialog(){
      this.resetFunction();
      this.imageDialog = false;
    },

    // Reset Dialog
    resetFunction(){
      this.imageToDisplay = "";
    }
  }
}
</script>

<style scoped>
*{
  overflow: hidden;
}
</style>