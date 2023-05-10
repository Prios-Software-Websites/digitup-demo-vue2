<template>
  <div class="homePageWidth">
    <p class="mt-15"></p>
    <p class="trainingChapterTitle">{{$t("mappingToolFrontpage.title")}}</p>
    <p class="trainingChapterDescription">{{$t("mappingToolFrontpage.paragraphOne")}}</p>
    <p>{{$t("mappingToolFrontpage.paragraphTwo")}}</p>
    <p>{{$t("mappingToolFrontpage.paragraphThree")}}</p>
    <p>{{$t("mappingToolFrontpage.paragraphFour")}}</p>

    <v-btn 
      @click="$refs.openMappingDialog.openDialog()" 
      large 
      dark 
      class="mt-15" 
      :title="this.$t('mappingToolFrontpage.startAssessmentButtonTooltip')"
    > 
      {{$t("mappingToolFrontpage.startAssessmentButton")}} 
    </v-btn>

    <MappingToolsDialog ref="openMappingDialog"></MappingToolsDialog>
  </div>
</template>

<script>
import MappingToolsDialog from "@/components/MappingTool/MappingToolsDialog.vue"
export default {
  components: {
    MappingToolsDialog
  },
  data(){
    return{

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