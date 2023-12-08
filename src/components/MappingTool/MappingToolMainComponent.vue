<template>
  <v-dialog v-model="mappingDialog" fullscreen>
    <v-card>
      <div class="container">
        <v-row class="ma-0 pa-0 pt-15">
          <v-col cols="auto"
            ><h1>{{ $t("extraKeys.assessmentTool") }}</h1></v-col
          >
          <v-spacer></v-spacer>
          <v-col cols="auto" class="mb-0 pb-0">
            <v-img
              v-if="$vuetify.breakpoint.mdAndDown"
              class="mb-5"
              src="img/digitup-logo.jpg"
              max-height="150"
              max-width="150"
              contain
            ></v-img>
            <v-img
              v-else
              class=""
              src="img/digitup-logo.jpg"
              max-height="200px"
              max-width="200px"
              contain
            ></v-img>
          </v-col>
          <v-col cols="12" class="mt-0 pt-0">
            <v-btn @click="closeDialog()" class="mb-15" color="primary">{{
              $t("extraKeys.close")
            }}</v-btn>
          </v-col>
        </v-row>

        <!-- ==== TEMPLATE 1 - Register User ==== -->
        <template v-if="mappingTemplate == 1">
          <v-row class="ma-0 pa-0">
            <v-col cols="4">
              <v-text-field
                :label="$t('extraKeys.email')"
                v-model="mappingEmail"
              ></v-text-field>
              <v-text-field
                :label="$t('extraKeys.username')"
                v-model="mappingUsername"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            :disabled="!mappingEmail || !mappingUsername"
            @click="checkIfEmailGotContent()"
            class="primary ml-3 mb-3"
            color="primary"
            >{{ $t("extraKeys.takeMappingTool") }}</v-btn
          >
        </template>

        <!-- ==== TEMPLATE 2 - The Form Itself ==== -->
        <template v-if="mappingTemplate == 2">
          <!-- IF the form got any Content and the AddedAnswers arrat are not empty -->
          <div v-if="userForm && addedAnswers.length != 0">
            <!-- Major Statement - Only show if there are NO sub_category given - Meaning NO sub categories with their own questions within the category -->
            <div
              v-if="userForm.sections.filter((i) => i.sub_category).length == 0"
            >
              <v-tabs
                v-model="formSectionTabs"
                hide-slider
                style="border-radius: 10px"
                class="mb-15"
                active-class="isActive"
              >
                <!-- By completed Value, we display the progress of each category through colours in the tabs -->
                <v-tab
                  v-for="(section, index) in userForm.sections"
                  :key="index"
                  class="tabStyling"
                  :style="{
                    background:
                      'linear-gradient(to right, #90EE91 ' +
                      calculateSectionProgress(section.id) +
                      '%, #eceff180 ' +
                      calculateSectionProgress(section.id) +
                      '%)',
                  }"
                >
                  <span v-if="calculateSectionProgress(section.id)"
                    >{{ section.name ? section.name : section.title }}
                  </span>
                  <span v-else>{{
                    section.name ? section.name : section.title
                  }}</span>
                  <!-- ({{ calculateSectionProgress(section.id) }}%) -->
                </v-tab>
                <!-- The Questions within the category -->
                <v-tab-item
                  v-for="(section, index) in userForm.sections"
                  :key="index"
                >
                  <v-row class="ma-0 pa-0">
                    <v-col
                      cols="12"
                      xl="10"
                      lg="10"
                      md="10"
                      sm="12"
                      xs="12"
                      class="ma-0 pa-0"
                    >
                      <v-container
                        v-for="(question, questionIndex) in section.questions"
                        :key="questionIndex"
                        class="fu-container-styling mt-4"
                      >
                        <v-row>
                          <v-col cols="12" class="pa-1">
                            <!-- Title of Question, and Helper Text regarding it -->
                            <p style="font-size: 16px; font-weight: bold">
                              <span>{{ question.title }}</span>
                              <v-menu offset-x>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    @click="selectedQuestionInfo = question"
                                    v-on="on"
                                    color="primary"
                                    style="transform: translateY(-3px)"
                                    text
                                    icon
                                    small
                                    class="ml-3"
                                  >
                                    <v-icon
                                      :title="
                                        $t(
                                          'extraKeys.readQuestionDescriptionAndScoreHelpText'
                                        )
                                      "
                                      size="30"
                                    >
                                      mdi-information
                                    </v-icon>
                                  </v-btn>
                                </template>
                                <v-card
                                  class="pa-3 font-weight-regular body-2 br-10"
                                  width="500px"
                                >
                                  <div v-if="selectedQuestionInfo">
                                    <p>
                                      <b>{{
                                        $t("extraKeys.questionExplanation")
                                      }}</b>
                                    </p>
                                    <p>
                                      {{ selectedQuestionInfo.description }}
                                    </p>
                                    <p>
                                      <b>{{
                                        $t("extraKeys.scoreExplanation")
                                      }}</b>
                                    </p>
                                    <ol>
                                      <li
                                        v-for="(
                                          helpText, helpTextIndex
                                        ) in JSON.parse(
                                          selectedQuestionInfo.options
                                        )"
                                        :key="helpTextIndex"
                                      >
                                        {{ helpText.label }}
                                      </li>
                                    </ol>
                                  </div>
                                </v-card>
                              </v-menu>
                              <span
                                v-if="
                                  !questionToEdit &&
                                  setQuestionAnswerVariable(question.id)
                                    .answered
                                "
                              >
                                <v-btn
                                  @click="findEditQuestionResponse(question)"
                                  color="success"
                                  style="transform: translateY(-3px)"
                                  text
                                  icon
                                  small
                                  class="ml-3"
                                >
                                  <v-icon
                                    :title="$t('extraKeys.editThisQuestion')"
                                    size="30"
                                  >
                                    mdi-pencil
                                  </v-icon>
                                </v-btn>
                              </span>
                              <span
                                v-else-if="
                                  questionToEdit &&
                                  questionToEdit.question_id == question.id
                                "
                              >
                                <v-btn
                                  @click="confirmQuestionEdit(true)"
                                  color="success"
                                  style="transform: translateY(-3px)"
                                  text
                                  icon
                                  small
                                  class="ml-3"
                                >
                                  <v-icon
                                    :title="$t('extraKeys.confirmEdit')"
                                    size="30"
                                  >
                                    mdi-check
                                  </v-icon>
                                </v-btn>
                                <v-btn
                                  @click="confirmQuestionEdit(false)"
                                  color="error"
                                  style="transform: translateY(-3px)"
                                  text
                                  icon
                                  small
                                  class="ml-3"
                                >
                                  <v-icon
                                    :title="$t('extraKeys.cancelEdit')"
                                    size="30"
                                  >
                                    mdi-close
                                  </v-icon>
                                </v-btn>
                              </span>
                            </p>

                            <!-- ==== Different Types of Questions to Display ==== -->
                            <div v-if="question.type == 'q_multiple_choice'">
                              <v-radio-group
                                v-model.lazy="
                                  setQuestionAnswerVariable(question.id).value
                                "
                              >
                                <v-radio
                                  v-for="(item, questionIndex) in JSON.parse(
                                    question.options
                                  )"
                                  :key="questionIndex"
                                  :label="item.label"
                                  :value="item.weight"
                                  :disabled="
                                    setQuestionAnswerVariable(question.id)
                                      .answered &&
                                    checkEditQuestion(question.id)
                                  "
                                ></v-radio>
                              </v-radio-group>
                            </div>

                            <!-- The Question Type: q_scale - 1-5 Questions -->
                            <div v-else-if="question.type == 'q_scale'">
                              <div
                                v-if="
                                  JSON.parse(question.options).map(
                                    (i) => i.weight
                                  ).length == 0
                                "
                              >
                                <v-radio-group
                                  :disabled="
                                    setQuestionAnswerVariable(question.id)
                                      .answered &&
                                    checkEditQuestion(question.id)
                                  "
                                  v-model.lazy="
                                    setQuestionAnswerVariable(question.id).value
                                  "
                                >
                                  <v-radio label="1" value="1"></v-radio>
                                  <v-radio label="2" value="2"></v-radio>
                                  <v-radio label="3" value="3"></v-radio>
                                  <v-radio label="4" value="4"></v-radio>
                                  <v-radio label="5" value="5"></v-radio>
                                </v-radio-group>
                              </div>
                              <div v-else>
                                <v-radio-group
                                  :disabled="
                                    setQuestionAnswerVariable(question.id)
                                      .answered &&
                                    checkEditQuestion(question.id)
                                  "
                                  v-model.lazy="
                                    setQuestionAnswerVariable(question.id).value
                                  "
                                >
                                  <v-radio label="1" value="1"></v-radio>
                                  <v-radio label="2" value="2"></v-radio>
                                  <v-radio label="3" value="3"></v-radio>
                                  <v-radio label="4" value="4"></v-radio>
                                  <v-radio label="5" value="5"></v-radio>
                                </v-radio-group>
                              </div>
                            </div>

                            <!-- The Question Type - q_checkboxes - simple checkboxes -->
                            <div v-else-if="question.type == 'q_checkboxes'">
                              <v-checkbox
                                v-for="(item, index) in JSON.parse(
                                  question.options
                                )"
                                :key="index"
                                multiple
                                :disabled="
                                  setQuestionAnswerVariable(question.id)
                                    .answered && checkEditQuestion(question.id)
                                "
                                v-model.lazy="
                                  setQuestionAnswerVariable(question.id).value
                                "
                                :label="item.label"
                                :value="index + '-' + item.weight"
                              ></v-checkbox>
                            </div>

                            <!-- The Quesiton Type - Anything else - Writable Text Field -->
                            <div v-else>
                              <v-text-field
                                :disabled="
                                  setQuestionAnswerVariable(question.id)
                                    .answered && checkEditQuestion(question.id)
                                "
                                v-model.lazy="
                                  setQuestionAnswerVariable(question.id).value
                                "
                                :label="$t('extraKeys.writeYourAnswerHere')"
                              ></v-text-field>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </div>

            <!-- Major Statement - Only show if there ARE sub_categories - Displaying them differently, containing their own questions -->
            <div v-else>
              <v-tabs
                v-model="formSectionTabs"
                hide-slider
                style="border-radius: 10px"
                active-class="isActive"
              >
                <v-tab
                  v-for="(section, index) in userForm.sections.filter(
                    (i) => !i.sub_category
                  )"
                  :key="index"
                  class="tabStyling"
                  :style="gradientStyle(section.id)"
                >
                  {{ section.name ? section.name : section.title }}
                </v-tab>
                <v-tab-item
                  v-for="(section, index) in userForm.sections.filter(
                    (i) => !i.sub_category
                  )"
                  :key="index"
                >
                  <div
                    v-if="
                      section.form_intro_page && section.form_intro_page == 1
                    "
                  >
                    <v-container
                      class="fu-container-styling mt-4"
                      v-if="section.description"
                    >
                      <p>{{ section.description }}</p>
                    </v-container>
                    <v-container
                      v-for="(question, questionIndex) in section.questions"
                      :key="questionIndex"
                      class="fu-container-styling mt-4"
                    >
                      <v-layout
                        row
                        wrap
                        v-if="
                          section.form_intro_page &&
                          section.form_intro_page == 1
                        "
                      >
                        <v-flex xs12>
                          <div v-if="question.type == 'q_front_select'">
                            <p>{{ question.title }}</p>
                            <v-select
                              :items="JSON.parse(question.options)"
                              item-text="label"
                              item-value="label"
                              :label="$t('extraKeys.selectOne')"
                              :disabled="
                                setQuestionAnswerVariable(question.id).answered
                              "
                              v-model.lazy="
                                setQuestionAnswerVariable(question.id).value
                              "
                            ></v-select>
                          </div>
                          <div v-else-if="question.type == 'q_front_checkbox'">
                            <p>{{ question.title }}</p>
                            <v-checkbox
                              v-for="(item, index) in JSON.parse(
                                question.options
                              )"
                              :key="index"
                              multiple
                              :disabled="
                                setQuestionAnswerVariable(question.id).answered
                              "
                              v-model.lazy="
                                setQuestionAnswerVariable(question.id).value
                              "
                              :label="item.label"
                              :value="item.label"
                            ></v-checkbox>
                          </div>
                          <div v-else>
                            <p>{{ question.title }}</p>
                            <v-text-field
                              :disabled="
                                setQuestionAnswerVariable(question.id).answered
                              "
                              v-model.lazy="
                                setQuestionAnswerVariable(question.id).value
                              "
                              :label="$t('extraKeys.writeYourAnswerHere')"
                            ></v-text-field>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                  <div v-else>
                    <v-layout justify-start>
                      <!-- Sub Sections in an category -->
                      <v-flex xs2>
                        <v-navigation-drawer
                          permanent
                          style="width: 100%; z-index: 0"
                        >
                          <v-list dense class="py-0">
                            <v-list-item-group
                              v-model="selectedItem"
                              color="primary"
                            >
                              <v-list-item
                                v-for="(
                                  subSection, subIndex
                                ) in userForm.sections.filter(
                                  (i) => i.sub_category == section.id
                                )"
                                :key="subIndex"
                                @click="selectedChildCategory = subSection"
                              >
                                <v-list-item-action>
                                  <v-icon
                                    :color="
                                      calculateSectionProgress(subSection.id) <
                                      1
                                        ? 'error'
                                        : calculateSectionProgress(
                                            subSection.id
                                          ) < 99
                                        ? 'yellow'
                                        : 'success'
                                    "
                                  >
                                    mdi-record
                                  </v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <p>{{ subSection.name }}</p>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-navigation-drawer>
                      </v-flex>
                      <v-flex xs12 v-if="selectedChildCategory">
                        <v-container
                          v-for="(
                            question, questionIndex
                          ) in selectedChildCategory.questions"
                          :key="questionIndex"
                          class="fu-container-styling mt-4"
                        >
                          <v-layout row wrap>
                            <v-flex xs12 class="pa-1">
                              <p style="font-size: 16px">
                                {{ question.title }}
                                <v-menu offset-x>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      @click="selectedQuestionInfo = question"
                                      v-on="on"
                                      color="primary"
                                      style="transform: translateY(-3px)"
                                      text
                                      icon
                                      small
                                      >123
                                      <v-icon
                                        :title="
                                          $t(
                                            'extraKeys.readQuestionDescriptionAndScoreHelpText'
                                          )
                                        "
                                        size="30"
                                      >
                                        mdi-information
                                      </v-icon>
                                    </v-btn>
                                  </template>
                                  <v-card
                                    class="pa-3 font-weight-regular body-2 br-10"
                                    width="500px"
                                  >
                                    <div v-if="selectedQuestionInfo">
                                      <p>
                                        <b>{{
                                          $t("extraKeys.questionExplanation")
                                        }}</b>
                                      </p>
                                      <p>
                                        {{ selectedQuestionInfo.description }}
                                      </p>
                                      <p>
                                        <b>{{
                                          $t("extraKeys.scoreExplanation")
                                        }}</b>
                                      </p>
                                      <ol>
                                        <li
                                          v-for="(
                                            helpText, helpTextIndex
                                          ) in JSON.parse(
                                            selectedQuestionInfo.options
                                          )"
                                          :key="helpTextIndex"
                                        >
                                          {{ helpText.label }}
                                        </li>
                                      </ol>
                                    </div>
                                  </v-card>
                                </v-menu>
                              </p>
                              <div v-if="question.type == 'q_scale'">
                                <div
                                  v-if="
                                    JSON.parse(question.options).map(
                                      (i) => i.weight
                                    ).length == 0
                                  "
                                >
                                  <v-radio-group
                                    :disabled="
                                      setQuestionAnswerVariable(question.id)
                                        .answered
                                    "
                                    row
                                    v-model.lazy="
                                      setQuestionAnswerVariable(question.id)
                                        .value
                                    "
                                  >
                                    <v-radio label="1" value="1"></v-radio>
                                    <v-radio label="2" value="2"></v-radio>
                                    <v-radio label="3" value="3"></v-radio>
                                    <v-radio label="4" value="4"></v-radio>
                                    <v-radio label="5" value="5"></v-radio>
                                  </v-radio-group>
                                </div>
                                <div v-else>
                                  <v-radio-group
                                    :disabled="
                                      setQuestionAnswerVariable(question.id)
                                        .answered
                                    "
                                    row
                                    v-model.lazy="
                                      setQuestionAnswerVariable(question.id)
                                        .value
                                    "
                                  >
                                    <v-radio label="1" value="1"></v-radio>
                                    <v-radio label="2" value="2"></v-radio>
                                    <v-radio label="3" value="3"></v-radio>
                                    <v-radio label="4" value="4"></v-radio>
                                    <v-radio label="5" value="5"></v-radio>
                                  </v-radio-group>
                                </div>
                              </div>
                              <div
                                v-else-if="question.type == 'q_multiple_choice'"
                              >
                                <v-radio-group
                                  :disabled="
                                    setQuestionAnswerVariable(question.id)
                                      .answered
                                  "
                                  row
                                  v-model.lazy="
                                    setQuestionAnswerVariable(question.id).value
                                  "
                                >
                                  <v-radio
                                    v-for="(item, index) in JSON.parse(
                                      question.options
                                    )"
                                    :label="item.label"
                                    :value="item.weight"
                                    :key="index"
                                  ></v-radio>
                                </v-radio-group>
                              </div>
                              <div v-else-if="question.type == 'q_checkboxes'">
                                <v-checkbox
                                  v-for="(item, index) in JSON.parse(
                                    question.options
                                  )"
                                  :key="index"
                                  multiple
                                  :disabled="
                                    setQuestionAnswerVariable(question.id)
                                      .answered
                                  "
                                  v-model.lazy="
                                    setQuestionAnswerVariable(question.id).value
                                  "
                                  :label="item.label"
                                  :value="index + '-' + item.weight"
                                ></v-checkbox>
                              </div>
                              <div v-else>
                                <v-text-field
                                  :disabled="
                                    setQuestionAnswerVariable(question.id)
                                      .answered
                                  "
                                  v-model.lazy="
                                    setQuestionAnswerVariable(question.id).value
                                  "
                                  :label="$t('extraKeys.writeYourAnswerHere')"
                                ></v-text-field>
                              </div>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-tab-item>
              </v-tabs>
            </div>

            <v-btn
              color="success"
              v-if="isFormDone"
              @click="calculateFormData1"
              >{{ $t("extraKeys.createPdfResult") }}</v-btn
            >
            <v-btn
              v-else
              color="primary"
              :disabled="!sectionDone"
              @click="sendFormResponse()"
              right
              class="mt-3 ml-3"
              >{{ formSectionTabs == 5 ? "Submit form" : "Next section" }}
            </v-btn>
            <!-- <v-btn @click="calcualtePdfScore()" class="ml-6 mt-3 success">Submit (Crucial)</v-btn> -->
            <!-- <v-btn @click="calculateFormData1()" class="ml-6 mt-3 success"
              >Submit</v-btn
            > -->
            <div class="pb-3"></div>
          </div>
        </template>
      </div>
    </v-card>

    <!-- Display progress when creating a PDF -->
    <v-dialog v-model="pdfProgressDialog" max-width="500px" persistent>
      <v-card class="text-xs-center title font-weight-light pa-5">
        <p>{{ $t("extraKeys.creatingAndDownloadingPdf") }}</p>
        <p>{{ $t("extraKeys.pleaseWait") }}</p>
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </v-dialog>

    <!-- Display the PDF results of the Mapping tool -->
    <v-dialog v-model="pdfResultDisplayDialog">
      <v-card v-if="formPdfData" class="pa-5">
        <MappingFormResults :pdfData="formPdfData" />
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import MappingToolResults from "@/components/MappingTool/MappingToolResults.vue";
import axios from "axios";
export default {
  components: {
    MappingToolResults,
  },
  data() {
    return {
      /* ==== Define the dialog States ==== */
      mappingDialog: false, // Main Mapping tool Dialog
      pdfProgressDialog: false, // Toggle the State of the PDF Progress Dialog
      pdfResultDisplayDialog: false, // Used to define the state of displaying the PDF template. - Used in the calcualtePdfScore Function

      /* ==== PDF Related Data ==== */
      formPdfData: null, // Used to store all values, to later pass into the generated pdf

      /* ==== CORE Data ==== */
      formID: 0, // The ID of the mapping tool form - Given by the parent through props
      mappingTemplate: 1, // Display the different templates of mapping tool (1 - Login || 2 - Main Form || 3 - PDF Visuals)
      todaysDate: "", // Display todays date, to be used in the database and pdf?

      /* ==== Login Data ==== */
      mappingEmail: "", // Email
      mappingUsername: "", // Username

      /* ==== Mapping form Data ==== */
      userForm: [], // The form data, which is used to display the form and store the data
      addedAnswers: [], // All answered questions of current form
      formSectionTabs: 0, // The current tab of the form
      selectedQuestionInfo: "", // Store the current question info.
      questionResponses: [], // All question_responses for the current user
      questionToEdit: null, // Saves the addedAnswers value for the current edited question

      /* ==== Take a closer look at these existing data ==== */
      selectedChildCategory: "", // Unsure, but it is in use
      selectedItem: "", // Poor naming - Select of sub section?
      accessKey: window.btoa("bac436b32a36431bb437b9509b6d3495"), // (Core) Access key, which quite frankly need to be stored and hidden within an .env file

      /* ==== Look into and Remove if not in use ==== */
      total_score: 0,
      saveTheDataToSave: [],
      radioGroup: 1,
      loadedFormData: [],
      completedValue: "",
      completedSections: [],

      // Various Text
      digitalCultureImprovementTitle: "",
      digitalCultureImprovementDescription: "",
    };
  },

  computed: {
    // To give the dialog 800 width on template 1 - for the Email
    dialogWidth() {
      return this.mappingTemplate === 1 ? 800 : null;
    },
    // Make the dialog Fullscreen on template 2 - for the form.
    isFullscreen() {
      return this.mappingTemplate !== 1;
    },

    // Checks if Mapping form are completed or Not. - If Not then one wont get to Megatrend section to send data.
    isFormDone() {
      let allQuestions = this.userForm.sections.map((i) => i.questions).flat();
      let findAllNonFrontPageQuestions = allQuestions.filter(
        (i) => i.result_category_id
      );
      let findAllAnswers = this.addedAnswers
        .filter((i) =>
          findAllNonFrontPageQuestions.map((i) => i.id).includes(i.question_id)
        )
        .filter((i) => i.answered);
      if (findAllAnswers.length == findAllNonFrontPageQuestions.length) {
        return true;
      } else {
        return false;
      }
    },
    sectionDone() {
      let getSection = this.userForm.sections[this.formSectionTabs];
      let getQuestionIds = getSection.questions.map((i) => i.id);
      let getAddedAnswers = this.addedAnswers.filter((i) =>
        getQuestionIds.includes(i.question_id)
      );
      return (
        getAddedAnswers.filter((i) => i.value).length == getQuestionIds.length
      );
    },
  },

  methods: {
    /* ==== CORE FUNCTIONS ==== */

    /* #1. Open Dialog
        Get Data from Parent,
        Get Todays Date,
        Open the Mapping tool Dialog,
        Set the mappingTemplate to 1 (Login),
      */
    openingMappingForm(mappingID) {
      this.getTodaysDate();
      this.changeTemplate(1);
      this.formID = mappingID;
      this.mappingDialog = true;
    },

    // #2. Get Todays Date
    getTodaysDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      let yyyy = today.getFullYear();
      this.todaysDate = yyyy + "-" + mm + "-" + dd;
    },

    // #3. Close Dialog
    closeDialog() {
      this.mappingDialog = false;
    },

    // #4. Change the template of the Mapping tool
    changeTemplate(templateID) {
      this.mappingTemplate = templateID;
    },

    /* ==== Pre Checks before opening the Mapping Tool - Triggered from login form - submit ==== */

    // #1. Check if the Email and Username input are filled out
    checkIfEmailGotContent() {
      if (this.mappingEmail.trim() && this.mappingUsername.trim()) {
        this.checkIfUserEntryExists();
      } else {
        console.log("Email or username field got no content");
      }
    },

    /* #2. Check with the database if user with this email, got any entries within the database toward this form.
        - Based on the result, either:
          1. User Found - Proceed to get the data from the database
          2. User Not Found - Create a new entry within the database
      */
    checkIfUserEntryExists() {
      this.$http
        .get(
          `https://app.followup.prios.no/api/form_builder/responses?mode=getresponsesbyformid&user_email=${this.mappingEmail}&form_id=${this.formID}`,
          { headers: { Tempaccess: this.accessKey } }
        )
        .then((response) => {
          if (response.data.length) {
            this.getFormData(response.data);
          } else {
            this.createNewUserEntry();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /* #3. NO User with this form found within the database. Create a new one.
        - Create a the dataset the database need to create a new user.
        - Get the data from the new entry
      */
    createNewUserEntry() {
      // Create the set of data needed to create a new key.
      let newResponse = [
        [
          this.formID,
          1,
          0,
          null,
          null,
          null,
          this.mappingEmail,
          this.todaysDate,
          this.todaysDate,
          uuidv4(),
          null,
          null,
          "mapping_form",
          this.mappingUsername,
          null,
        ],
      ];

      // Create the Tempaccess header, which is needed to create a new entry.
      let { Tempaccess } = { headers: { Tempaccess: this.accessKey } };

      // Create the new entry within the database, and get the data from the new entry.
      this.$http
        .post(
          "https://app.followup.prios.no/api/form_builder/responses",
          newResponse,
          { Tempaccess }
        )
        .then((response) => {
          this.getNewUserEntry(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // #4. Once creating a new entry of this user toward this form, get the data through his insertID
    getNewUserEntry(dbResponse) {
      this.$http
        .get(
          `https://app.followup.prios.no/api/form_builder/responses?id=${dbResponse.insertId}`,
          { headers: { Tempaccess: this.accessKey } }
        )
        .then((response) => {
          console.log("Responsen er", response.data);
          this.getFormData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /* #5. Get all the data from the DATABASE of the mapping tool form, through the user guid
        - Get the data from the database
        - Put the data into the userForm variable
        - Put the data into the loadedFormData variable
        - Get all the existing form data from the user (Answers) - through passing the response_id as parameter
      */
    getFormData(userData) {
      this.$http
        .get(
          `https://app.followup.prios.no/api/form_builder/responses?mode=getformresponseanddata&guid='${userData[0].guid}'`,
          { headers: { Tempaccess: this.accessKey } }
        )
        .then((response) => {
          this.userForm = response.data;
          this.loadedFormData = response.data;
          this.getAllExistingFormData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // #6. Get all the existing form data from the user (Answers)
    getAllExistingFormData(formData) {
      this.$http
        .get(
          `https://app.followup.prios.no/api/form_builder/question_responses?&response_id=${formData.response_id}`,
          { headers: { Tempaccess: this.accessKey } }
        )
        .then((response) => {
          this.questionResponses = response.data;
          this.adjustFormData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /* #7. Adjust the form data, based on the existing answers from the user
        - Find an populate the form, based on the user data found.
        - If answers are found, then populate the form with an object of this question, with the answer status set to TRUE.
        - If answers are NOT found, then populate the form with an object of this question, with the answer status set to FALSE.
        - Change to the form itself, and display it. (Template 2)
      */
    adjustFormData(adjustedData) {
      this.userForm.sections
        .map((i) => i.questions)
        .flat()
        .forEach((item) => {
          let findQuestionResponse = adjustedData.find(
            (i) => i.question_id == item.id
          );
          if (findQuestionResponse) {
            let itemValue = findQuestionResponse.answer;
            if (
              item.type == "q_checkboxes" ||
              item.type == "q_front_checkbox"
            ) {
              itemValue = findQuestionResponse.answer.split(",");
            }
            this.addedAnswers.push({
              question_id: item.id,
              value: itemValue,
              answered: true,
            });
          } else {
            this.addedAnswers.push({
              question_id: item.id,
              value: null,
              answered: false,
            });
          }
        });
      this.changeTemplate(2);
    },

    /* ==== Functions when saving the answers ==== */

    /* #1. Filter through through the questions, and those who have been answered, and push them to the database
        - Triggered from the save answer button.
      */
    sendFormResponse() {
      let newCreateArr = [];
      this.addedAnswers
        .filter((i) => i.value && !i.answered)
        .forEach((item) => {
          item.answered = true;
          let findQuestionType = this.userForm.sections
            .map((i) => i.questions)
            .flat()
            .find((i) => i.id == item.question_id).type;
          let itemValue = item.value;
          if (
            findQuestionType == "q_checkboxes" ||
            findQuestionType == "q_front_checkbox"
          ) {
            itemValue = item.value.join(",");
          }
          let newCreateObj = [
            this.userForm.response_id,
            item.question_id,
            itemValue,
          ];
          newCreateArr.push(newCreateObj);
        });
      if (newCreateArr.length != 0) {
        this.$http
          .post(
            "https://app.followup.prios.no/api/form_builder/question_responses",
            newCreateArr,
            { headers: { Tempaccess: this.accessKey } }
          )
          .then(() => {
            if (this.formSectionTabs != 5) {
              this.formSectionTabs++;
            }
          });
      } else if (this.formSectionTabs != 5) {
        this.formSectionTabs++;
      }
    },

    /* ==== Functions when Submitting the answers ==== */

    // Get the question ID and the value of the question and push it to the array
    /*
        - By ID from the question
      */
    setQuestionAnswerVariable(questionId) {
      return this.addedAnswers.find((i) => i.question_id == questionId);
    },

    checkIfSectionHasProgress(sectionId) {
      let getQuestionIdList = this.userForm.sections
        .find((i) => i.id == sectionId)
        .questions.map((i) => i.id);
      return this.addedAnswers.filter(
        (i) =>
          getQuestionIdList.includes(i.question_id) && i.value && !i.answered
      ).length;
    },

    checkIfParentSectionHasProgress(sectionId) {
      let getQuestionIdList = this.userForm.sections
        .filter((i) => i.sub_category == sectionId)
        .map((i) => i.questions)
        .flat()
        .map((i) => i.id);
      return this.addedAnswers.filter(
        (i) =>
          getQuestionIdList.includes(i.question_id) && i.value && !i.answered
      ).length;
    },

    /* Get Value of category, to display the progress of the category in colours
        - Gets the category aka section ID as a parameter
        - getQuestionIdList: Get all questions, matching iterated category id, and put the id of these into the array
        - answeredQuestions: Get all the answered questions, of said iteration, and put them into the array as objects.
        - calculateCategoryProgress: get the length of answeredQuestions and divide it by the length of getQuestionIdList, and multiply it by 100. Then round it to the nearest integer.
      */
    calculateSectionProgress(sectionId) {
      let getQuestionIdList = this.userForm.sections
        .find((i) => i.id == sectionId)
        .questions.map((i) => i.id);
      let answeredQuestions = this.addedAnswers.filter(
        (i) => getQuestionIdList.includes(i.question_id) && i.answered
      );
      let calculateCategoryProgress = (
        (answeredQuestions.length / getQuestionIdList.length) *
        100
      ).toFixed(0);
      return calculateCategoryProgress;
    },

    // Calculate the progress of the parent section based on the progress of the child sections (if any)
    gradientStyle(sectionId) {
      let completedValue = this.calculateParentSectionProgress(sectionId);
      return `background: linear-gradient(to right, rgba(147, 250, 165) ${completedValue}%, rgba(236, 239, 241, 50) ${completedValue}%)`;
    },

    calculateParentSectionProgress(sectionId) {
      // Find all child sections of the current section
      let getChildSections = this.userForm.sections.filter(
        (i) => i.sub_category == sectionId
      );

      // Get a list of all question IDs in the child sections
      let getQuestionIdList = getChildSections
        .map((i) => i.questions)
        .flat()
        .map((i) => i.id);

      // Find all answered questions in the child sections
      let answeredQuestions = this.addedAnswers.filter(
        (i) => getQuestionIdList.includes(i.question_id) && i.answered
      );

      // Calculate the progress of the current section
      let progress = (
        (answeredQuestions.length / getQuestionIdList.length) *
        100
      ).toFixed(0);

      // Push the section ID to the array if the progress is 100
      // if (progress == 100) {
      //   this.completedSections.push(sectionId);
      // }

      return progress;
    },

    setCategoryColor(scoreValue) {
      if (scoreValue > 66) {
        return "#81C784";
      } else if (scoreValue < 66 && scoreValue > 33) {
        return "#FFF176";
      } else {
        return "#E57373";
      }
    },

    // NEW SHOULD BE WORKING FUNCTIONS START

    calculateFormData1() {
      let tempArr = [];
      this.userForm.sections.forEach((category) => {
        let newCategory = {
          name: category.name,
          id: category.id,
          total_score: 0,
          user_score: 0,
          question_id_list: [],
          text_questions: [],
          show_text_questions: false,
        };
        if (!category.form_intro_page) {
          tempArr.push(newCategory);
        }
      });
      this.userForm.sections
        .map((i) => i.questions)
        .flat()
        .forEach((question) => {
          let findCategory = tempArr.find(
            (i) => i.id == question.result_category_id
          );
          let findQuestionResponse = this.addedAnswers.find(
            (i) => i.question_id == question.id
          );
          let findHighestQuestionValue = null;
          if (findCategory) {
            if (question.type == "q_text") {
              findCategory.text_questions.push({
                question: question.title,
                answer: findQuestionResponse.value
                  ? findQuestionResponse.value
                  : "No answer given",
              });
              findCategory.show_text_questions = true;
            } else if (question.type == "q_multiple_choice") {
              findHighestQuestionValue = JSON.parse(question.options).map(
                (i) => i.weight
              );
              findCategory.total_score =
                findCategory.total_score +
                Math.max(...findHighestQuestionValue);
              if (findQuestionResponse && findQuestionResponse.answered) {
                findCategory.user_score =
                  findCategory.user_score + Number(findQuestionResponse.value);
              }
            }
            findCategory.question_id_list
              ? findCategory.question_id_list.push(question.id)
              : (findCategory.question_id_list = [question.id]);
          }
        });

      console.log("temp Array", tempArr);
      this.generatePdf1(tempArr);
    },
    checkEditQuestion(questionId) {
      if (
        this.questionToEdit &&
        this.questionToEdit.question_id == questionId
      ) {
        return false;
      } else {
        return true;
      }
    },
    findEditQuestionResponse(question) {
      let findQuestionResponse = this.questionResponses.find(
        (i) => i.question_id == question.id
      );
      if (!findQuestionResponse) {
        this.$http
          .get(
            `https://app.followup.prios.no/api/form_builder/question_responses?&response_id=${this.userForm.response_id}`,
            { headers: { Tempaccess: this.accessKey } }
          )
          .then((response) => {
            this.questionResponses = response.data;
            findQuestionResponse = this.questionResponses.find(
              (i) => i.question_id == question.id
            );
          });
      }
      this.questionToEdit = this.addedAnswers.find(
        (i) => i.question_id == question.id
      );
    },
    confirmQuestionEdit(update) {
      if (update) {
        let findQuestionResponseId = this.questionResponses.find(
          (i) => i.question_id == this.questionToEdit.question_id
        ).id;
        this.$http
          .post(
            `https://app.followup.prios.no/api/form_builder/question_responses`,
            {
              id: findQuestionResponseId,
              answer: this.questionToEdit.value,
            }
          )
          .then(() => {
            this.questionToEdit = null;
          });
      } else {
        this.questionToEdit = null;
      }
    },

    generatePdf1(tempArr) {
      console.log("Temp Array areee", tempArr);
      // this.pdfProgressDialog = true;
      this.formPdfData = {
        categories: [],
        graph_data: [],
        userName: this.mappingUsername,
        userEmail: this.mappingEmail,
        categoriesAll: [],
        digitalCultureTitle: this.digitalCultureImprovementTitle,
        digitalCultureDescription: this.digitalCultureImprovementDescription,
      };

      /* 
        1. Loop through all the Categories.
        2. Get category name, and calculate the score.
        3. Based on the score, give text.
        4. Push this into categoriesAll as an Object.
          - name
          - score
          - description text

        # Note: This is very tailored to this example Demo
      
      */

      for (let index = 0; index < tempArr.length; index++) {
        let idOfCategory = tempArr[index].id;
        let nameOfCategory = tempArr[index].name;
        let scoreOfCategory = Math.round(
          (tempArr[index].user_score / tempArr[index].total_score) * 100
        );
        let scoreTitle = "";
        let scoreDescription = "";

        console.log("Hallooooooo!!!!");

        // Digital Culture - 570
        if (idOfCategory == 604) {
          if (scoreOfCategory <= 32) {
            scoreTitle = this.$t("pdfScoreText.digitalCultureTitleLow");
            scoreDescription = this.$t(
              "pdfScoreText.digitalCultureDescriptionLow"
            );

            // this.digitalCultureImprovementTitle = scoreTitle;
            // this.digitalCultureImprovementDescription = scoreDescription;
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            // console.log("Medium Score - Digital Culture");
            console.log("Triggered 2");
            scoreTitle = this.$t("pdfScoreText.digitalCultureTitleMedium");
            scoreDescription = this.$t(
              "pdfScoreText.digitalCultureDescriptionMedium"
            );
            // this.digitalCultureImprovementTitle = scoreTitle;
            // this.digitalCultureImprovementDescription = scoreDescription;
          } else if (scoreOfCategory >= 67) {
            console.log("Triggered 3");
            // console.log("High Score - Digital Culture");
            scoreTitle = this.$t("pdfScoreText.digitalCultureTitleHigh");
            scoreDescription = this.$t(
              "pdfScoreText.digitalCultureDescriptionHigh"
            );
            // this.digitalCultureImprovementTitle = scoreTitle;
            // this.digitalCultureImprovementDescription = scoreDescription;
          }
        }

        // Training and Development - 571
        if (idOfCategory == 605) {
          if (scoreOfCategory <= 32) {
            scoreTitle = this.$t("pdfScoreText.trainingAndDevelopmentTitleLow");
            scoreDescription = this.$t(
              "pdfScoreText.trainingAndDevelopmentDescriptionLow"
            );
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            scoreTitle = this.$t(
              "pdfScoreText.trainingAndDevelopmentTitleMedium"
            );
            scoreDescription = this.$t(
              "pdfScoreText.trainingAndDevelopmentDescriptionMedium"
            );
          } else if (scoreOfCategory >= 67) {
            scoreTitle = this.$t(
              "pdfScoreText.trainingAndDevelopmentTitleHigh"
            );
            scoreDescription = this.$t(
              "pdfScoreText.trainingAndDevelopmentDescriptionHigh"
            );
          }
        }

        // Investment in Digital Transformation - 572
        if (idOfCategory == 606) {
          if (scoreOfCategory <= 32) {
            scoreTitle = this.$t(
              "pdfScoreText.investmentInDigitalTransformationTitleLow"
            );
            scoreDescription = this.$t(
              "pdfScoreText.investmentInDigitalTransformationDescriptionLow"
            );
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            scoreTitle = this.$t(
              "pdfScoreText.investmentInDigitalTransformationTitleMedium"
            );
            scoreDescription = this.$t(
              "pdfScoreText.investmentInDigitalTransformationDescriptionMedium"
            );
          } else if (scoreOfCategory >= 67) {
            scoreTitle = this.$t(
              "pdfScoreText.investmentInDigitalTransformationTitleHigh"
            );
            scoreDescription = this.$t(
              "pdfScoreText.investmentInDigitalTransformationDescriptionHigh"
            );
          }
        }

        // Challenges and Risks - 573
        if (idOfCategory == 607) {
          if (scoreOfCategory <= 32) {
            scoreTitle = this.$t("pdfScoreText.challengesAndRisksTitleLow");
            scoreDescription = this.$t(
              "pdfScoreText.challengesAndRisksDescriptionLow"
            );
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            scoreTitle = this.$t("pdfScoreText.challengesAndRisksTitleMedium");
            scoreDescription = this.$t(
              "pdfScoreText.challengesAndRisksDescriptionMedium"
            );
          } else if (scoreOfCategory >= 67) {
            scoreTitle = this.$t("pdfScoreText.challengesAndRisksTitleHigh");
            scoreDescription = this.$t(
              "pdfScoreText.challengesAndRisksDescriptionHigh"
            );
          }
        }

        // Cybersecurity - 574
        if (idOfCategory == 608) {
          if (scoreOfCategory <= 32) {
            scoreTitle = this.$t("pdfScoreText.cyberSecurityTitleLow");
            scoreDescription = this.$t(
              "pdfScoreText.cyberSecurityDescriptionLow"
            );
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            console.log("Medium Score - Cybersecurity");
            scoreTitle = this.$t("pdfScoreText.cyberSecurityTitleMedium");
            scoreDescription = this.$t(
              "pdfScoreText.cyberSecurityDescriptionMedium"
            );
          } else if (scoreOfCategory >= 67) {
            console.log("High Score - Cybersecurity");
            scoreTitle = this.$t("pdfScoreText.cyberSecurityTitleHigh");
            scoreDescription = this.$t(
              "pdfScoreText.cyberSecurityDescriptionHigh"
            );
          }
        }

        // Future Plans - 575
        if (idOfCategory == 609) {
          if (scoreOfCategory <= 32) {
            console.log("Low Score - Future Plans");
            scoreTitle = this.$t("pdfScoreText.futurePlansTitleLow");
            scoreDescription = this.$t(
              "pdfScoreText.futurePlansDescriptionLow"
            );
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            console.log("Medium Score - Future Plans");
            scoreTitle = this.$t("pdfScoreText.futurePlansTitleMedium");
            scoreDescription = this.$t(
              "pdfScoreText.futurePlansDescriptionMedium"
            );
          } else if (scoreOfCategory >= 67) {
            console.log("High Score - Future Plans");
            scoreTitle = this.$t("pdfScoreText.futurePlansTitleHigh");
            scoreDescription = this.$t(
              "pdfScoreText.futurePlansDescriptionHigh"
            );
          }
        }

        let categoryResults = {
          name: nameOfCategory,
          id: idOfCategory,
          score: scoreOfCategory,
          scoreTitle: scoreTitle,
          scoreDescription: scoreDescription,
        };

        console.log("What do i get!!!", categoryResults);

        // Push categoryResult into categoriesAll
        if (tempArr[index].id !== 575) {
          this.formPdfData.categoriesAll.push(categoryResults);
        }
      }

      // Set categories
      tempArr.forEach((category) => {
        console.log("User Score", category.user_score);
        console.log("Total Score", category.total_score);
        this.formPdfData.categories.push({
          name: category.name,
          score: Math.round((category.user_score / category.total_score) * 100),
          color: this.setCategoryColor(
            Math.round((category.user_score / category.total_score) * 100)
          ),
          show_text_questions: category.show_text_questions,
          text_questions: category.text_questions,
          // color: 'hotpink',
          // sub_categories: category.child_categories.map(i => {return{
          //   name:i.name,
          //   score:Math.round((i.user_score / i.total_score) * 100),
          //   color:this.setCategoryColor(Math.round((i.user_score / i.total_score) * 100)),
          // }})
        });
      });
      // Set graph/chart data
      this.formPdfData.graph_data = this.formPdfData.categories.map((i) => {
        return {
          x: i.name,
          value: i.score,
          fill: "#4DB6AC",
          stroke: "lightgrey",
        };
      });
      console.log("COLOOOOR", this.formPdfData);

      this.createPdf();
    },
    // NEW SHOULD BE WORKING FUNCTIONS END

    // Rename if working to the function below
    calculateFormData() {
      let tempArr = [];

      // We get all categories, and its questions
      console.log("this.userForm.sections", this.userForm.sections);

      this.userForm.sections.forEach((category) => {
        let newStrengtWeakness = {
          name: category.name,
          id: category.id,
          total_score: 0,
          user_score: 0,
          question_id_list: [],
        };
        if (!category.form_intro_page) {
          tempArr.push(newStrengtWeakness);
        }
      });

      this.userForm.sections
        .map((i) => i.questions)
        .flat()
        .forEach((question) => {
          let findCategory = tempArr.find(
            (i) => i.id == question.result_category_id
          );
          let findQuestionResponse = this.addedAnswers.find(
            (i) => i.question_id == question.id
          );
          let findHighestQuestionValue = null;
          if (findCategory) {
            console.log("CHECK THIS OUT!!!", findCategory);
            if (question.type != "q_text") {
              if (
                JSON.parse(question.options).filter((i) => i.weight).length != 0
              ) {
                findHighestQuestionValue = JSON.parse(question.options).map(
                  (i) => i.weight
                );
                findCategory.total_score =
                  findCategory.total_score +
                  Math.max(...findHighestQuestionValue);
              } else if (question.type == "q_scale") {
                findCategory.total_score = findCategory.total_score + 5;
              }
              if (findQuestionResponse && findQuestionResponse.answered) {
                console.log(
                  "findCategory.user_score",
                  findCategory.user_score.split
                );
                // console.log("Number(findQuestionResponse.value)", Number(findQuestionResponse.value));

                let numberScore = findQuestionResponse.value.split("-")[0];
                // console.log("Number Score", numberScore)

                // findCategory.user_score = findCategory.user_score + Number(findQuestionResponse.value);
                findCategory.user_score = numberScore;
              }
            }

            findCategory.question_id_list
              ? findCategory.question_id_list.push(question.id)
              : (findCategory.question_id_list = [question.id]);
          }
        });

      console.log("temp Array", tempArr);
      this.generatePdf(tempArr);
    },

    generatePdf(tempArr) {
      console.log("Temp Array areee", tempArr);
      // this.pdfProgressDialog = true;
      this.formPdfData = {
        categories: [],
        graph_data: [],
        userName: this.mappingUsername,
        userEmail: this.mappingEmail,
      };
      // Set categories
      tempArr.forEach((category) => {
        console.log("User Score", category.user_score);
        console.log("Total Score", category.total_score);
        this.formPdfData.categories.push({
          name: category.name,
          score: Math.round((category.user_score / category.total_score) * 100),
          color: this.setCategoryColor(
            Math.round((category.user_score / category.total_score) * 100)
          ),
          // color: 'hotpink',
          // sub_categories: category.child_categories.map(i => {return{
          //   name:i.name,
          //   score:Math.round((i.user_score / i.total_score) * 100),
          //   color:this.setCategoryColor(Math.round((i.user_score / i.total_score) * 100)),
          // }})
        });
      });
      // Set graph/chart data
      this.formPdfData.graph_data = this.formPdfData.categories.map((i) => {
        return {
          x: i.name,
          value: i.score,
          fill: "#4DB6AC",
          stroke: "lightgrey",
        };
      });
      console.log("COLOOOOR", this.formPdfData);

      // this.createPdf();
    },

    createPdf() {
      let dateToday = new Date().toISOString().substr(0, 10);
      let pdfName = `Digitup Demo -  Mapping form - ${this.mappingUsername} - ${dateToday}`;
      let pdfNamePrompt = prompt("Change the name of your PDF?", pdfName);
      if (pdfNamePrompt) {
        pdfName = pdfNamePrompt;
      }
      if (pdfNamePrompt !== null) {
        this.pdfProgressDialog = true;
        pdfName = pdfName + ".pdf";
        this.$http
          .get("/resetProjectPdfTemplate.html")
          .then((getHtmlTemplate) => {
            let pdfData = {
              html: getHtmlTemplate.data,
              data: this.formPdfData,
              pdf_format: "a4",
            };
            console.log("this data are: ", pdfData.data);
            //ONLY PDF
            this.$http({
              url: "https://pdfservice.prios.no/api/pdf_service",
              method: "post",
              responseType: "blob",
              data: pdfData,
            }).then((response) => {
              this.pdfProgressDialog = false;
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", pdfName);
              link.setAttribute("target", "_blank");
              link.click();
            });
          });
      }
    },

    sendEmail() {
      // let mailData = {
      //   to: req.mail_data.to,
      //   from:req.mail_data.from,
      //   subject: req.mail_data.subject,
      //   html: req.mail_data.html,
      //   text: req.mail_data.text,
      //   attachments:null
      // };
      let mailData = {
        to: "bjorn@priossoftware.no",
        from: "bob@gmail.coms",
        subject: "Mapping Tool",
        // html: req.mail_data.html,
        // text: req.mail_data.text,
        attachments: null,
      };
      // if(req.attatchment_data && req.attatchment_data.type == "pdf"){
      PdfGenerator.generatePdf(req.attatchment_data)
        .then((getPdfBuffer) => {
          if (getPdfBuffer) {
            mailData.attachments = [
              {
                filename: req.attatchment_data.filename,
                content: getPdfBuffer,
              },
            ];
          }
          let email = new Email(mailData);
          email.sendmail().then(() => {
            resolve("Email sent");
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
      // }
    },

    // Calculate the PDF values, from the form data
    calcualtePdfScore() {
      // Create an object that will store the data for the PDF
      let createObj = {
        front_page: {},
        categories: [],
      };

      /** Initializes an array that will store subcategories @type {Array} */
      let subCategories = [];

      // Loops through an array of sections and separates them into subcategories or front page elements
      this.userForm.sections.forEach((category) => {
        console.log("UserForm", category);

        let newCategoryObj = {
          id: category.id,
          name: "",
        };
        if (category.name) {
          newCategoryObj.name = category.name;
          newCategoryObj.sub_categories = [];
          createObj.categories.push(newCategoryObj);
        } else {
          newCategoryObj.name = category.title;
          newCategoryObj.description = category.description;
          newCategoryObj.questions = [];
          createObj.front_page = newCategoryObj;
        }
      });

      /** Flattens an array of questions and stores it in a variable - @type {Array} */
      let allQuestionsArray = this.userForm.sections
        .map((i) => i.questions)
        .flat();

      // Loops through an array of answers and assigns scores to the various categories
      this.addedAnswers.forEach((questionAnswer) => {
        let findQuestion = allQuestionsArray.find(
          (i) => i.id == questionAnswer.question_id
        );

        if (findQuestion.result_category_id) {
          let findCategory = subCategories.find(
            (i) => i.id == findQuestion.result_category_id
          );

          console.log("What value do i get!??", subCategories);
          let findHighestQuestionValue = null;
          if (findQuestion.type == "q_checkboxes") {
            findHighestQuestionValue = JSON.parse(findQuestion.options)
              .map((i) => i.weight)
              .reduce((a, b) => Number(a) + Number(b), 0);

            findCategory.total_score =
              findCategory.total_score + findHighestQuestionValue;

            let findCheckBoxScoreValue = questionAnswer.value
              .map((el) => el.substring(el.indexOf("-") + 1, el.length))
              .reduce((a, b) => Number(a) + Number(b), 0);
            findCategory.user_score =
              findCategory.user_score + findCheckBoxScoreValue;
          } else if (findQuestion.type != "q_text") {
            console.log("Am i triggered?");
            if (
              JSON.parse(findQuestion.options).filter((i) => i.weight).length !=
              0
            ) {
              findHighestQuestionValue = JSON.parse(findQuestion.options).map(
                (i) => i.weight
              );

              console.log("Number One!", findCategory);
              console.log("Number Two!", findQuestion);
              console.log("Number Three!", findHighestQuestionValue);

              findCategory.total_score =
                findCategory.total_score +
                Math.max(...findHighestQuestionValue);
            } else if (findQuestion.type == "q_scale") {
              findCategory.total_score = findCategory.total_score + 5;
            }
            findCategory.user_score =
              findCategory.user_score + Number(questionAnswer.value);
          }
        }

        // IF FRONT PAGE QUESTIONS
        else if (findQuestion.section_id) {
          console.log("Am i triggered 2?");
          if (
            findQuestion.type == "q_front_select" ||
            findQuestion.type == "q_front_text"
          ) {
            createObj.front_page.questions.push({
              title: findQuestion.title,
              answer: questionAnswer.value,
              checkbox: false,
            });
          } else if (findQuestion.type == "q_front_checkbox") {
            console.log(questionAnswer);
            let newQuestionAnswers = [];
            JSON.parse(findQuestion.options).forEach((item) => {
              if (questionAnswer.value.includes(item.label)) {
                newQuestionAnswers.push(item);
              }
            });
            createObj.front_page.questions.push({
              title: findQuestion.title,
              answer: newQuestionAnswers,
              checkbox: true,
            });
          }
        }
      });

      // Loops through an array of categories and calculates the total score for each category
      createObj.categories
        .filter((i) => !i.questions)
        .forEach((category) => {
          /** Filters subcategories by parent category and stores the result in a variable - @type {Array} */
          let findSubCategories = subCategories.filter(
            (i) => i.parent_category == category.id
          );

          /** Calculates the total score for the category by summing the total scores of the subcategories - @type {Number} */
          let totalCategoryScore = findSubCategories
            .map((i) => i.total_score)
            .reduce((a, b) => Number(a) + Number(b), 0);

          /** Calculates the total user score for the category by summing the user scores of the subcategories - @type {Number} */
          let totalCategoryUserScore = findSubCategories
            .map((i) => i.user_score)
            .reduce((a, b) => Number(a) + Number(b), 0);

          /** Calculates the score percentage for the category - @type {Number} */
          let calculatedScore = Math.round(
            (totalCategoryUserScore / totalCategoryScore) * 100
          );

          /** Sets the color of the category based on the score percentage - @type {String} */
          category.color = this.setCategoryColor(calculatedScore);

          /** Sets the score percentage for the category - @type {String} */
          category.score = calculatedScore + "%";

          // Cleans the subcategory array by removing unnecessary properties and adding the score percentage and color
          let cleanedSubCategoryArray = findSubCategories.map((i) => {
            return {
              name: i.name,
              score: Math.round((i.user_score / i.total_score) * 100) + "%",
              color: this.setCategoryColor(
                Math.round((i.user_score / i.total_score) * 100)
              ),
            };
          });

          // Assigns the cleaned subcategory array to the category
          category.sub_categories = cleanedSubCategoryArray;
        });

      this.formPdfData = createObj;
      this.pdfResultDisplayDialog = true;

      console.log(createObj);

      this.$http.get("resetProjectPdfTemplate.html").then((getHtmlTemplate) => {
        let pdfData = {
          html: getHtmlTemplate.data,
          data: this.formPdfData,
        };
        this.$http({
          url: "https://pdfservice.prios.no/api/pdf_service",
          method: "post",
          responseType: "blob",
          data: pdfData,
        }).then((response) => {
          this.pdfProgressDialog = false;
          let pdfName = "resetResultsPDF.pdf";
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", pdfName);
          link.setAttribute("target", "_blank");
          link.click();
        });
      });
    },
  },

  watch: {
    // Watches for changes in the selected category and resets the selected question info and selected child category
    formSectionTabs() {
      this.selectedQuestionInfo = null;
      this.selectedChildCategory = null;
    },
  },
};
</script>

<style scoped>
.tabStyling {
  color: #1a7c92;
  border-radius: 5px;
  border: 1px solid #1a7c92;
  margin-right: 4px;
}

.v-tabs >>> .v-tabs__bar {
  background-color: #eceff1;
}

.v-tabs >>> .v-tabs__item:not(.v-tabs__item--active) {
  opacity: 1;
  border: 1px solid transparent;
  color: #1a7c92;
  border-radius: 5px;
  text-transform: none;
}

.v-tabs >>> .v-tabs__item:not(.v-tabs__item--active):hover {
  border: 1px solid #1a7c92;
}

.v-tabs >>> .v-tabs__item--active {
  opacity: 1;
  border: 1px solid #1a7c92;
  color: #1a7c92;
  border-radius: 5px;
  text-transform: none;
}

.isActive {
  color: #2a4b7f !important;
  font-weight: bold;
  background-color: orange !important;
}

.hotpink {
  background: rgb(148, 128, 138);
}

input[type="radio"] {
  width: 15px;
  height: 15px;
}
</style>
