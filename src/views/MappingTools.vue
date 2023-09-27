<template>
  <div class="">

    <div class="homePageWidth pb-15">
      <p class="mt-15 pt-10"></p>
      <div>
  
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
          assessment tool fulfill its purpose. <br/>
          Online assessment tool for the measurement of digital skill levels.
        </p>
        <!-- <p>{{$t("mappingToolFrontpage.paragraphTwo")}}</p>
        <p>{{$t("mappingToolFrontpage.paragraphThree")}}</p>
        <p>{{$t("mappingToolFrontpage.paragraphFour")}}</p> -->
    
        <v-btn
          @click="$refs.openMappingDialog.openingMappingForm(229)"
          large
          color="primary"
          class="mt-15"
          :title="this.$t('mappingToolFrontpage.startAssessmentButtonTooltip')"
        >
          <!-- {{ $t("mappingToolFrontpage.startAssessmentButton") }} -->
          Open Mapping tool
        </v-btn>
      </div>
  
      <!-- <MappingToolsDialog ref="openMappingDialog"></MappingToolsDialog> -->
      <MappingToolMainComponent ref="openMappingDialog" />
    </div>
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
  color: #dfc9c9;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a soft text shadow */
}
.trainingChapterDescription {
  font-family: "Lato", sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #dfc9c9;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
  text-shadow: 2px 2px 2px rgba(48, 47, 47, 0.8); /* Add a soft text shadow */
}

.with-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a soft text shadow */
}
</style>
