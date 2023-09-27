<template>
  <div class="">
    <v-row>
      <!-- Simulated navbar -->
      <v-col cols="12" class="navbarStyling"> 
        <v-img
          v-if="$vuetify.breakpoint.mdAndDown"
          class="mb-5 ml-15"
          src="img/digitup-logo.jpg"
          max-height="150px"
          max-width="100px"
          contain
        ></v-img>
        <v-img
          v-else
          class="ml-15"
          src="img/digitup-logo.jpg"
          max-height="auto"
          max-width="100px"
          contain
        ></v-img>
      </v-col>
      <!-- Content -->
      <v-col cols="12" class="containeraaaa">

        <div class="homePageWidth pb-15 ">
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
      </v-col>
    </v-row>
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

.navbarStyling {
  height: 7.5em !important;
  width: 90vw !important;
  margin: auto auto !important;
  background-color: #ffffff !important;
  border-bottom: 5px solid #2a4b7f !important;
}
.trainingChapterTitle {
  font-family: "Barlow", sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #fafafa; /* Adjust text color as needed */
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.trainingChapterDescription {
  font-family: "Lato", sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #fafafa; /* Adjust text color as needed */
  text-align: left;
  text-shadow: 4px 2px 4px rgb(0, 0, 0);
}

.containeraaaa {
  background-image: url('/img/background.jpg');
  background-size: cover;
  padding-bottom: 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  height: auto;
}
</style>
