<template>
  <div class="homePageWidth">
    <p class="mt-15"></p>
    <p class="trainingChapterTitle">
      <!-- {{ $t("mappingToolFrontpage.title") }} -->
      Assessment tool Digitup
    </p>
    <p class="trainingChapterDescription">
      <!-- {{ $t("mappingToolFrontpage.paragraphOne") }} -->
      The assessment tool has the purpose of assessing the profiles of SMEs
      managers and self-entrepreneurs’ digital capacity. <br />
      To conclude the profiles, I used the questions from the preliminary
      questionnaire below and also added other questions in order to make the
      assessment tool fulfill its purpose.
    </p>
    <!-- <p>{{$t("mappingToolFrontpage.paragraphTwo")}}</p>
    <p>{{$t("mappingToolFrontpage.paragraphThree")}}</p>
    <p>{{$t("mappingToolFrontpage.paragraphFour")}}</p> -->

    <v-btn
      @click="$refs.openMappingDialog.openingMappingForm(215)"
      large
      dark
      class="mt-15"
      :title="this.$t('mappingToolFrontpage.startAssessmentButtonTooltip')"
    >
      <!-- {{ $t("mappingToolFrontpage.startAssessmentButton") }} -->
      Open Mapping tool
    </v-btn>

    <!-- <MappingToolsDialog ref="openMappingDialog"></MappingToolsDialog> -->
    <MappingToolMainComponent ref="openMappingDialog" />
  </div>
</template>

<script>
import MappingToolsDialog from "@/components/MappingToolv2/MappingToolsDialog.vue";
import MappingToolMainComponent from "@/components/MappingTool/MappingToolMainComponent.vue";
export default {
  components: {
    MappingToolsDialog,
    MappingToolMainComponent,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw;
  margin: auto auto;
}
.trainingChapterTitle {
  font-family: "Barlow", sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.trainingChapterDescription {
  font-family: "Lato", sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6a6a6a;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
</style>
