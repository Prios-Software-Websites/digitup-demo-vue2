<template>
  <v-dialog v-model="openMappingToolDialog" role="An dialog for the user to try out the mapping tool" :width="dialogWidth" :fullscreen="isFullscreen">
     <v-card>
      <v-card-title>
          <span class="headline">Mapping Form</span>
          <v-spacer />
          <v-btn color="error" icon @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

      <!-- Fill in user Form -->
      <template v-if="mappingTemplate == 1">

        <p>Tekst tekst tekst</p>
        <v-row class="ma-0 pa-0">
          <v-col cols="4">
            <v-text-field label="email" v-model="mappingEmail"></v-text-field>
            <v-text-field label="username" v-model="mappingUsername"></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click="checkIfEmailGotContent()">Take Mapping Tools</v-btn>

      </template>

      <!-- Form Itself -->
      <template v-if="mappingTemplate == 2">

        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-btn @click="navigateMainTemplate(3)">go to Megatrends</v-btn>
          </v-col>
        </v-row>
        
        <div v-if="userForm && addedAnswers.length != 0">
          <div v-if="userForm.sections.filter(i => i.sub_category).length == 0">
            <v-tabs v-model="formSectionTabs" hide-slider style="border-radius:10px;">
              <v-tab
                v-for="(section,index) in userForm.sections" :key="index"
                class="tabStyling"
                :style="{ background: `linear-gradient(to right, rgba(26,124,146,0.1) ${caluclateSectionProgress(section.id)}%, rgba(236, 239, 241, 50) ${caluclateSectionProgress(section.id)}%)`}"
              >
                {{section.name ? section.name : section.title}} {{checkIfSectionHasProgress(section.id)}}
              </v-tab>
              <v-tab-item v-for="(section,index) in userForm.sections" :key="index">
                <v-layout justify-start>
                  <v-flex xs12 sm12 md12 lg10>
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
                    <v-layout row wrap v-else>
                      <v-flex xs12 class="pa-1">
                        <p style="font-size: 16px">
                          {{ question.title }}
                          <v-menu offset-x>
                            <template v-slot:activator="{ on }">
                              <v-btn @click="selectedQuestionInfo = question" v-on="on" color="primary" style="transform: translateY(-3px)" flat icon small>
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
            </v-tab-item>
          </v-tabs>
        </div>

































        <div v-else>
          <v-tabs v-model="formSectionTabs" hide-slider style="border-radius:10px;">
            <v-tab
              v-for="(section,index) in userForm.sections.filter(i => !i.sub_category)" :key="index"
              class="tabStyling"
              :style="gradientStyle(section.id)"
            >
              {{section.name ? section.name : section.title}} {{checkIfSectionHasProgress(section.id)}} {{section.id}}
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
                                <v-icon :color="caluclateSectionProgress(subSection.id) < 1 ? 'error' : caluclateSectionProgress(subSection.id) < 99 ? 'yellow' : 'success'"> mdi-record </v-icon>
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
          <v-btn color="primary" :disabled="!addedAnswers.filter(i => i.value && i.answered == false).length != 0" @click="sendFormResponse()" right class="mt-3 ml-3">Send form</v-btn>
          <v-btn @click="mainCalculationOfTheForm()">asdasdasdqwdq</v-btn>
        </div>
      </template>



      <!-- MEGA TRENDS -->
      <template v-if="mappingTemplate == 3">
        
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-btn @click="navigateMainTemplate(2)">Go to Form</v-btn>
          </v-col>
        </v-row>

        <!-- Information -->
        <template v-if="megaTemplate == 1">
          <p class="title text-center">Megatrends</p>
          <v-row class="ma-0 pa-0">
            <v-col cols="2" class="ma-0 pa-0"></v-col>
            <v-col class="ma-0 pa-0">
              <p>
                Megatrends are transformative technologies that have the force to change the global economy. 
                Like electricity or the Internet in the past, AI or virtual reality are currently molding our future. 
              </p>
              <p>
                Macrotrends are their subdomain, they represent trends that last over time, affect industries and become part of society lifestyles. 
                Think artificial coworkers (cobots) to AI.
              </p>
              <p> We have chosen 9 mega and 39 macrotrends that are in a way or form shaping the various processes of digitalization. </p>
              <p>
                Your first step is to choose out of these trends which are relevant for your company or will be shaping your industry in the future. 
                Choose up to <span style="color: red; font-weight: bold;"> 3 mega </span> and <span style="color: red; font-weight: bold;"> 10 macrotrends </span>.
              </p>
              <p> In the second step you will be asked to evaluate the trends you have chosen and decide if they represent a revolutionary opportunity or a threat for your business. </p>
              <v-btn @click="goToMegaTemplate(2)">Choose Megatrends</v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Choosing MegaTrends -->
        <template v-if="megaTemplate == 2">
          <p class="title text-center">Choose Up to 3 megatrends</p>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0 pl-15" v-for="(megaTrend, megaTrendIndex) in megaTrends" :key="megaTrendIndex">
              <v-checkbox v-model="selectedMegaTrends" :label="megaTrend.name"  :value="megaTrend" class="ma-0 pa-0"></v-checkbox>
            </v-col>
          </v-row>
          <v-btn v-if="selectedMegaTrends.length !== 0 && selectedMegaTrends.length <= 3" @click="goToMegaTemplate(3)">Choose Macro Trends</v-btn>
          <v-btn v-else disabled>Choose Macro Trends</v-btn>
        </template>

        <!-- Choose Macro Trends -->
        <template v-if="megaTemplate == 3">
          <p>Choose Macro Trend - template 3</p>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" v-for="(selectedMegaTrend, selectedMegaTrendIndex) in selectedMegaTrends" :key="selectedMegaTrendIndex">
              <p class="title text-center"> {{selectedMegaTrend.name}} </p>
              <v-row class="ma-0 pa-0">
                <v-col cols="12" class="ma-0 pa-0" v-for="(macroTrend, macroTrendIndex) in selectedMegaTrend.macroTrends" :key="macroTrendIndex">
                  <v-checkbox v-model="selectedMacroTrends" :label="macroTrend.name"  :value="macroTrend" class="ma-0 pa-0"></v-checkbox>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn v-if="selectedMacroTrends.length !== 0 && selectedMacroTrends.length <= 10" @click="goToMegaTemplate(4)">Answer Questions</v-btn>
          <v-btn v-else disabled>Answer Questions</v-btn>
        </template>

        <!-- Question regarding the MacroTrends -->
        <template v-if="megaTemplate == 4">
          <p>Questions - template 4</p>
          <v-row class="ma-0 pa-0">
            <!-- Iterate in the MACRO Trends one have chosen -->
            <v-col cols="12" class="ma-0 pa-0" v-for="(macroTrendSelected, macroTrendSelectedIndex) in selectedMacroTrends" :key="macroTrendSelectedIndex">
              <h2>{{macroTrendSelected.name}}</h2>
              <v-radio-group v-model.lazy="macroTrendSelected.importance" row>
                <v-radio label="No importance" value="1"></v-radio>
                <v-radio label="Weak influence" value="2"></v-radio>
                <v-radio label="Medium influence" value="3"></v-radio>
                <v-radio label="Impactful " value="4"></v-radio>
              </v-radio-group>
              <v-radio-group v-model.lazy="macroTrendSelected.competence" value="0" row>
                <v-radio label="Yes" value="1"></v-radio>
                <v-radio label="No" value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-btn @click="calculateMacroQuestions()">Submit</v-btn>
        </template>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  data(){
    return {
      openMappingToolDialog: false,
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      mappingTemplate: 1,
      formID: 168,
      todaysDate: "",
      mappingEmail: "",
      mappingUsername: "",
      usersMappingData: [],
      userForm: [],
      addedAnswers: [],

      // Form
      formSectionTabs: 0,
      selectedQuestionInfo: "",
      addedAnswers: [],
      selectedChildCategory: "",
      selectedItem: "",

      completedSections: [],


      completedValue: "",
      megaTemplate: 1,


      selectedMegaTrends: [],
      selectedMacroTrends: [],

      /* Array of answered questions, and the name + id of the macro it belongs to.
        This is presumely the array to send away, regarding MegaTrending
      */
      answeredMacroQuestions: [],



      loadedFormData: [],


      megaTrendsToSendToServer: {
        "threats": {
          "showData": true,
          "data": []
        },
        "opportunities": {
          "showData": true,
          "data": []
        }
      },


      trends:{
        threats:{
          showData:true,
          data:[]
        },
        opportunities:{
          showData:true,
          data:[]
        }
      },


      /* Megatrends - Hardcoded untill data comes from server
        - Select Megatrend
        - Select Macro Trends based upon Megatrend selected
        - Answer Questions based on macro trend selected
      */
      megaTrends: [
        {
          "name": "Virtualization",
          "macroTrends": [
            {
              "name": "VR",
              "helperText": "",
              "MacroID": 1,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "AR",
              "helperText": "",
              "MacroID": 2,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Ai",
          "macroTrends": [
            {
              "name": "Artificial Coworkers/Robots",
              "helperText": "",
              "MacroID": 3,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Chatbots",
              "helperText": "",
              "MacroID": 4,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Intelligent Personal Assistants",
              "helperText": "",
              "MacroID": 5,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Machine & Deep Learning",
              "helperText": "",
              "MacroID": 6,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Natural Language Processing",
              "helperText": "",
              "MacroID": 7,
              "importance": 0,
              "competence": 0
            },
             {
              "name": "Pattern & Image Recognition",
              "helperText": "",
              "MacroID": 8,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Data and Technologies",
          "macroTrends": [
            {
              "name": "Big data and smart data",
              "helperText": "",
              "MacroID": 9,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Blockchain",
              "helperText": "",
              "MacroID": 10,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Cloud computing",
              "helperText": "",
              "MacroID": 11,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Data Transmission",
              "helperText": "",
              "MacroID": 12,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Geodata",
              "helperText": "",
              "MacroID": 13,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Open Data",
              "helperText": "",
              "MacroID": 14,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Open Source",
              "helperText": "",
              "MacroID": 15,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Security & Transparency",
          "macroTrends": [
            {
              "name": "Cybersecurity",
              "helperText": "",
              "MacroID": 16,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Data Protection & Transparency",
              "helperText": "",
              "MacroID": 17,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Digital Currency & Payments",
              "helperText": "",
              "MacroID": 18,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Verified Content",
              "helperText": "",
              "MacroID": 19,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Energy, Climate Change & Sustainability",
          "macroTrends": [
            {
              "name": "Climate Change",
              "helperText": "",
              "MacroID": 20,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Energy Efficiency",
              "helperText": "",
              "MacroID": 21,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Zero Waste & Circular Economy",
              "helperText": "",
              "MacroID": 22,
              "importance": 0,
              "competence": 0
            },
          ]
        },
        {
          "name": "Digitally Connected Products, Offers & Services",
          "macroTrends": [
            {
              "name": "Connected Services, Products & Apps",
              "helperText": "",
              "MacroID": 23,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Location Based Services",
              "helperText": "",
              "MacroID": 24,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Smart Home & Building",
              "helperText": "",
              "MacroID": 25,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Future Working",
          "macroTrends": [
            {
              "name": "Collaboration in Networks",
              "helperText": "",
              "MacroID": 26,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Learning",
              "helperText": "",
              "MacroID": 27,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Working Models & Forms",
              "helperText": "",
              "MacroID": 28,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Technologisation of Work",
              "helperText": "",
              "MacroID": 29,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Innovative Technologies & Manufacturing",
          "macroTrends": [
            {
              "name": "Additive Manufacturing",
              "helperText": "",
              "MacroID": 30,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Biotechnology & Genetic Engineering",
              "helperText": "",
              "MacroID": 31,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Industrial Robotics",
              "helperText": "",
              "MacroID": 32,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Innovative Process Engineering",
              "helperText": "",
              "MacroID": 33,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Intelligent Production",
              "helperText": "",
              "MacroID": 34,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Materials & Substances",
              "helperText": "",
              "MacroID": 35,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Sensor Technologies",
              "helperText": "",
              "MacroID": 36,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "New Business Models & Marketing Logics",
          "macroTrends": [
            {
              "name": "Innovative Business Models",
              "helperText": "",
              "MacroID": 37,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Marketing",
              "helperText": "",
              "MacroID": 38,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Platform Economy",
              "helperText": "",
              "MacroID": 39,
              "importance": 0,
              "competence": 0
            }
          ]
        },
      ],

     
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
  },

  methods: {


    // Reset the Array, before populating it again
    resetMacroQuestionArray(){
      this.trends.threats.data = [];
      this.trends.opportunities.data = [];
    },

    calculateMacroQuestions(){
      this.resetMacroQuestionArray();
      this.selectedMacroTrends.forEach(question =>{

        // Create an empty object, that will get populated by macro name and question text by value
        let objectToSend = {
          trend_name:question.name,
          trend_text:""
        }

        // Importance Set Text based on value
        if(question.importance == 2){
          objectToSend.trend_text = "should be monitored and in case of further development";
        }
        if(question.importance == 3){
          objectToSend.trend_text = "should be implemented in your 1-2 years plan";
        }
        if(question.importance == 4){
          objectToSend.trend_text = "should immediately be dealt with";
        } 

        // Competence - Move object to opportunities OR threats AND not value 1 in importance
        if(question.importance != 1){
          if(question.competence == 1){
            this.trends.threats.data.push(objectToSend);
          }
          if(question.competence == 2){
            this.trends.opportunities.data.push(objectToSend);
          }
        } 
      })

      // To fix {__ob__: Observer}
      let fixedObject = JSON.parse(JSON.stringify(this.trends))
      console.log("Check the fundation", fixedObject);
    },








    openDialog(){
      this.openMappingToolDialog = true;
      this.getTodaysDate();
      this.mappingTemplate = 1;
    },
    closeDialog(){
      this.openMappingToolDialog = false;
      this.resetFunction();
    },

    resetFunction(){
      this.mappingTemplate = 1;
      this.todaysDate = "";
      this.mappingEmail = "";
      this.mappingUsername = "";
      this.usersMappingData = [];
      this.userForm = [];
      this.addedAnswers = [];
      // Form
      this.formSectionTabs = 0;
      this.selectedQuestionInfo = "";
      this.addedAnswers = [];
      this.selectedChildCategory = "";
      this.selectedItem = "";
      this.completedSections = [];
    },

    getTodaysDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      let yyyy = today.getFullYear();

      this.todaysDate = yyyy + '-' + mm + '-' + dd;

      // Use today's date in your function here
    },

    /* ===== Pre Check Functions for Mapping Tool ===== */

    // Check if the email and username input are ok
    checkIfEmailGotContent(){
      if(this.mappingEmail.trim() && this.mappingUsername.trim()){
      // if(this.mappingEmail.trim()){
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
      this.getAllExistingFormData(this.loadedFormData);
    },


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

    caluclateSectionProgress(sectionId){
      let getQuestionIdList = this.userForm.sections.find(i => i.id == sectionId).questions.map(i => i.id)
      let answeredQuestions = this.addedAnswers.filter(i => getQuestionIdList.includes(i.question_id) && i.answered)
      let test = "";
      test = "";
      test = ((answeredQuestions.length / getQuestionIdList.length) * 100).toFixed(0);
      // console.log("Section ID", sectionId);
      // console.log("Entries of getQuestionIdList", getQuestionIdList);
      // console.log("Length of getQuestionIdList", getQuestionIdList.length);
      // console.log("Entries of answeredQuestions", answeredQuestions);
      // console.log("Length of answeredQuestions", answeredQuestions.length);
      console.log("test", test, sectionId)
      return ((answeredQuestions.length / getQuestionIdList.length) * 100).toFixed(0)
    },







    /*
      - 1. Get the Answer Data.
      - 2. Get by ID of section, the total amount of questions within. (length)
      - 3. Check by ID if the amount of answered questions, on said ID match the length of the total amount of questions within that section.
      - 4. If yes, simply push that ID into an empty array, just for the check.
      - 5. Once that array got the amount of total sections, we know that it is completed fully.
      - 6. Set mappingComplete key to true, as the check before sending to the server.
      --- Got the AnswerData for all answers in Mapping Tools by now ---
      - 7. Megatrends are easier, simply check that the question array got content.
        - If yes then the user have selected atleast 1 megatrend, 1 macrotrend and answered 2 questions.
          - Have a check that all questions have been answered before button can be clicked.
      - 8. Set MegaComplete key to true, as the check before sending to the server.
      --- Got the Mega trend to send now ---
      - 9. Send to server the format wished of the data.
    */








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






    // WIP - Trying to get the sections that have been marked as Completed 
    mainCalculationOfTheForm(){

      let userArray = this.userForm.sections.filter(i => i.sub_category);

      console.log(userArray);

      for(let index = 0; index < userArray.length; index++){
        

        let sectionId = userArray[index].sectionId;

        // Find all child sections of the current section
        let getChildSections = this.userForm.sections.filter(i => i.sub_category == sectionId);
        
        // Get a list of all question IDs in the child sections
        let getQuestionIdList = getChildSections.map(i => i.questions).flat().map(i => i.id);
        
        // Find all answered questions in the child sections
        let answeredQuestions = this.addedAnswers.filter(i => getQuestionIdList.includes(i.question_id) && i.answered);
        
        // Calculate the progress of the current section
        let progress = ((answeredQuestions.length / getQuestionIdList.length) * 100).toFixed(0); 
        console.log("Porgress are", progress);
        
        // Push the section ID to the array if the progress is 100
        if (progress == 100) {
          this.completedSections.push(sectionId);
          console.log("POP")
        }
        
        return progress;
      }
    },

    // Navigate between the main templates (Login/Reg, Mapping Form and Megatrends)
    navigateMainTemplate(templateId){
      this.mappingTemplate = templateId;
    },

    // Navigation within the MegaTrends
    goToMegaTemplate(templateId){
      this.megaTemplate = templateId;
    },


  },

  watch:{
    formSectionTabs(){
      this.selectedQuestionInfo = null;
      this.selectedChildCategory = null;
    }
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

</style>