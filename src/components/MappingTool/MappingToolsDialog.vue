<template>
  <v-dialog v-model="mappingDialog" fullscreen>
    <v-card>

    
    <div class="container">
      <h1>Mapping Tool</h1>
      <v-btn @click="closeDialog()" class="mb-5">Close</v-btn>


      <v-btn @click="sendEmail()">askhwdqd</v-btn>

      <!-- Register User -->
      <template v-if="mappingTemplate == 1">
        
        <v-row class="ma-0 pa-0">
          <v-col cols="4">
            <v-text-field label="email" v-model="mappingEmail"></v-text-field>
            <v-text-field label="username" v-model="mappingUsername"></v-text-field>
          </v-col>
        </v-row>
        <v-btn :disabled="!mappingEmail || !mappingUsername" @click="checkIfEmailGotContent()" class="primary ml-3 mb-3">Take Mapping Tools</v-btn>
      </template>

      <!-- The Form Itself -->
      <template v-if="mappingTemplate == 2">

        <!-- IF the form got any Content and the AddedAnswers arrat are not empty -->
        <div v-if="userForm && addedAnswers.length != 0">

          <!-- Major Statement - Only show if there are NO sub_category given - Meaning NO sub categories with their own questions within the category -->
          <div v-if="userForm.sections.filter(i => i.sub_category).length == 0">

            <v-tabs v-model="formSectionTabs" hide-slider style="border-radius:10px;">
              <!-- By completed Value, we display the progress of each category through colours in the tabs -->
              <v-tab
                v-for="(section,index) in userForm.sections" :key="index"
                class="tabStyling"
                :style="{ background: 'linear-gradient(to right, #90EE91 ' + calculateSectionProgress(section.id) + '%, #eceff180 ' + calculateSectionProgress(section.id) + '%)' }"
              >
                <span v-if="calculateSectionProgress(section.id)">{{section.name ? section.name : section.title}} </span>
                <span v-else>{{section.name ? section.name : section.title}}</span>
                <!-- ({{ calculateSectionProgress(section.id) }}%) -->
              </v-tab>
                
              <!-- The Questions within the category -->
              <v-tab-item v-for="(section,index) in userForm.sections" :key="index">
                <v-row class="ma-0 pa-0">
                  <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12" class="ma-0 pa-0">
                    <v-container v-for="(question,questionIndex) in section.questions" :key="questionIndex" class="fu-container-styling mt-4">

                      <v-row>

                        <v-col cols="12" class="pa-1">
                          <!-- <pre>
                            {{question}}
                          </pre> -->
                          
                          <!-- Title of Question, and Helper Text regarding it -->
                          <p style="font-size: 16px; font-weight: bold;">
                            <span>{{ question.title }}</span>
                            <v-menu offset-x>
                              <template v-slot:activator="{ on }">
                                <v-btn @click="selectedQuestionInfo = question" v-on="on" color="primary" style="transform: translateY(-3px)" text icon small class="ml-3">
                                  <v-icon title="Read question description and score help text" size="30" > info </v-icon>
                                </v-btn>
                              </template>
                              <v-card class="pa-3 font-weight-regular body-2 br-10" width="500px">
                                <div v-if="selectedQuestionInfo">
                                  <p><b>Question description:</b></p>
                                  <p>{{ selectedQuestionInfo.description }}</p>
                                  <p><b>Score explanation:</b></p>
                                  <ol>
                                    <li v-for="(helpText, helpTextIndex) in JSON.parse(selectedQuestionInfo.options)" :key="helpTextIndex">{{ helpText.label }}</li>
                                  </ol>
                                </div>
                              </v-card>
                            </v-menu>
                          </p>

                          <!-- The Question Type: q_scale - 1-5 Questions -->
                          <div v-if="question.type == 'q_scale'">
                            <div v-if="JSON.parse(question.options).map(i => i.weight).length == 0">
                              <v-radio-group :disabled="setQuestionAnswerVariable(question.id).answered" row v-model.lazy="setQuestionAnswerVariable(question.id).value">
                                <v-radio label="1" value="1"></v-radio>
                                <v-radio label="2" value="2"></v-radio>
                                <v-radio label="3" value="3"></v-radio>
                                <v-radio label="4" value="4"></v-radio>
                                <v-radio label="5" value="5"></v-radio>
                              </v-radio-group>
                            </div>
                            <div v-else>
                              <v-radio-group :disabled="setQuestionAnswerVariable(question.id).answered" row v-model.lazy="setQuestionAnswerVariable(question.id).value">
                                <v-radio label="1" value="1"></v-radio>
                                <v-radio label="2" value="2"></v-radio>
                                <v-radio label="3" value="3"></v-radio>
                                <v-radio label="4" value="4"></v-radio>
                                <v-radio label="5" value="5"></v-radio>
                              </v-radio-group>
                            </div>
                          </div>

                          <!-- The Question Type - q_multiple_choice - more than one option -->
                          <div v-else-if="question.type == 'q_multiple_choice'">


                            <div v-if="setQuestionAnswerVariable(question.id).answered == false">
                              <label v-for="(item, index) in JSON.parse(question.options)" :key="index">
                                <input type="radio"
                                  :name="'question-' + question.id"
                                  :value="item.weight"
                                  v-model.lazy="setQuestionAnswerVariable(question.id).value"
                                  class="ml-2 mr-2"
                                >
                                <span>{{ item.label }}</span>
                              </label>
                            </div>

                            <div v-else>
                              <label v-for="(item, index) in JSON.parse(question.options)" :key="index">
                                <input type="radio"
                                  :name="'question-' + question.id"
                                  :value="item.weight"
                                  v-model.lazy="setQuestionAnswerVariable(question.id).value"
                                  :disabled="true"
                                  class="ml-2 mr-2"
                                >
                                <span style="color: grey;">{{ item.label }}</span>
                              </label>
                            </div>  

                            

                            <!-- <v-radio-group :disabled="setQuestionAnswerVariable(question.id).answered" row v-model.lazy="setQuestionAnswerVariable(question.id).value">
                              <v-radio v-for="(item, index) in JSON.parse(question.options)" :label="item.label" :value="item.weight" :key="index"></v-radio>
                            </v-radio-group> -->

                            
                          </div>

                          <!-- The Question Type - q_checkboxes - simple checkboxes -->
                          <div v-else-if="question.type == 'q_checkboxes'">
                            <v-checkbox
                              v-for="(item, index) in JSON.parse(question.options)" 
                              :key="index"
                              multiple
                              :disabled="setQuestionAnswerVariable(question.id).answered"
                              v-model.lazy="setQuestionAnswerVariable(question.id).value"
                              :label="item.label"
                              :value="index + '-' + item.weight"
                            ></v-checkbox>
                          </div>

                          <!-- The Quesiton Type - Anything else - Writable Text Field -->
                          <div v-else>
                            <v-text-field :disabled="setQuestionAnswerVariable(question.id).answered" v-model.lazy="setQuestionAnswerVariable(question.id).value" label="Write your answer here"></v-text-field>
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
            <v-tabs v-model="formSectionTabs" hide-slider style="border-radius:10px;" active-class="isActive">
              <v-tab
                v-for="(section,index) in userForm.sections.filter(i => !i.sub_category)" :key="index" class="tabStyling" :style="gradientStyle(section.id)">
                {{section.name ? section.name : section.title}} 
              </v-tab>



              <v-tab-item v-for="(section,index) in userForm.sections.filter(i => !i.sub_category)" :key="index">
                <div v-if="section.form_intro_page && section.form_intro_page == 1">
                  <v-container class="fu-container-styling mt-4" v-if="section.description">
                    <p>{{section.description}}</p>
                  </v-container>
                  <v-container v-for="(question,questionIndex) in section.questions" :key="questionIndex" class="fu-container-styling mt-4">
                    <v-layout row wrap v-if="section.form_intro_page && section.form_intro_page == 1">
                      <v-flex xs12>
                        <div v-if="question.type == 'q_front_select'">
                        <p>{{question.title}}</p>
                        <v-select
                          :items="JSON.parse(question.options)"
                          item-text="label"
                          item-value="label"
                          label="Select one"
                          :disabled="setQuestionAnswerVariable(question.id).answered"
                          v-model.lazy="setQuestionAnswerVariable(question.id).value"
                        ></v-select>
                      </div>
                      <div v-else-if="question.type == 'q_front_checkbox'">
                        <p>{{question.title}}</p>
                        <v-checkbox
                          v-for="(item, index) in JSON.parse(question.options)" 
                          :key="index"
                          multiple
                          :disabled="setQuestionAnswerVariable(question.id).answered"
                          v-model.lazy="setQuestionAnswerVariable(question.id).value"
                          :label="item.label"
                          :value="item.label"
                        ></v-checkbox>
                      </div>
                      <div v-else>
                        <p>{{question.title}}</p>
                        <v-text-field :disabled="setQuestionAnswerVariable(question.id).answered" v-model.lazy="setQuestionAnswerVariable(question.id).value" label="Write your answer here"></v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
              <div v-else>
                <v-layout justify-start>

                    <!-- Sub Sections in an category -->
                    <v-flex xs2>
                      <v-navigation-drawer permanent style="width:100%;z-index:0">
                        <v-list dense class="py-0">
                          <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(subSection,subIndex) in userForm.sections.filter(i => i.sub_category == section.id)" :key="subIndex" @click="selectedChildCategory = subSection;">
                              <v-list-item-action>
                                <v-icon :color="calculateSectionProgress(subSection.id) < 1 ? 'error' : calculateSectionProgress(subSection.id) < 99 ? 'yellow' : 'success'"> mdi-record </v-icon>
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
                      <v-container v-for="(question,questionIndex) in selectedChildCategory.questions" :key="questionIndex" class="fu-container-styling mt-4">
                        <v-layout row wrap>
                          <v-flex xs12 class="pa-1">
                            <p style="font-size: 16px">
                              {{ question.title }}
                              <v-menu offset-x>
                                <template v-slot:activator="{ on }">
                                  <v-btn @click="selectedQuestionInfo = question" v-on="on" color="primary" style="transform: translateY(-3px)" text icon small>
                                    <v-icon title="Read question description and score help text" size="30"> mdi-information </v-icon>
                                  </v-btn>
                                </template>
                                <v-card class="pa-3 font-weight-regular body-2 br-10" width="500px">
                                  <div v-if="selectedQuestionInfo">
                                    <p><b>Question description:</b></p>
                                    <p>{{ selectedQuestionInfo.description }}</p>
                                    <p><b>Score explanation:</b></p>
                                    <ol>
                                      <li v-for="(helpText, helpTextIndex) in JSON.parse(selectedQuestionInfo.options)" :key="helpTextIndex">{{ helpText.label }}</li>
                                    </ol>
                                  </div>
                                </v-card>
                              </v-menu>
                            </p>
                            <div v-if="question.type == 'q_scale'">
                              <div v-if="JSON.parse(question.options).map(i => i.weight).length == 0">
                                <v-radio-group :disabled="setQuestionAnswerVariable(question.id).answered" row v-model.lazy="setQuestionAnswerVariable(question.id).value">
                                  <v-radio label="1" value="1"></v-radio>
                                  <v-radio label="2" value="2"></v-radio>
                                  <v-radio label="3" value="3"></v-radio>
                                  <v-radio label="4" value="4"></v-radio>
                                  <v-radio label="5" value="5"></v-radio>
                                </v-radio-group>
                              </div>
                              <div v-else>
                                <v-radio-group :disabled="setQuestionAnswerVariable(question.id).answered" row v-model.lazy="setQuestionAnswerVariable(question.id).value">
                                  <v-radio label="1" value="1"></v-radio>
                                  <v-radio label="2" value="2"></v-radio>
                                  <v-radio label="3" value="3"></v-radio>
                                  <v-radio label="4" value="4"></v-radio>
                                  <v-radio label="5" value="5"></v-radio>
                                </v-radio-group>
                              </div>
                            </div>
                            <div v-else-if="question.type == 'q_multiple_choice'">
                              <v-radio-group :disabled="setQuestionAnswerVariable(question.id).answered" row v-model.lazy="setQuestionAnswerVariable(question.id).value">
                                <v-radio v-for="(item, index) in JSON.parse(question.options)" :label="item.label" :value="item.weight" :key="index"></v-radio>
                              </v-radio-group>
                            </div>
                            <div v-else-if="question.type == 'q_checkboxes'">
                              <v-checkbox
                                v-for="(item, index) in JSON.parse(question.options)" 
                                :key="index"
                                multiple
                                :disabled="setQuestionAnswerVariable(question.id).answered"
                                v-model.lazy="setQuestionAnswerVariable(question.id).value"
                                :label="item.label"
                                :value="index + '-' + item.weight"
                              ></v-checkbox>
                            </div>
                            <div v-else>
                              <v-text-field :disabled="setQuestionAnswerVariable(question.id).answered" v-model.lazy="setQuestionAnswerVariable(question.id).value" label="Write your answer here"></v-text-field>
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
          <v-btn color="primary" :disabled="!addedAnswers.filter(i => i.value && i.answered == false).length != 0" @click="sendFormResponse()" right class="mt-3 ml-3">Save Answers</v-btn>
          <!-- <v-btn @click="calcualtePdfScore()" class="ml-6 mt-3 success">Submit (Crucial)</v-btn> -->
          <v-btn @click="calculateFormData()" class="ml-6 mt-3 success">Submit (Crucial)</v-btn>
          
          <div class="pb-3"></div>
        </div>

        <v-dialog v-model="pdfResultDisplayDialog"> 
          <v-card v-if="formPdfData" class="pa-5">
            <MappingFormResults :pdfData="formPdfData" />
          </v-card>
        </v-dialog>

        
      </template>
    </div>
  </v-card>
