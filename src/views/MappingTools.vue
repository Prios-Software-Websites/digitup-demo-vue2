<template>
  <div class="">
    <v-row>
      <!-- Simulated navbar -->
      <v-col cols="12" class="navbarStyling" style="display: flex">
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
        <v-spacer></v-spacer>
        <div class="mt-10 mr-10">
          <LanguageSelection></LanguageSelection>
        </div>
      </v-col>
      <!-- Content -->
      <v-col cols="12" class="containeraaaa">
        <div class="homePageWidth pb-15">
          <p class="mt-15 pt-10"></p>
          <div>
            <p class="trainingChapterTitle">
              {{ $t("extraKeys.homeTitle") }}
            </p>
            <p class="trainingChapterDescription">
              {{ $t("extraKeys.homeDescriptionOne") }}<br />
              {{ $t("extraKeys.homeDescriptionTwo") }}<br />
              {{ $t("extraKeys.homeDescriptionThree") }}
            </p>
            <!-- Based on language selected, the parameter will change!! -->
            <v-btn
              @click="openMappingFormWithLanguageId"
              large
              color="primary"
              class="mt-15"
              :title="
                this.$t('mappingToolFrontpage.startAssessmentButtonTooltip')
              "
            >
              {{ $t("extraKeys.goToMappingToolButton") }}
            </v-btn>
          </div>

          <MappingToolMainComponent ref="openMappingDialog" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MappingToolsDialog from "@/components/MappingToolv2/MappingToolsDialog.vue";
import MappingToolMainComponent from "@/components/MappingTool/MappingToolMainComponent.vue";
import LanguageSelection from "@/components/TestAndDevelopment/SelectLocale.vue";
export default {
  components: {
    MappingToolsDialog,
    MappingToolMainComponent,
    LanguageSelection,
  },
  data() {
    return {
      // Assessment tools from DB based on IDs
      assessmentTools: {
        en: 229,
        bg: 262,
        cz: 263,
        es: 261,
        nb: 260,
        it: 259,
        el: 258,
      },
    };
  },
  methods: {
    openMappingFormWithLanguageId() {
      // Retrieve the language key from localStorage
      const languageKey = localStorage.getItem("language") || "en";
      // Get the language ID based on the language key
      const languageId = this.assessmentTools[languageKey];
      // Call the openMappingForm method with the language ID
      this.$refs.openMappingDialog.openingMappingForm(languageId);
    },
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
  background-image: url("/img/background.jpg");
  background-size: cover;
  padding-bottom: 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  height: auto;
}
</style>
