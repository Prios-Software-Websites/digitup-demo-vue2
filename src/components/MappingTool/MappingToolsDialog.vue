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

        <!-- <p>Tekst tekst tekst</p> -->
        <v-row class="ma-0 pa-0">
          <v-col cols="4">
            <v-text-field label="email" v-model="mappingEmail"></v-text-field>
            <v-text-field label="username" v-model="mappingUsername"></v-text-field>
          </v-col>
        </v-row>
        <v-btn :disabled="!mappingEmail || !mappingUsername" @click="checkIfEmailGotContent()" class="primary ml-3 mb-3">Take Mapping Tools</v-btn>

      </template>

      <!-- Form Itself -->
      <template v-if="mappingTemplate == 2">

        <!-- <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-btn @click="navigateMainTemplate(3)">go to Megatrends</v-btn>
          </v-col>
        </v-row> -->
        
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
          <v-tabs v-model="formSectionTabs" hide-slider style="border-radius:10px;" active-class="isActive">
            <v-tab
              v-for="(section,index) in userForm.sections.filter(i => !i.sub_category)" :key="index"
              class="tabStyling"
              :style="gradientStyle(section.id)"
            >
            <span>
              {{section.name ? section.name : section.title}}  
            </span>
              <!-- {{checkIfSectionHasProgress(section.id)}} {{section.id}} -->
            </v-tab>














          <v-tab-item v-for="(section,index) in userForm.sections.filter(i => !i.sub_category)" :key="index">
            <div v-if="section.form_intro_page && section.form_intro_page == 1">
              <v-container class="fu-container-styling mt-4" v-if="section.description">
                <p>{{section.description}}</p>
              </v-container>
              <v-container v-for="(question,questionIndex) in section.questions" :key="questionIndex" class="fu-container-styling mt-4">
                <v-layout row wrap v-if="section.form_intro_page && section.form_intro_page == 1">
                  <v-flex xs12>

                      <!-- Selects -->
                    <div v-if="question.type == 'q_front_select'">
                      <p>{{question.title}}</p>
                      <v-select
                        class="inputLarge"
                        :items="JSON.parse(question.options)"
                        item-text="label"
                        item-value="label"
                        label="Select one"
                        :disabled="setQuestionAnswerVariable(question.id).answered"
                        v-model.lazy="setQuestionAnswerVariable(question.id).value"
                      ></v-select>
                    </div>

                    <!-- Checkboxes -->
                    <div v-else-if="question.type == 'q_front_checkbox'">
                      <p>{{question.title}}</p>
                      <v-checkbox
                        v-for="(item, index) in JSON.parse(question.options)" 
                        :key="index"
                        class="ma-0 pa-0"
                        multiple
                        :disabled="setQuestionAnswerVariable(question.id).answered"
                        v-model.lazy="setQuestionAnswerVariable(question.id).value"
                        :label="item.label"
                        :value="item.label"
                      ></v-checkbox>
                    </div>

                    <!-- Simple Input Fields -->
                    <div v-else>
                      <p v-if="question.title == 'Name of the enterprise supported by the EDIH'" class="pb-0 mb-0 mt-10" :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : ''">
                        {{question.title}}
                      </p>
                      <p v-else class="pb-0 mb-0" :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : ''">
                        {{question.title}}
                      </p>
                      <!-- Name of the Enterprice -->
                      <v-text-field 
                        v-if="question.title == 'Name of the enterprise supported by the EDIH'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Name of the Company">
                      </v-text-field>
                      
                      <!-- Fiscal Registration Number (VAT) -->
                      <v-text-field 
                        v-else-if="question.title == 'Fiscal registration number (VAT or equivalent)'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''"
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Fiscal Registration Number">
                      </v-text-field>

                      <!-- Contact Person -->
                      <v-text-field 
                        v-else-if="question.title == 'Contact person'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Contact Person of the Company">
                      </v-text-field>
                      
                      <!-- Role -->
                      <v-text-field 
                        v-else-if="question.title == 'Role'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputMedium'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Fill in the role">
                      </v-text-field>

                      <!-- E-mail -->
                      <v-text-field 
                        v-else-if="question.title == 'Email'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Company Email">
                      </v-text-field>

                      <!-- Phone -->
                      <v-text-field 
                        v-else-if="question.title == 'Phone'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Company Phone">
                      </v-text-field>

                      <!-- Website -->
                      <v-text-field 
                        v-else-if="question.title == 'Website'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Company Website">
                      </v-text-field>

                      <!-- Company foundation year -->
                      <v-text-field 
                        v-else-if="question.title == 'Company foundation year'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Year Company were Founded">
                      </v-text-field>

                      <!-- County/NUTS2 -->
                      <v-text-field 
                        v-else-if="question.title == 'Company foundation year'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="County/NUTS2">
                      </v-text-field>

                      <!-- If sector was not listed in the previous question, please specify here... -->
                      <v-text-field 
                        v-else-if="question.title == 'If sector was not listed in the previous question, please specify here...'" 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="">
                      </v-text-field>

                      <!-- Rest of the input fields -->
                      <v-text-field 
                        v-else 
                        v-model.lazy="setQuestionAnswerVariable(question.id).value" 
                        class="inputStyling" 
                        :class="$vuetify.breakpoint.mdAndDown ? 'inputPhone' : 'inputLarge'"
                        :style="setQuestionAnswerVariable(question.id).answered ? 'background-color: #e5fddc;' : ''" 
                        :prepend-icon="setQuestionAnswerVariable(question.id).answered ? 'mdi-check' : 'mdi-close'"
                        :disabled="setQuestionAnswerVariable(question.id).answered" 
                        hide-details 
                        label="Write your answer here">
                      </v-text-field>

                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
            <div v-else>

              <v-row class="ma-0 pa-0">
                <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                  <v-navigation-drawer permanent style="width:100%;z-index:0">
                    <v-list dense class="py-0 mt-15">
                      <v-list-item-group v-model="selectedItem" style="color: darkblue;">
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
                </v-col>

                
                <!-- Sub Category Selected -->
                <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12" v-if="selectedChildCategory" class="mt-15">
                  <v-container v-for="(question,questionIndex) in selectedChildCategory.questions" :key="questionIndex" class="fu-container-styling mt-4">

                    <v-layout row wrap>
                      <v-flex xs12 class="pa-1">

                        <!-- Help Text -->
                        <p style="font-size: 16px" class="mb-0">
                          <span>
                            <v-icon v-if="setQuestionAnswerVariable(question.id).answered" color="success">mdi-check</v-icon>
                            <v-icon v-else color="error">mdi-close</v-icon>
                          </span>
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
                            <v-radio-group
                             :disabled="setQuestionAnswerVariable(question.id).answered"  
                             v-model.lazy="setQuestionAnswerVariable(question.id).value"
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
                              :disabled="setQuestionAnswerVariable(question.id).answered"  
                              v-model.lazy="setQuestionAnswerVariable(question.id).value"
                            >
                              <v-radio label="1" value="1"></v-radio>
                              <v-radio label="2" value="2"></v-radio>
                              <v-radio label="3" value="3"></v-radio>
                              <v-radio label="4" value="4"></v-radio>
                              <v-radio label="5" value="5"></v-radio>
                            </v-radio-group>
                          </div>
                        </div>
                        <div v-else-if="question.type == 'q_multiple_choice'">
                          <v-radio-group 
                            :disabled="setQuestionAnswerVariable(question.id).answered"  
                            v-model.lazy="setQuestionAnswerVariable(question.id).value"
                          >
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
                </v-col>

                <!-- No Sub Category Selected Yet -->
                <v-col v-else cols="12" xl="10" lg="10" md="10" sm="12" xs="12" class="mt-15">
                  <p class="title" v-if="$vuetify.breakpoint.mdAndUp"> 
                    <span>
                      <v-icon large>mdi-arrow-left</v-icon>
                    </span>
                    <span class="pl-5">Select one of the side categories to see the category questions</span>
                  </p>
                  <p class="title" v-else> 
                    <span>
                      <v-icon large>mdi-arrow-up</v-icon>
                    </span>
                    <span class="pl-5">Select one of the sub categories to see the category questions</span>
                  </p>
                </v-col> 
              </v-row>
             
                </div>
              </v-tab-item>

            </v-tabs>
          </div>
          <div class="pl-5 pt-5 pb-5">
            <v-btn title="Save new answered questions" color="primary" :disabled="!addedAnswers.filter(i => i.value && i.answered == false).length != 0" @click="sendFormResponse()" right class="mt-3 ml-3">Save Answers</v-btn>
            <span style="font-size: 16px" class="mb-0">
              <v-menu offset-y nudge-bottom>
                <template v-slot:activator="{ on }">
                  <v-btn @click="selectedQuestionInfo = 'yep'" v-on="on" color="primary" style="transform: translateY(5px)" text icon small>
                    <v-icon title="More information regarding the Save Answer button" size="30"> mdi-information </v-icon>
                  </v-btn>
                </template>
                <v-card class="pa-3 font-weight-regular body-2 br-10" width="500px" style="transform: translateY(-3px)">
                  <div v-if="selectedQuestionInfo" class="pa-5">
                    <p>Save Answer button will save any questions you have answered</p>
                    <p>It will be disabled if no new question have been answered</p>
                  </div>
                </v-card>
              </v-menu>
            </span>
            <v-btn title="take you to megatrends, once all categories have been answered" @click="navigateMainTemplate(3)" :disabled="!isFormDone" right class="mt-3 ml-3 primary">go to Megatrends</v-btn>
            <span style="font-size: 16px" class="mb-0">
              <v-menu offset-y nudge-bottom>
                <template v-slot:activator="{ on }">
                  <v-btn @click="selectedQuestionInfo = 'yep'" v-on="on" color="primary" style="transform: translateY(5px)" text icon small>
                    <v-icon title="More information regarding the Go to Megatrends button" size="30"> mdi-information </v-icon>
                  </v-btn>
                </template>
                <v-card class="pa-3 font-weight-regular body-2 br-10" width="500px" style="transform: translateY(-3px)">
                  <div v-if="selectedQuestionInfo" class="pa-5">
                    <p>All categories need to be answered, to activate this button</p>
                  </div>
                </v-card>
              </v-menu>
            </span>
          </div>

          


          <div class="pb-3"></div>
        </div>
      </template>



      <!-- MEGA TRENDS -->
      <template v-if="mappingTemplate == 3">
        
        <v-row class="ma-0 pa-0">
          <!-- Go back to Mapping Tool -->
          <v-col cols="12" class="ma-0 pa-0">
            <v-btn @click="navigateMainTemplate(2)" class="primary ml-3">Go to Form</v-btn>
          </v-col>
          <!-- Navigation Within MegaForm -->
          <v-col cols="12" v-if="megaTemplate !== 1">
            <v-btn @click="goToMegaTemplate(2)" class="mr-2">MegaTrends</v-btn>
            <v-btn v-if="selectedMegaTrends.length !== 0 && selectedMegaTrends.length <= 3" @click="goToMegaTemplate(3)" class="mr-2">MacroTrends</v-btn>
            <v-btn v-else disabled class="mr-2">MacroTrends</v-btn>
            <v-btn v-if="(selectedMacroTrends.length !== 0 && selectedMacroTrends.length <= 10) && (selectedMegaTrends.length !== 0 && selectedMegaTrends.length <= 3)" @click="goToMegaTemplate(4)">Questions</v-btn>
            <v-btn v-else disabled>Questions</v-btn>
          </v-col>
        </v-row>

        <!-- Information -->
        <template v-if="megaTemplate == 1">
          <p class="title">Megatrends</p>
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
              <v-btn @click="goToMegaTemplate(2)" dark class="mt-15">Choose Megatrends</v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Choosing MegaTrends -->
        <template v-if="megaTemplate == 2">
          <p class="title ml-3 mt-15">Choose Up to 3 megatrends</p>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0 pl-15" v-for="(megaTrend, megaTrendIndex) in megaTrends" :key="megaTrendIndex">
              <v-checkbox v-model="selectedMegaTrends" :label="megaTrend.name"  :value="megaTrend" class="ma-0 pa-0"></v-checkbox>
            </v-col>
          </v-row>
          <v-btn v-if="selectedMegaTrends.length !== 0 && selectedMegaTrends.length <= 3" @click="goToMegaTemplate(3)" class="success ml-3">Choose Macro Trends</v-btn>
          <v-btn v-else disabled class="mb-15">Choose Macro Trends</v-btn>
        </template>

        <!-- Choose Macro Trends -->
        <template v-if="megaTemplate == 3">
          <p class="title ml-3 mt-15">Choose up to 10 Macro Trend</p>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" v-for="(selectedMegaTrend, selectedMegaTrendIndex) in selectedMegaTrends" :key="selectedMegaTrendIndex">
              <!-- <p class="title ml-13"> {{selectedMegaTrend.name}} </p> -->
              <h2 class="mb-5">{{selectedMegaTrend.name}}</h2>
              <v-row class="ma-0 pa-0">
                <v-col cols="12" class="ma-0 pa-0" v-for="(macroTrend, macroTrendIndex) in selectedMegaTrend.macroTrends" :key="macroTrendIndex">
                  <v-row cols="12" class="ma-0 pa-0">
                    <v-col cols="auto" class="ma-0 pa-0 pr-5">
                      <v-icon v-if="macroTrend.MacroID === selectedMacroHelperID" style="color:green;" title="Read question description and score help text" size="30" @click="toggleMacroHelperText(macroTrend.MacroID)"> mdi-help-circle </v-icon>
                      <v-icon v-else title="Read question description and score help text" size="30" @click="toggleMacroHelperText(macroTrend.MacroID)"> mdi-help-circle </v-icon>

                    </v-col>
                    <v-col cols="4" class="ma-0 pa-0">
                      <v-checkbox v-model="selectedMacroTrends" :label="macroTrend.name" :value="macroTrend" class="ma-0 pa-0"></v-checkbox>
                    </v-col>
                    <v-col cols="4" class="ma-0 pa-0">

                      <v-card v-if="macroTrend.MacroID === selectedMacroHelperID">
                        <v-card-title class="title"> {{macroTrend.name}} </v-card-title>
                        <v-card-text>
                          <p> {{macroTrend.helperText}} </p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  
      
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn v-if="selectedMacroTrends.length !== 0 && selectedMacroTrends.length <= 10" @click="goToMegaTemplate(4)" class="ml-3 mb-15">Answer Questions</v-btn>
          <v-btn v-else disabled class="ml-3 mb-15 mt-15">Answer Questions</v-btn> 
        </template>

        <!-- Question regarding the MacroTrends -->
        <template v-if="megaTemplate == 4">
          <p class="title ml-3 mt-15">Questions</p>
          <v-row class="ma-0 pa-0">
            <!-- Iterate in the MACRO Trends one have chosen -->
            <v-col cols="12" class="ma-0 pa-0 mb-5" v-for="(macroTrendSelected, macroTrendSelectedIndex) in selectedMacroTrends" :key="macroTrendSelectedIndex">
              <h2 class="ml-5">{{macroTrendSelected.name}}</h2>
              <p class="ml-5">You have chosen {{macroTrendSelected.name}} as relevant for your business. Please, define its current importance on this scale:</p>
              <v-radio-group class="ma-0 pa-0 ml-5" v-model.lazy="macroTrendSelected.importance">
                <v-radio label="No importance" value="1"></v-radio>
                <v-radio label="Weak influence" value="2"></v-radio>
                <v-radio label="Medium influence" value="3"></v-radio>
                <v-radio label="Impactful " value="4"></v-radio>
              </v-radio-group>
              <p class="ml-5">Does your company have the competence to deal with this trend?</p>
              <v-radio-group class="ma-0 pa-0 ml-5" v-model.lazy="macroTrendSelected.competence" value="0">
                <v-radio label="Yes" value="1"></v-radio>
                <v-radio label="No" value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-btn @click="calculateMacroQuestions()" class="ml-6 success mb-15">Submit</v-btn>


          <v-dialog v-model="pdfResultDisplayDialog"> 
            <v-card v-if="formPdfData" class="pa-5">
              <MappingFormResults :pdfData="formPdfData" />
            </v-card>
          </v-dialog>



        </template>
      </template>
    </v-card>
  </v-dialog>
  
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import MappingFormResults from './MappingFormResults.vue'
export default {
  components: {
    MappingFormResults
  },
  data(){
    return {
      formPdfData: null,
      pdfResultDisplayDialog: false,
      selectedMacroHelperID: "",
      swotText:[
          {
            id:320,
            strengths:{
              name:"Business strategy",
              points:[
                "Being able to react faster to changes in the market situation (as fluctuating demand, lack of certain resources, necessity to change your logistic channels)",
                "Being able to embrace latest market trends",
                "Using digital simulation to better predict outcome of digitalization projects (as using digital twins and techniques as “test-before-invest”)",
                "Providing products with implemented connectivity (that are sending data about their utilization)",
                "Raising the value of your company",
              ]
            },
            weaknesses:{
              name:"Business strategy",
              points:[
                "Not able to react faster to changes in the market situation (as fluctuating demand, lack of certain resources, necessity to change your logistic channels)",
                "Not able to embrace latest market trends",
                "Not using digital simulation to better predict outcome of digitalization projects (as using digital twins and techniques as “test-before-invest”)",
                "Not providing products with implemented connectivity (that are sending data about their utilization)",
              ]
            }
          },
          {
            id:323,
            strengths:{
              name:"Business operations",
              points:[
                "Higher agility in introducing new products or product upgrades",
                "Easier acceptance of required delivery time frames",
                "Being able to provide new ordering options",
                "Providing improved or different level of service",
                "Providing electronic communication with customers",
                "Producing higher quality products by better and faster tracing defects and faults",
              ]
            },
            weaknesses:{
              name:"Business operations",
              points:[
                "Losing contact with technology trends",
                "Not able to react fast enough to the requirements of the fluctuating marke",
                "At risk of losing customers",
                "Missing a significant chance to established a culture of systematic innovation of products, upskilling of staff, data harvesting with potential of improvement",
                "Not able to provide new ordering options or different level of service",
              ]
            }
          },
          {
            id:326,
            strengths:{
              name:"HR and Culture",
              points:[
                "You do not suffer of a shortage of experts",
                "Your employees understand the potential and challenges of digital implementation",
                "Your key engineers get appropriate upskilling in the areas of digitalization",
                "You might even have a dedicated team for digitalization",
                "You have a company culture of openness that is required for your staff to be aware and ready for the upcoming changes",
              ]
            },
            weaknesses:{
              name:"HR and Culture",
              points:[
                "You suffer of a shortage of experts",
                "Your employees do not understand the potential and challenges of digital implementation",
                "Your key engineers are not being appropriate educated in the areas of digitalization",
                "You don't have a dedicated team for digitalization",
                "You don't have a company culture of openness that is required for your staff to be aware and ready for the upcoming changes, which can result in scepticism of the staff and their perspective regarding the company.",
              ]
            }
          },
          {
            id:329,
            strengths:{
              name:"Technology and Data management",
              points:[
                "You were able to identify relevant data within your existing system",
                "You are collecting data effectively from you machines, production to distribution",
                "You are using collected data to interpret them and use the results to further improve your business",
                "You have your IT landscape regularly audited to discover sources of its vulnerability and avoid its exploitation",
                "You have partaken relevant steps to improve your cyber security",
                "Your management has endorsed the establishment of “data culture” within your business",
              ]
            },
            weaknesses:{
              name:"Technology and Data management",
              points:[
                "Not able to identify relevant data within your existing system",
                "Not collecting data effectively from you machines, production to distribution",
                "Not using collected data to interpret them and use the results to further improve your business",
                "Not having your IT landscape regularly audited to discover sources of its vulnerability and avoid its exploitation",
                "Not partaking relevant steps to improve your cyber security",
                "Not endorsing the establishment of “data culture” within your business",
              ]
            }
          },
          {
            id:333,
            strengths:{
              name:"Green digitalization",
              points:[
                "Sustainable service provision by using tracking for further reuse",
                "Better emission, pollution or waste management",
                "Optimization of raw material consumption",
                "Reduction of transport and packaging cost with these implementations, you can benefit from more funding or other business opportunities, gain more market share and meet the energy standards and regulations easier.",
              ]
            },
            weaknesses:{
              name:"Green digitalization",
              points:[
                "Sustainable service provision by using tracking for further reuse ",
                "Better emission, pollution or waste management",
                "Optimization of raw material consumption",
                "Reduction of transport and packaging cost without these implementations, you cannot benefit from more funding or other business opportunities, gain more market share or meet the energy standards and regulations.",
              ]
            }
          },
        ],


      readyToSendTrendsData: "",
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
          "idList":  [1,2],
          "macroTrends": [
            {
              "name": "VR",
              "MacroID": 1,
              "helperText": `With the help of VR glasses, full-body suits, or tactile gloves, we can not only see the virtual world but also interact with it. 
                VR has long since ceased to be used merely for entertainment purposes. 
                Now it has its uses in the fields of architecture, planning, and therapy for example.`,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "AR",
              "MacroID": 2,
              "helperText": `Wearables and other technologies increasingly unite our real-world senses with the virtual world. 
                Augmented Reality refers to the reality that is expanded with virtual content, e.g. spectacle lenses that supplement our field of vision with digital, 
                personalized information such as messages or navigation data.`,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Ai",
          "idList":  [3,4,5,6,7,8],
          "macroTrends": [
            {
              "name": "Artificial Coworkers/Robots",
              "helperText": `In the world of work, AI (in the form of intelligent assistants, smart tools, and robots) 
                can take on increasingly demanding tasks and massively facilitate or replace the need for human workers.`,
              "MacroID": 3,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Chatbots",
              "helperText": `A chatbot is a technical system that responds autonomously, and as “humanly” as possible, via a dialogue system. 
                The concept includes automated chatbots that communicate in writing on websites, as well as apps that are used to converse/speak in a human-like manner. 
                Chatbots help to clarify questions and problems and explain products.`,
              "MacroID": 4,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Intelligent Personal Assistants",
              "helperText": `AI can facilitate and even revolutionize our everyday lives through personal assistants, tools, and robots. 
                Real-world examples include language assistants such as Siri, assistants that remind users of an appointment via pop-ups, or household/care robots.`,
              "MacroID": 5,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Machine & Deep Learning",
              "helperText": `The term machine learning refers to self-learning technologies that simulate human learning and thinking processes. 
                These self-adaptive algorithms develop their own solutions to problems through collected data and experience.`,
              "MacroID": 6,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Natural Language Processing",
              "helperText": `The aim of Natural Language Processing (NLP) is direct communication between man and machine by means of natural language. 
                Software is able to understand, process, and manipulate human language (e.g. the translation of a spoken/written text in real time).`,
              "MacroID": 7,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Pattern & Image Recognition",
              "helperText": `Visual intelligence focuses on the analysis and recognition of patterns, images, and shapes and can also be used for pattern prediction 
                (e.g. personal identification using face or handwriting recognition, industrial quality control).`,
              "MacroID": 8,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Data and Technologies",
          "idList":  [9,10,11,12,13,14,15],
          "macroTrends": [
            {
              "name": "Big data and smart data",
              "helperText": `Smart Data describes the intelligent processing of large amounts of data (Big Data). 
                In contrast to Big Data, data in Smart Data is already structured and prepared for the end user through data collection and analysis methods.`,
              "MacroID": 9,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Blockchain",
              "helperText": `Blockchain is a decentralized database that can be continuously expanded with datasets. 
                The data records are linked by cryptographic procedures and can contain a time stamp and transaction metadata.`,
              "MacroID": 10,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Cloud computing",
              "helperText": `Cloud computing is an IT infrastructure service that provides data storage, software applications, and services. 
                Data is not stored on local computers; instead, access is granted via networks, allowing usage that is independent of limiting factors such as time, location, and device.`,
              "MacroID": 11,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Data Transmission",
              "helperText": `New technologies and new possibilities for data transmission are increasingly improving transmission speeds and eliminating data volumes as a limiting factor 
                (e.g. 5G, Near Field Communication, RFID, Li-Fi).`,
              "MacroID": 12,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Geodata",
              "helperText": `Geodata is information that is assigned to a specific geographical position. With the help of this data, satellite-based analysis of market potentials, 
                harvest forecasts, traffic flow, etc. can be carried out.`,
              "MacroID": 13,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Open Data",
              "helperText": `Open data refers to data that is made available for free use or dissemination, without restrictions, and in the interest of the general public. 
                These include statistical data, geodata, teaching materials, and research results, which are made available by either government agencies or private-sector companies.`,
              "MacroID": 14,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Open Source",
              "helperText": `Open source refers to software whose source code is usually publicly accessible free of charge and can be viewed, modified, used, and distributed by third parties. 
                In contrast to proprietary software, open source products are thus often less expensive, more flexible, and more durable.`,
              "MacroID": 15,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Security & Transparency",
          "idList":  [16,17,18,19],
          "macroTrends": [
            {
              "name": "Cybersecurity",
              "helperText": `Cybersecurity is the protection of computer systems, servers, and networks against theft and damage as well as against misuse or interruption of services and functions.`,
              "MacroID": 16,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Data Protection & Transparency",
              "helperText": `In the digital world, the dissemination of private data quickly leads to a loss of privacy. 
                Therefore, data protection becomes a requirement. 
                The demand for transparency aims to ensure that all information and further processing of data is disclosed.`,
              "MacroID": 17,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Digital Currency & Payments",
              "helperText": `This trend includes all payments made by electronic means, including anonymous cryptographic payment systems and currencies (e.g. Bitcoins), 
                as well as all other online payments such as Paypal or mobile payment (e.g. Apple Pay).`,
              "MacroID": 18,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Verified Content",
              "helperText": `The rising wave of fake news and fake profiles makes many users suspicious of online content. 
                Many networks and media providers, therefore, rely on new tools that reliably check content for accuracy.`,
              "MacroID": 19,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Energy, Climate Change & Sustainability",
          "idList":  [20,21,22],
          "macroTrends": [
            {
              "name": "Climate Change",
              "helperText": `Global warming, which is mainly caused by humans, is an example of very rapid climate change. 
                The associated negative impacts will affect all facets of human life and economic activity. 
                More and more people, nations, and institutions are therefore committed to initiatives to reduce greenhouse gas emissions.`,
              "MacroID": 20,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Energy Efficiency",
              "helperText": `Innovative concepts and technological developments open up new possibilities for significantly reduced energy consumption in the form of electricity, heat, etc. 
                For an increasing number of people and companies, these concepts and developments make it possible to live and work in a more sustainable way.`,
              "MacroID": 21,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Zero Waste & Circular Economy",
              "helperText": `These concepts aim to minimize waste production, emissions, and energy consumption as much as possible. 
                Such important objectives are achieved through reuse, composting, remanufacturing, refurbishing, or recycling.`,
              "MacroID": 22,
              "importance": 0,
              "competence": 0
            },
          ]
        },
        {
          "name": "Digitally Connected Products, Offers & Services",
          "idList":  [23,24,25],
          "macroTrends": [
            {
              "name": "Connected Services, Products & Apps",
              "helperText": `Networked services and products are linked to other devices and/or systems via the Internet. 
                They mutually exchange data and can also be controlled by humans using integrated functions. 
                Often, these devices/systems can also be controlled or applied via apps.`,
              "MacroID": 23,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Location Based Services",
              "helperText": `Geospecific products offer the user of a mobile device specific services based on their location, e.g. 
                route planning or restaurant finders. The location is shared via GPS, WiFi, or Bluetooth.`,
              "MacroID": 24,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Smart Home & Building",
              "helperText": `The term Smart Home refers to technically networked devices and installations within a living space that can be operated remotely, often by voice. 
                Intelligent home applications and smart building solutions are designed to enhance our lives in terms of health, safety, benefits, and comfort.`,
              "MacroID": 25,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Future Working",
          "idList":  [26,27,28,29],
          "macroTrends": [
            {
              "name": "Collaboration in Networks",
              "helperText": `Digitisation opens up new possibilities for collaborative work in networks. 
                New innovation “ecosystems” are being created, and open innovation and open management are becoming easier to implement.`,
              "MacroID": 26,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Learning",
              "helperText": `Online higher-education courses, customized blended learning concepts, “learning apps” etc. allow us to enable a lifelong learning process that is independent of time or place.`,
              "MacroID": 27,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Working Models & Forms",
              "helperText": `Digitisation promises more flexibility in terms of working hours and locations. 
                New employment relationships and concepts are also changing our world of work. 
                The aim is to find solutions that are as individualized as possible in order to help maintain a healthy work-life balance.`,
              "MacroID": 28,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Technologisation of Work",
              "helperText": `Digitisation, intelligent tools, smart instruments, or wearables can help employees perform tasks better, faster, easier, or more innovatively. 
                Furthermore, workers can be analyzed in terms of work performance and efficiency. 
                The resulting data can be used for specific training, team compositions, etc.`,
              "MacroID": 29,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "Innovative Technologies & Manufacturing",
          "idList":  [30,31,32,33,34,35,36],
          "macroTrends": [
            {
              "name": "Additive Manufacturing",
              "helperText": `Additive manufacturing or 3D printing is the name given to computer-controlled manufacturing processes for creating three-dimensional objects 
                and shapes made up of multiple layers of material and constructed according to specified dimensions.`,
              "MacroID": 30,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Biotechnology & Genetic Engineering",
              "helperText": `Bioengineering applies engineering's scientific methods, in combination with computer science knowledge, to organic materials. 
                With the help of these methods, tissue structures - or even complete living beings - can be manipulated or altered. 
                Genetic engineering deals with the conversion of DNA building blocks and enables for example the breeding of new plants or the development of new drugs.`,
              "MacroID": 31,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Industrial Robotics",
              "helperText": `The primary aim of including robotics in the industry is to have certain production processes, such as assembly or processing of products, carried out by robots. 
                This automation results in enormous savings in terms of both time and resources.`,
              "MacroID": 32,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Innovative Process Engineering",
              "helperText": `Process engineering refers to how a specific product or material can be produced using either physical, chemical, or biological conversion processes, or digital approaches. 
                Innovations in this field can be used in the manufacture of many everyday products and lead to better or completely new materials, products, and applications.`,
              "MacroID": 33,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Intelligent Production",
              "helperText": `Intelligent production refers to a production process - from manufacturing to logistics 
                - which ideally is controlled and organized completely automatically and is relatively energy 
                - and resource-efficient. By incorporating dynamic processes in the business and engineering area, even the production of individual customer requirements is possible without human intervention.`,
              "MacroID": 34,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Materials & Substances",
              "helperText": `Novel materials and substances have interesting properties that give them optimized performance and open up numerous new possibilities. 
                Innovations include smart materials that react autonomously to changing environmental conditions or existing materials that gain additional functions through nanotechnology.`,
              "MacroID": 35,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Sensor Technologies",
              "helperText": `Sensors are used to measure and control important process parameters in a wide range of applications (industry, medicine, etc.). 
                The technologies range from infrared, ultrasound, and radar, to high-resolution stereo cameras. 
                New innovations include multi-sensor systems and are used to equip machines with artificial sensory perception.`,
              "MacroID": 36,
              "importance": 0,
              "competence": 0
            }
          ]
        },
        {
          "name": "New Business Models & Marketing Logics",
          "idList":  [37,38,39],
          "macroTrends": [
            {
              "name": "Innovative Business Models",
              "helperText": `New sales & marketing opportunities, increasing virtualization, and technical developments (e.g. additive manufacturing) 
                open up numerous possibilities for expanding existing business models, or finding completely new approaches.`,
              "MacroID": 37,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "New Marketing",
              "helperText": `Ever more powerful communication devices, as well as progressive networking, allow new solutions in marketing 
                - e.g. interaction marketing, content marketing, benefit-generating marketing, sensation marketing, and influencer marketing.`,
              "MacroID": 38,
              "importance": 0,
              "competence": 0
            },
            {
              "name": "Platform Economy",
              "helperText": `The term platform economy refers to a digital business model that brings together consumers and providers in a kind of digital marketplace and results in product purchases 
                or in resource sharing (e.g. Amazon, Airbnb, Uber).`,
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

      // if(this.userForm.sections.map(i => i.questions).flat().length == this.addedAnswers.filter(i => i.answered == true).length){
      //   console.log("I AM COMPLETE")
      //   return true;
      // } else {
      //   console.log("Not complete after all")
      //   return false;
      // }
    }
  },

  methods: {
    // Reset the Array, before populating it again #MEGATRENDS
    resetMacroQuestionArray(){
      this.trends.threats.data = [];
      this.trends.opportunities.data = [];
    },

    // Calculate the Macro Questions #MEGATRENDS
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

      this.calcualtePdfScore(this.trends);
    },







    // Open the Dialog #CORE
    openDialog(){
      this.openMappingToolDialog = true;
      this.getTodaysDate();
      this.mappingTemplate = 1;
    },

    // Close the Dialog #CORE
    closeDialog(){
      this.openMappingToolDialog = false;
      this.resetFunction();
    },

    // Reset the Mapping Tool #CORE
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

    // Get Todays Date #CORE
    getTodaysDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      let yyyy = today.getFullYear();

      this.todaysDate = yyyy + '-' + mm + '-' + dd;
    },

    /* ===== Pre Check Functions for Mapping Tool ===== */

    // Check if the email and username input are ok
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







    // Calculate the progress of the parent section based on the progress of the child sections (if any)
    gradientStyle(sectionId) {
      let completedValue = this.calculateParentSectionProgress(sectionId);
      return `background: linear-gradient(to right, rgba(71, 181, 176, 0.65) ${completedValue}%, rgba(236, 239, 241, 50) ${completedValue}%)`;
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





    /* Navigate between the main templates (Login/Reg, Mapping Form and Megatrends)
      - If changing from Mapping form to Mega Trends - then go to megaTemplate 1.
    */
    navigateMainTemplate(templateId){
      this.mappingTemplate = templateId;
      if(templateId == 3){
        this.megaTemplate = 1;
      }
    },

    // Navigation within the MegaTrends
    goToMegaTemplate(templateId){
      this.megaTemplate = templateId;
    },


    setCategoryColor(scoreValue){
      if(scoreValue > 66){
        return "#81C784";
      }
      else if(scoreValue < 66 && scoreValue > 33){
        // return "#FFEE5895";
        return "#FFF176";
      }
      else{
        // return "#EF535095";
        return "#E57373";
      }
    },

    calcualtePdfScore(trendData){
      console.log("Check the trendData fundation", trendData);
      /** Initializes an empty object that will store information about the front page, categories, trends, and SWOT analysis of the PDF - @type {Object} */
      let createObj = {
        front_page:{},
        categories:[
        ],
        // trends:{
        //   opportunities:{
        //     showdata:true,
        //     data:[]
        //   },
        //   threats:{
        //     showdata:true,
        //     data:[]
        //   }
        // },
        trends:trendData,
        swot_text:{
          strengths:{
            showdata:false,
            data:[]
          },
          weaknesses:{
            showdata:false,
            data:[]
          }
        }
      }

      /** Initializes an array that will store subcategories @type {Array} */
      let subCategories = [];

      // Loops through an array of sections and separates them into subcategories or front page elements
      this.userForm.sections.forEach(category =>{
        if(category.sub_category){
          subCategories.push({
            id:category.id,
            name:category.name,
            total_score:0,
            user_score:0,
            parent_category:category.sub_category
          })
        } else {
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
        }
      })

      /** Flattens an array of questions and stores it in a variable - @type {Array} */
      let allQuestionsArray = this.userForm.sections.map(i => i.questions).flat();

      // Loops through an array of answers and assigns scores to the various categories
      this.addedAnswers.forEach(questionAnswer =>{
          let findQuestion = allQuestionsArray.find(i => i.id == questionAnswer.question_id);
          if(findQuestion.result_category_id){





            let findCategory = subCategories.find(i => i.id == findQuestion.result_category_id);





            let findHighestQuestionValue = null;
            if(findQuestion.type == "q_checkboxes"){
              findHighestQuestionValue = JSON.parse(findQuestion.options).map(i => i.weight).reduce((a, b) => Number(a) + Number(b), 0);
              findCategory.total_score = findCategory.total_score + findHighestQuestionValue;
                let findCheckBoxScoreValue = questionAnswer.value.map(el => el.substring(el.indexOf("-") + 1, el.length)).reduce((a, b) => Number(a) + Number(b), 0)
                findCategory.user_score = findCategory.user_score + findCheckBoxScoreValue;
            }
            else if(findQuestion.type != 'q_text'){
              if(JSON.parse(findQuestion.options).filter(i => i.weight).length != 0){
                findHighestQuestionValue = JSON.parse(findQuestion.options).map(i => i.weight);
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


          /** Finds the SWOT text for the category - @type {String} */
          let findSwotText = this.swotText.find(i => i.id == category.id);












          // If the score percentage is less than or equal to 40, adds the SWOT text to the "weaknesses" section of the SWOT analysis
          if(calculatedScore <= 40){
            if(createObj.swot_text.weaknesses.showdata == false){
              createObj.swot_text.weaknesses.showdata = true;
            }
            createObj.swot_text.weaknesses.data.push(findSwotText.weaknesses)
          }

          // If the score percentage is greater than or equal to 70, adds the SWOT text to the "strengths" section of the SWOT analysis
          else if(calculatedScore >= 70){
            if(createObj.swot_text.strengths.showdata == false){
              createObj.swot_text.strengths.showdata = true;
            }
            createObj.swot_text.strengths.data.push(findSwotText.strengths)
          }

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
        
        
        // // Makes a GET request to the localhost server to retrieve the HTML template for the PDF
        // this.$http.get("http://localhost:8080/pdf_template/inprofuturepdftemplate.html").then(getHtmlTemplate =>{
          
        //   // Creates an object containing the HTML template and the data for the PDF
        //   let pdfData = {
        //     html: getHtmlTemplate.data,
        //     data: createObj
        //   }

        //   this.pdfResultDisplayDialog = true;
        //   this.formPdfData = {
        //     html: getHtmlTemplate.data,
        //     data: createObj
        //   }

        //   // Makes a POST request to the server to generate the PDF
        //   this.$http({ url: 'https://app.followup.prios.no/api/generate_pdf', method: 'post', responseType: 'blob', data: pdfData }).then(response =>{
        //     this.pdfProgressDialog = false;

        //     // Creates a URL for the generated PDF
        //     const url = window.URL.createObjectURL(new Blob([response.data]));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', "InprofutureResultPdf.pdf");
        //     link.setAttribute('target', '_blank');
        //     link.click();
        //   })
        // })


        this.$http.get("inprofuturepdftemplate.html")
        .then(getHtmlTemplate =>{
          let pdfData = {
            html: getHtmlTemplate.data,
            data: this.formPdfData
          }
          this.$http({ url: 'https://pdfservice.prios.no/api/pdf_service', method: 'post', responseType: 'blob', data: pdfData })
          .then(response =>{
            this.pdfProgressDialog = false;
            let pdfName = "InprofutureResultPdf.pdf";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', pdfName);
            link.setAttribute('target', '_blank');
            link.click();
          })
        })








      },

      
      toggleMacroHelperText(macroID){
        console.log(macroID)
        if(macroID == this.selectedMacroHelperID){
          this.selectedMacroHelperID = "";
        } else {
          this.selectedMacroHelperID = macroID;
        }
      }


  },

  watch:{
    // 
    formSectionTabs(){
      this.selectedQuestionInfo = null;
      this.selectedChildCategory = null;
    },
    selectedMegaTrends(){
      let includedIdList = this.selectedMegaTrends.map(i => i.idList).flat()
      this.selectedMacroTrends = this.selectedMacroTrends.filter(i => includedIdList.includes(i.MacroID))
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
  color: black !important;
  font-weight: bold;
  border-bottom: 5px solid black;
}

.inputStyling {
  border:1px solid black; 
  border-radius: 5px; 
  padding-left: 5px; 
  padding-right: 5px; 
  padding-top:20px;
}

.inputSmall {
  width: 200px;
}
.inputMedium {
  width: 250px;
}
.inputLarge {
  width: 300px;
}

.inputPhone {
  margin: 10px;
}

</style>