</v-dialog>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import MappingToolResults from '@/components/MappingTool/MappingToolResults.vue';

  export default {

    components: {
      MappingToolResults
    },

    data(){
      return {
        mappingDialog: false,

        total_score: 0,


        column: null,
        row: null,






        formPdfData: null,
        pdfResultDisplayDialog: false,
        accessKey: window.btoa('bac436b32a36431bb437b9509b6d3495'),
        /*
          Template 1 - Login to take form
          Template 2 - Login View Form
          Template 3 - Login PDF Visuals
        */
        mappingTemplate: 1,
        /*
          187 - Digital Friendly Label English
          192 - Digital Friendly Label Italian
        */
        formID: 196, 
        todaysDate: "",
        mappingEmail: "",
        mappingUsername: "",
        userForm: [],
        addedAnswers: [],

        // Form Data
        formSectionTabs: 0,
        selectedQuestionInfo: "",
        selectedChildCategory: "",
        selectedItem: "",
        completedSections: [],
        completedValue: "",
        loadedFormData: [],
      }
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
      isFormDone(){
        let allQuestions = this.userForm.sections.map(i => i.questions).flat()
        let findAllNonFrontPageQuestions = allQuestions.filter(i => i.result_category_id)
        let findAllAnswers = this.addedAnswers.filter(i => findAllNonFrontPageQuestions.map(i => i.id).includes(i.question_id)).filter(i => i.answered)
        if(findAllAnswers.length == findAllNonFrontPageQuestions.length){
          return true;
        }
        else{
          return false
        }
      }
    },

    methods: {
      // Get Todays Date and open template 1
      openingMappingForm(mappingID){
        this.getTodaysDate();
        this.mappingTemplate = 1;
        this.formID = mappingID;
        this.mappingDialog = true;
      },

      closeDialog(){
        this.mappingDialog = false;
      },
      // Get Todays Date
      getTodaysDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        this.todaysDate = yyyy + '-' + mm + '-' + dd;
      },
    

      /*
        ===== Pre Checks for Mapping Tools =====
      */

      // Check if email got content
      checkIfEmailGotContent(){
        if(this.mappingEmail.trim() && this.mappingUsername.trim()){
          this.checkIfUserEntryExists();
        } else {
          console.log("Email or username field got no content");
        }
      },

      // Check if user with this email, got any entries within the database toward this form.
      checkIfUserEntryExists(){
        this.usersMappingData = [];
        this.$http.get(`https://app.followup.prios.no/api/form_builder/responses?mode=getresponsesbyformid&user_email=${this.mappingEmail}&form_id=${this.formID}`, {headers:{Tempaccess:this.accessKey}}).then((response) => {
          if(response.data.length) {
            console.log("Yup")
            this.getFormData(response.data);
          } else {
            console.log("Nope")
            this.createNewUserEntry();
          }
        }).catch((error) => {
          console.error(error);
        });
      },

      // IF There are NO User with this form within the database, then create one.
      createNewUserEntry(){
        // Create the set of data needed to create a new key.
        let newResponse = [[
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
          'mapping_form',
          this.mappingUsername,
          null
        ]];

        let { Tempaccess } = {headers:{Tempaccess:this.accessKey}};

        this.$http.post('https://app.followup.prios.no/api/form_builder/responses', newResponse, { Tempaccess }).then((response) => {
          this.getNewUserEntry(response.data);
        }).catch((error) => {
          console.error(error);
        });
      },

      // Once creating a new entry of this user toward this form, get the data through his insertID
      getNewUserEntry(dbResponse){
        this.$http.get(`https://app.followup.prios.no/api/form_builder/responses?id=${dbResponse.insertId}`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
          console.log("Responsen er", response.data)
          this.getFormData(response.data);
        }).catch((error) => {
          console.error(error);
        });
      },


      /* ===== Get form data and its existing answers ===== */

      // Getting all the data of the form, including the userObject made / gotten
      getFormData(userData){
        this.$http.get(`https://app.followup.prios.no/api/form_builder/responses?mode=getformresponseanddata&guid='${userData[0].guid}'`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
          console.log("Responsen er på formdataen er", response.data);
          this.userForm = response.data;
          this.loadedFormData = response.data;
          this.getAllExistingFormData(response.data);
        }).catch((error) => {
          console.error(error);
        });
      },

      // Get all existing Answers user have made
      getAllExistingFormData(formData){
        console.log("Formdataen er", formData);
        this.$http.get(`https://app.followup.prios.no/api/form_builder/question_responses?&response_id=${formData.response_id}`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
          console.log("Jeg får dette", response.data);
          this.adjustFormData(response.data);
        }).catch((error) => {
          console.error(error);
        });
      },

      // If the user have answered on some of these, then simply adjust it accordingly
      adjustFormData(adjustedData){
        this.userForm.sections.map(i => i.questions).flat().forEach(item =>{
          let findQuestionResponse = adjustedData.find(i => i.question_id == item.id)
          if(findQuestionResponse){
            let itemValue = findQuestionResponse.answer;
            if(item.type == "q_checkboxes" || item.type == "q_front_checkbox"){
              itemValue = findQuestionResponse.answer.split(",");
            }
            this.addedAnswers.push({question_id:item.id,value:itemValue,answered:true})
          } else{
            this.addedAnswers.push({question_id:item.id,value:null,answered:false})
          }
        })
        this.navigateMainTemplate(2);
      },

      /* ===== Form Functionalities ===== */

      selectQuestionInfo(question){
        this.selectedQuestionInfo = question;
      },

      getResponesAndSetFields(){
        this.$http.get(`https://app.followup.prios.no/api/api/form_builder/question_responses?&response_id=${this.userForm.response_id}`).then(response => {
          this.userForm.sections.map(i => i.questions).flat().forEach(item =>{
            let findQuestionResponse = response.data.find(i => i.question_id == item.id)
            if(findQuestionResponse){
              let itemValue = findQuestionResponse.answer;
              if(item.type == "q_checkboxes" || item.type == "q_front_checkbox"){
                itemValue = findQuestionResponse.answer.split(",");
              }
              this.addedAnswers.push({question_id:item.id,value:itemValue,answered:true})
            }
            else{
              this.addedAnswers.push({question_id:item.id,value:null,answered:false})
            }
          })
        })
      },

      
      sendFormResponse(){
        let newCreateArr = [];
        this.addedAnswers.filter(i => i.value && !i.answered).forEach(item =>{
          item.answered = true;
          let findQuestionType = this.userForm.sections.map(i => i.questions).flat().find(i => i.id == item.question_id).type
          let itemValue = item.value
          if(findQuestionType == "q_checkboxes" || findQuestionType == "q_front_checkbox"){
            itemValue = item.value.join(",")
          }
          let newCreateObj = [this.userForm.response_id,item.question_id,itemValue]
          newCreateArr.push(newCreateObj)
        })
        this.$http.post("https://app.followup.prios.no/api/form_builder/question_responses", newCreateArr, {headers:{Tempaccess:this.accessKey}}).then(() =>{
          
        })
        // this.getAllExistingFormData(this.loadedFormData);
      },


      // Get the question ID and the value of the question and push it to the array
      setQuestionAnswerVariable(questionId){
        return this.addedAnswers.find(i => i.question_id == questionId)
      },

      checkIfSectionHasProgress(sectionId){
        let getQuestionIdList = this.userForm.sections.find(i => i.id == sectionId).questions.map(i => i.id)
        return this.addedAnswers.filter(i => getQuestionIdList.includes(i.question_id) && i.value && !i.answered).length;
      },

      checkIfParentSectionHasProgress(sectionId){
        let getQuestionIdList = this.userForm.sections.filter(i => i.sub_category == sectionId).map(i => i.questions).flat().map(i => i.id)
        return this.addedAnswers.filter(i => getQuestionIdList.includes(i.question_id) && i.value && !i.answered).length
      },




      /* Get Value of category, to display the progress of the category in colours
        - Gets the category aka section ID as a parameter
        - getQuestionIdList: Get all questions, matching iterated category id, and put the id of these into the array
        - answeredQuestions: Get all the answered questions, of said iteration, and put them into the array as objects.
        - calculateCategoryProgress: get the length of answeredQuestions and divide it by the length of getQuestionIdList, and multiply it by 100. Then round it to the nearest integer.
      */
      calculateSectionProgress(sectionId){
        let getQuestionIdList = this.userForm.sections.find(i => i.id == sectionId).questions.map(i => i.id);
        let answeredQuestions = this.addedAnswers.filter(i => getQuestionIdList.includes(i.question_id) && i.answered)
        let calculateCategoryProgress = ((answeredQuestions.length / getQuestionIdList.length) * 100).toFixed(0);
        return calculateCategoryProgress
      },






      // Calculate the progress of the parent section based on the progress of the child sections (if any)
      gradientStyle(sectionId) {
        let completedValue = this.calculateParentSectionProgress(sectionId);
        return `background: linear-gradient(to right, rgba(147, 250, 165) ${completedValue}%, rgba(236, 239, 241, 50) ${completedValue}%)`;
      },

      calculateParentSectionProgress(sectionId) {
        // Find all child sections of the current section
        let getChildSections = this.userForm.sections.filter(i => i.sub_category == sectionId);
        
        // Get a list of all question IDs in the child sections
        let getQuestionIdList = getChildSections.map(i => i.questions).flat().map(i => i.id);
        
        // Find all answered questions in the child sections
        let answeredQuestions = this.addedAnswers.filter(i => getQuestionIdList.includes(i.question_id) && i.answered);
        
        // Calculate the progress of the current section
        let progress = ((answeredQuestions.length / getQuestionIdList.length) * 100).toFixed(0); 
        
        // Push the section ID to the array if the progress is 100
        // if (progress == 100) {
        //   this.completedSections.push(sectionId);
        // }
        
        return progress;
      },


      // Navigation

      navigateMainTemplate(templateId){
        this.mappingTemplate = templateId;
      },

      setCategoryColor(scoreValue){
        if(scoreValue > 66){
          return "#81C784";
        }
        else if(scoreValue < 66 && scoreValue > 33){
          return "#FFF176";
        }
        else{
          return "#E57373";
        }
      },



























      // Rename if working to the function below
      calculateFormData(){

        this.swotTextData = [];
        this.swotReportsData = [];
        let tempArr = [];

        // We get all categories, and its questions
        console.log("this.userForm.sections", this.userForm.sections);

        this.userForm.sections.forEach(category =>{
          let newStrengtWeakness = {
            name:category.name,
            id:category.id,
            total_score:0,
            user_score:0,
            question_id_list:[],
          }
          if(!category.form_intro_page){
            tempArr.push(newStrengtWeakness)
          }
        })

        this.userForm.sections.map(i => i.questions).flat().forEach(question => {
          let findCategory = tempArr.find(i => i.id == question.result_category_id)
          let findQuestionResponse = this.addedAnswers.find(i => i.question_id == question.id)
          let findHighestQuestionValue = null;
          if(findCategory){
            console.log("CHECK THIS OUT!!!", findQuestionResponse);

           if(question.type != 'q_text'){
              if(JSON.parse(question.options).filter(i => i.weight).length != 0){
                findHighestQuestionValue = JSON.parse(question.options).map(i => i.weight);
                findCategory.total_score = findCategory.total_score + Math.max(...findHighestQuestionValue);
              }
              else if(question.type == "q_scale"){
                findCategory.total_score = findCategory.total_score + 5;
              }
              if(findQuestionResponse && findQuestionResponse.answered){

                
                console.log("findCategory.user_score", findCategory.user_score);
                console.log("Number(findQuestionResponse.value)", Number(findQuestionResponse.value));


                findCategory.user_score = findCategory.user_score + Number(findQuestionResponse.value);
              }
            }

            findCategory.question_id_list ? findCategory.question_id_list.push(question.id) : findCategory.question_id_list = [question.id];
          }
        })
        // this.swotReportsData = tempArr;

        console.log("temp Array", tempArr);
        this.generatePdf(tempArr);
      },


      generatePdf(tempArr){
        // this.pdfProgressDialog = true;
        this.formPdfData = {
          categories:[],
          graph_data:[],
          userName: this.mappingUsername,
          userEmail: this.mappingEmail
        };
        // Set categories
        tempArr.forEach(category =>{
          this.formPdfData.categories.push({
            name:category.name,
            score:Math.round((category.user_score / category.total_score) * 100),
            color:this.setCategoryColor(Math.round((category.user_score / category.total_score) * 100)),
            // color: 'hotpink',
            // sub_categories: category.child_categories.map(i => {return{
            //   name:i.name,
            //   score:Math.round((i.user_score / i.total_score) * 100),
            //   color:this.setCategoryColor(Math.round((i.user_score / i.total_score) * 100)),
            // }})
          })
        })
        // Set graph/chart data
        this.formPdfData.graph_data = this.formPdfData.categories.map(i=> {return{
          x:i.name,
          value:i.score,
          fill:"#4DB6AC",
          stroke:"lightgrey"
        }})
        console.log("COLOOOOR", this.formPdfData);
        
        this.createPdf();
      },


      createPdf(){
        this.$http.get("/resetProjectPdfTemplate.html").then(getHtmlTemplate =>{
          let pdfData = {
            html: getHtmlTemplate.data,
            data: this.formPdfData,
            pdf_format:"a4"
          }
          //ONLY PDF
          this.$http({ url: 'https://pdfservice.prios.no/api/pdf_service', method: 'post', responseType: 'blob', data: pdfData })
          .then(response =>{
            // this.pdfProgressDialog = false;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "MappingFormPDF.pdf");
            link.setAttribute('target', '_blank');
            link.click();
          })
        })
      },


      sendEmail(){
        // let mailData = {
        //   to: req.mail_data.to,
        //   from:req.mail_data.from,
        //   subject: req.mail_data.subject,
        //   html: req.mail_data.html,
        //   text: req.mail_data.text,
        //   attachments:null
        // };
        let mailData = {
          to: 'bjorn@priossoftware.no',
          from: 'bob@gmail.coms',
          subject: 'Mapping Tool',
          // html: req.mail_data.html,
          // text: req.mail_data.text,
          attachments:null
        };
        // if(req.attatchment_data && req.attatchment_data.type == "pdf"){
          PdfGenerator.generatePdf(req.attatchment_data)
          .then(getPdfBuffer => {
            if(getPdfBuffer){
              mailData.attachments = [
                {
                  filename: req.attatchment_data.filename,
                  content: getPdfBuffer
                }
              ] 
            }
            let email = new Email(mailData);
            email.sendmail()
            .then(() =>{
              resolve("Email sent")
            })
          })
          .catch(err =>{
            console.log(err)
            reject(err)
          })
        // }
      },













      // Calculate the PDF values, from the form data
      calcualtePdfScore(){

        // Create an object that will store the data for the PDF
        let createObj = {
          front_page:{},
          categories:[],
        }

        /** Initializes an array that will store subcategories @type {Array} */
        let subCategories = [];

        // Loops through an array of sections and separates them into subcategories or front page elements
        this.userForm.sections.forEach(category =>{

          console.log("UserForm", category);

          let newCategoryObj = {
            id:category.id,
            name:"",
          }
          if(category.name){
            newCategoryObj.name = category.name;
            newCategoryObj.sub_categories = [];
            createObj.categories.push(newCategoryObj);
          } else {
            newCategoryObj.name = category.title;
            newCategoryObj.description = category.description;
            newCategoryObj.questions = [];
            createObj.front_page = newCategoryObj;
            
          }
          
        })

        /** Flattens an array of questions and stores it in a variable - @type {Array} */
        let allQuestionsArray = this.userForm.sections.map(i => i.questions).flat();

        // Loops through an array of answers and assigns scores to the various categories
        this.addedAnswers.forEach(questionAnswer =>{
          let findQuestion = allQuestionsArray.find(i => i.id == questionAnswer.question_id);



          if(findQuestion.result_category_id){

            let findCategory = subCategories.find(i => i.id == findQuestion.result_category_id);

            console.log("What value do i get!??", subCategories);
            let findHighestQuestionValue = null;
            if(findQuestion.type == "q_checkboxes"){
              findHighestQuestionValue = JSON.parse(findQuestion.options).map(i => i.weight).reduce((a, b) => Number(a) + Number(b), 0);
              
              findCategory.total_score = findCategory.total_score + findHighestQuestionValue;
              
              let findCheckBoxScoreValue = questionAnswer.value.map(el => el.substring(el.indexOf("-") + 1, el.length)).reduce((a, b) => Number(a) + Number(b), 0)
              findCategory.user_score = findCategory.user_score + findCheckBoxScoreValue;
            }
            else if(findQuestion.type != 'q_text'){







              console.log("Am i triggered?")
              if(JSON.parse(findQuestion.options).filter(i => i.weight).length != 0){
                findHighestQuestionValue = JSON.parse(findQuestion.options).map(i => i.weight);

                console.log("Number One!", findCategory);
                console.log("Number Two!", findQuestion);
                console.log("Number Three!", findHighestQuestionValue);

                findCategory.total_score = findCategory.total_score + Math.max(...findHighestQuestionValue);
              }
              else if(findQuestion.type == "q_scale"){

                findCategory.total_score = findCategory.total_score + 5;

              }
              findCategory.user_score = findCategory.user_score + Number(questionAnswer.value);
            }
          }








          // IF FRONT PAGE QUESTIONS
          else if(findQuestion.section_id){
            console.log("Am i triggered 2?")
            if(findQuestion.type == "q_front_select" || findQuestion.type == "q_front_text"){
              createObj.front_page.questions.push({
                title:findQuestion.title,
                answer:questionAnswer.value,
                checkbox:false
              })
            }
            else if(findQuestion.type == "q_front_checkbox"){
              console.log(questionAnswer)
              let newQuestionAnswers = []
              JSON.parse(findQuestion.options).forEach(item =>{
                if(questionAnswer.value.includes(item.label)){
                  newQuestionAnswers.push(item)
                }
              })
              createObj.front_page.questions.push({
                title:findQuestion.title,
                answer:newQuestionAnswers,
                checkbox:true,
              })
            }
          }
        })

        // Loops through an array of categories and calculates the total score for each category
        createObj.categories.filter(i => !i.questions).forEach(category =>{

          /** Filters subcategories by parent category and stores the result in a variable - @type {Array} */
          let findSubCategories = subCategories.filter(i => i.parent_category == category.id);

          /** Calculates the total score for the category by summing the total scores of the subcategories - @type {Number} */
          let totalCategoryScore = findSubCategories.map(i => i.total_score).reduce((a, b) => Number(a) + Number(b), 0);

          /** Calculates the total user score for the category by summing the user scores of the subcategories - @type {Number} */
          let totalCategoryUserScore = findSubCategories.map(i => i.user_score).reduce((a, b) => Number(a) + Number(b), 0);

          /** Calculates the score percentage for the category - @type {Number} */
          let calculatedScore = Math.round((totalCategoryUserScore / totalCategoryScore) * 100);

          /** Sets the color of the category based on the score percentage - @type {String} */
          category.color = this.setCategoryColor(calculatedScore);

          /** Sets the score percentage for the category - @type {String} */
          category.score = calculatedScore + "%";

          // Cleans the subcategory array by removing unnecessary properties and adding the score percentage and color
          let cleanedSubCategoryArray = findSubCategories.map(i => {return {
            name:i.name,
            score:Math.round((i.user_score / i.total_score) * 100) + "%",
            color:this.setCategoryColor(Math.round((i.user_score / i.total_score) * 100))
          }})

          // Assigns the cleaned subcategory array to the category
          category.sub_categories = cleanedSubCategoryArray
        })

        this.formPdfData = createObj;
        this.pdfResultDisplayDialog = true;

        console.log(createObj);
        
        this.$http.get("resetProjectPdfTemplate.html").then(getHtmlTemplate =>{
          let pdfData = {
            html: getHtmlTemplate.data,
            data: this.formPdfData
          }
          this.$http({ url: 'https://pdfservice.prios.no/api/pdf_service', method: 'post', responseType: 'blob', data: pdfData }).then(response =>{
            this.pdfProgressDialog = false;
            let pdfName = "resetResultsPDF.pdf";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', pdfName);
            link.setAttribute('target', '_blank');
            link.click();
          })
        })
      },
    },

    watch:{
      // Watches for changes in the selected category and resets the selected question info and selected child category
      formSectionTabs(){
        this.selectedQuestionInfo = null;
        this.selectedChildCategory = null;
      },
    },
  }
</script>

<style scoped>
.tabStyling {
  color: #1a7c92; 
  border-radius: 5px; 
  margin-right: 4px;
}





.v-tabs >>> .v-tabs__bar {
  background-color: #ECEFF1;
}

/*  */
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
  /* background-color: #eceff1; */
  border: 1px solid #1a7c92;
  color: #1a7c92;
  border-radius: 5px;
  text-transform: none;
}



.isActive {
  color: brown !important;
  font-weight: bold;
}

.hotpink {
  background: rgb(148, 128, 138);
}
input[type='radio']{
  width: 15px;
  height: 15px;
}
</style>