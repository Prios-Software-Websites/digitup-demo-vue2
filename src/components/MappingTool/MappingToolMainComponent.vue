<template>
  <v-dialog v-model="mappingDialog" fullscreen>
    <v-card>
      <div class="container">
        <v-row class="ma-0 pa-0 pt-15">
          <v-col cols="auto"><h1>Assessment Tool</h1></v-col>
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

            <v-btn @click="closeDialog()" class="mb-15" color="primary">Close</v-btn>
          </v-col>
        </v-row>
        
        
        

        <!-- ==== TEMPLATE 1 - Register User ==== -->
        <template v-if="mappingTemplate == 1">
          <v-row class="ma-0 pa-0">
            <v-col cols="4">
              <v-text-field label="email" v-model="mappingEmail"></v-text-field>
              <v-text-field
                label="username"
                v-model="mappingUsername"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            :disabled="!mappingEmail || !mappingUsername"
            @click="checkIfEmailGotContent()"
            class="primary ml-3 mb-3"
            color="primary"
            >Take Mapping Tools</v-btn
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
                                      title="Read question description and score help text"
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
                                    <p><b>Question description:</b></p>
                                    <p>
                                      {{ selectedQuestionInfo.description }}
                                    </p>
                                    <p><b>Score explanation:</b></p>
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
                                      .answered
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
                                      .answered
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
                                      .answered
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
                                    .answered
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
                                    .answered
                                "
                                v-model.lazy="
                                  setQuestionAnswerVariable(question.id).value
                                "
                                label="Write your answer here"
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
                              label="Select one"
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
                              label="Write your answer here"
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
                                        title="Read question description and score help text"
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
                                      <p><b>Question description:</b></p>
                                      <p>
                                        {{ selectedQuestionInfo.description }}
                                      </p>
                                      <p><b>Score explanation:</b></p>
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
                                  label="Write your answer here"
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
              color="primary"
              :disabled="
                !addedAnswers.filter((i) => i.value && i.answered == false)
                  .length != 0
              "
              @click="sendFormResponse()"
              right
              class="mt-3 ml-3"
              >Save Answers</v-btn
            >
            <!-- <v-btn @click="calcualtePdfScore()" class="ml-6 mt-3 success">Submit (Crucial)</v-btn> -->
            <v-btn @click="calculateFormData1()" class="ml-6 mt-3 success"
              >Submit</v-btn
            >
            <div class="pb-3"></div>
          </div>
        </template>
      </div>
    </v-card>

    <!-- Display progress when creating a PDF -->
    <v-dialog v-model="pdfProgressDialog" max-width="500px" persistent>
      <v-card class="text-xs-center title font-weight-light pa-5">
        <p>Creating and downloading pdf.</p>
        <p>Please wait</p>
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
      this.$http
        .post(
          "https://app.followup.prios.no/api/form_builder/question_responses",
          newCreateArr,
          { headers: { Tempaccess: this.accessKey } }
        )
        .then(() => {});
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

        console.log("Hallooooooo!!!!")

        // Digital Culture - 570
        if (idOfCategory == 604) {
          if (scoreOfCategory <= 32) {
            console.log("Triggered 1")
            // console.log("Low Score - Digital Culture");
            scoreTitle =
              "Digital novice indicates that theres a significant gap in embracing and integrating digital technologies and practices within your work environment.";
            scoreDescription =
              "Begin with a foundational training to the concept of digital culture, its importance and the benefits it can bring to an organization. Enroll training sessions to familiarize employees with essential digital tools relevant to their roles. Orgamoze seminars where teams can brainstorm and share digital innovation ideas. This can help in fostering a culture where digital innovation is encouraged and appreciated.";
            // this.digitalCultureImprovementTitle = scoreTitle;
            // this.digitalCultureImprovementDescription = scoreDescription;
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            // console.log("Medium Score - Digital Culture");
            console.log("Triggered 2")
            scoreTitle =
              "It indicates that your organization has made strides in establishing a digital culture, there is still room for improvement";
            scoreDescription =
              "Dive deeper into the nuances of digital culture, exploring how it can be further ingrained into the organizations ethos. Offer advanced training sessions on digital tools, ensuring that employees are not just familiar with them, but can leverage them to their full potential. Organize trainings that delve into advanced digital innovation strategies, ensuring that the organization is always at the forefront of digital trends.";
            // this.digitalCultureImprovementTitle = scoreTitle;
            // this.digitalCultureImprovementDescription = scoreDescription;
          } else if (scoreOfCategory >= 67) {
            console.log("Triggered 3")
            // console.log("High Score - Digital Culture");
            scoreTitle =
              "This profile has a high level of understanding of digital transformation, with many digital initiatives implemented successfully";
              scoreDescription =
              "There is a strong digital culture, with effective training programs and good investment in digital technologies.";
            // this.digitalCultureImprovementTitle = scoreTitle;
            // this.digitalCultureImprovementDescription = scoreDescription;
          }
        }

        // Training and Development - 571
        if (idOfCategory == 605) {
          if (scoreOfCategory <= 32) {
            scoreTitle =
              "Managers and CEOs with a score under 33% likely have limited exposure to digital training and development programs. This score suggests that there's a significant gap in the digital skills of the workforce.";
            scoreDescription =
              "Familiarize managers with the importance of digital training and its impact on business performance. Cover the fundamentals of digital tools, software, and platforms relevant to the business. Provide training tailored to the specific roles and responsibilities of managers, focusing on the digital tools and platforms they'll use daily.";
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            scoreTitle =
              "Managers and CEOs with a score in this range have some experience with digital training, but may not be fully leveraging the potential of digital tools and platforms.";
            scoreDescription =
              "Dive deeper into advanced features of digital tools and platforms, ensuring managers can use them to their full potential. Introduce the concept of ongoing learning, emphasizing the importance of staying updated with the latest digital trends and tools. Explore strategies to incentivize employees to develop their digital skills, such as rewards, recognition, or career advancement opportunities.";
          } else if (scoreOfCategory >= 67) {
            scoreTitle =
              "Managers and CEOs with a high score are already well-versed in digital training and development. However, there's always room for improvement and staying updated with the latest trends.Delve into cutting-edge digital tools and platforms, ensuring managers are at the forefront of digital advancements.";
            scoreDescription =
              "Focus on strategies to embed continuous learning into the organization's culture, ensuring that teams are always updated with the latest digital skills. Dive deeper into advanced strategies to reward and recognize employees who excel in digital skill development.";
          }
        }

        // Investment in Digital Transformation - 572
        if (idOfCategory == 606) {
          if (scoreOfCategory <= 32) {
            scoreTitle =
              "Attend introductory trainings or webinars on digital transformation. Consider consulting with a digital transformation expert to get insights tailored to your business.Review case studies of successful digital transformations in similar industries. This will provide a clearer picture of the potential ROI and benefits.";
            scoreDescription =
              "Learn how to budget for digital transformation initiatives, even with limited resources.Engage in financial planning training sessioons or courses that focus on budgeting for digital projects. Consider seeking advice from financial consultants with experience in digital transformation.";
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            scoreTitle =
              "Attend advanced seminars or workshops that showcase the success stories of businesses that have undergone digital transformation. Engage in networking events to learn from peers.Engage in training sessions or courses that focus on ROI-driven budgeting for digital projects.";
            scoreDescription =
              "Consider using digital budgeting tools or software to aid in the process.Learn to integrate digital transformation goals into the broader strategic objectives of the organization.Participate in strategy-focused training sessions or workshops. Collaborate with digital transformation consultants to align your digital goals with your business strategy.";
          } else if (scoreOfCategory >= 67) {
            scoreTitle =
              "Explore cutting-edge strategies and technologies that can further propel your organization's digital journey.Engage in advanced ROI analysis workshops. Consider using sophisticated analytics tools to track and measure the success of digital initiatives.As leaders, it's crucial to lead by example.";
            scoreDescription =
              "Enhance leadership skills specifically tailored to the digital age.Participate in leadership training programs that focus on leading in the digital era. Engage in mentorship programs with leaders who have successfully led digital transformations.";
          }
        }

        // Challenges and Risks - 573
        if (idOfCategory == 607) {
          if (scoreOfCategory <= 32) {
            scoreTitle =
              "At this stage, there's a fundamental lack of awareness or understanding of the challenges that come with digital transformation. Initiate a foundational training to educate managers about the common challenges faced during digital transformation, such as resistance to change, budget constraints, and cybersecurity risks. This will help in setting realistic expectations and preparing for potential roadblocks.";
            scoreDescription =
              "Conduct a basic risk assessment workshop to identify potential risks in the digital transformation journey. Introduce managers to basic risk mitigation strategies and tools that can help in early detection and management of these risks.Organize motivational talks or case study sessions showcasing successful digital transformation stories. Highlight the benefits and long-term gains of embracing digital change to inspire and motivate the team.";
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            scoreTitle =
              "Recommendation: Organize advanced training workshops that delve deeper into each challenge, discussing real-life scenarios and solutions. Engage in group discussions or brainstorming sessions to collaboratively find solutions tailored to the organization's unique challenges. Introduce a comprehensive risk management framework that covers all facets of digital transformation. ";
            scoreDescription =
              "This should include regular risk assessments, updating risk mitigation strategies, and training sessions on the latest risk management tools and techniques.Organize leadership training sessions to equip managers with the skills to lead and inspire their teams during the transformation process. Focus on change management techniques and strategies to address and overcome resistance.";
          } else if (scoreOfCategory >= 67) {
            scoreTitle =
              "Engage in strategic planning sessions to continuously evaluate and refine the approach to challenges. Consider bringing in external experts or consultants for fresh perspectives and advanced solutions. Organize training sessions on advanced risk management techniques, tools, and software. Regularly review and update the risk management strategy to ensure it's aligned with the latest industry standards.";
            scoreDescription =
              "Engage in advanced leadership training focusing on leading change, fostering innovation, and building a culture of continuous improvement. Consider mentorship programs or executive coaching for personalized guidance.";
          }
        }

        // Cybersecurity - 574
        if (idOfCategory == 608) {
          if (scoreOfCategory <= 32) {
            scoreTitle =
              "Cybersecurity Awareness Training: Begin with a basic cybersecurity awareness training for all employees. This will help them recognize common threats like phishing emails and understand the importance of strong passwords.";
            scoreDescription =
              "Invest in essential cybersecurity tools such as firewalls, antivirus software, and data encryption. These tools provide the first line of defense against cyber threats.Conduct regular audits to identify vulnerabilities in your systems and address them promptly.";
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            console.log("Medium Score - Cybersecurity");
            scoreTitle =
              "Offer advanced training sessions that delve deeper into specific threats and how to counteract them. This could include training on social engineering threats, advanced persistent threats (APTs), and insider threats.";
            scoreDescription =
              "Develop a comprehensive incident response plan. This plan should detail the steps to take in the event of a cybersecurity breach, ensuring a swift and effective response.";
          } else if (scoreOfCategory >= 67) {
            console.log("High Score - Cybersecurity");
            scoreTitle =
              "Your organisation is with a high score are likely well-versed in cybersecurity practices. You have robust measures in place and are proactive in their approach. However, cybersecurity is an ever-evolving field, and there's always room for improvement.";
            scoreDescription =
              "As threats evolve, continuous training ensures that employees are always aware of the latest risks and how to counteract them.";
          }
        }

        // Future Plans - 575
        if (idOfCategory == 609) {
          if (scoreOfCategory <= 32) {
            console.log("Low Score - Future Plans");
            scoreTitle = "";
            scoreDescription = "";
          } else if (scoreOfCategory >= 33 && scoreOfCategory <= 66) {
            console.log("Medium Score - Future Plans");
            scoreTitle = "";
            scoreDescription = "";
          } else if (scoreOfCategory >= 67) {
            console.log("High Score - Future Plans");
            scoreTitle = "";
            scoreDescription = "";
          }
        }

        let categoryResults = {
          name: nameOfCategory,
          id: idOfCategory,
          score: scoreOfCategory,
          scoreTitle: scoreTitle,
          scoreDescription: scoreDescription,
        };

        console.log("What do i get!!!", categoryResults)

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
  color:#1a7c92;
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
