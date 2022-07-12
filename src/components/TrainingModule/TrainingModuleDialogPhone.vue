<template>
  <!-- 
    File contain the Phone menu of the training course clicked.
    Should take parent data, and open up another dialog displaying contend based upon this.
  -->
  <div>
    <!-- Main Phone Content Component -->
    <MainTrainingDialogContentPhone ref="displayCourseContent"></MainTrainingDialogContentPhone>
    <v-dialog v-model="courseDialogMenu" persistent fullscreen>
      <v-card>
        <!-- Navbar with close -->
        <v-app-bar clipped-left style="top: 0; position: sticky; z-index: 2;" color="primaryColor" :extension-height="8">
          <header>
            <span>{{ courseData.name }}</span>
          </header>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-app-bar>

        <!-- Menu -->
        <v-row rows wrap class="ma-0 pa-0">
          <v-col cols="12">
            <v-expansion-panels accordion class="ml-1">
              <!-- Iterate in Chapter Menus -->
              <v-expansion-panel v-for="(menuItem, index) in courseMenu" :key="index.id">

                <!-- IF of Type Lesson -->
                <v-expansion-panel-header @click="getAllLessonChapters(menuItem.content)" v-if="menuItem.type == 'lesson'">
                  <span>{{menuItem.content_label}}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content  v-if="menuItem.type == 'lesson'">
                  <template class="ma-0 pa-0">
                     <v-card v-for="(lesson, index) in courseLessonMenu" :key="index.id" tile flat class="ma-0 pa-0" @click="$refs.displayCourseContent.openLessonDialog(lesson, lesson.label)">
                      <v-card-text class="ma-0 pa-0" v-if="lesson.id == 290" style="display:none;"></v-card-text>
                      <v-card-text v-else class="ma-0 pa-0">
                        <p class="ma-0 pa-0 pt-4 pb-4">{{lesson.label}}</p>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-expansion-panel-content>

                <!-- If of Type Files -->
                <v-card v-else-if="menuItem.type == 'files'" @click="$refs.displayCourseContent.openFilesDialog(menuItem, menuItem.content_label)">
                  <v-card-text class="ma-0 pa-0">
                    <v-row row class="ma-0 pa-0">
                       <v-col cols="10" class="ma-0 pa-0 pt-2 pb-2 pl-5">{{menuItem.content_label}}</v-col>
                       <v-col cols="1" class="ma-0 pa-0 pt-2 pb-2 pl-4">
                          <v-icon small>mdi-open-in-new</v-icon>
                       </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <!-- Anything else (not Lesson or Files) -->
                <v-card v-else @click="$refs.displayCourseContent.openDialog(menuItem, menuItem.content_label)">
                  <v-card-text class="ma-0 pa-0">
                    <v-row row class="ma-0 pa-0">
                      <v-col cols="10" class="ma-0 pa-0 pt-2 pb-2 pl-5">{{menuItem.content_label}}</v-col>
                      <v-col cols="1" class="ma-0 pa-0 pt-2 pb-2 pl-4">
                        <v-icon v-if="menuItem.type == 'youtube_video'" small>mdi-youtube</v-icon>
                        <v-icon v-else-if="menuItem.type == 'external_learning_content'" small>mdi-link</v-icon>
                        <v-icon v-else-if="menuItem.type == 'task'" small>mdi-format-list-checkbox</v-icon>
                        <v-icon v-else-if="menuItem.type == 'learning_scene'" small>mdi-open-in-new</v-icon>
                        <v-icon v-else-if="menuItem.type == 'files'" small>mdi-paperclip</v-icon>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import MainTrainingDialogContentPhone from "@/components/TrainingModule/TrainingModuleDialogPhoneContent.vue"
export default {
  components:{
    MainTrainingDialogContentPhone
  },
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      courseDialogMenu: false,
      courseDataFromParent: [],
      courseData: [],
      courseMenu: [],
      courseLessonMenu: []
    }
  },
  methods: {

    // Opening the dialog from parent
    openDialog(item){
      this.resetFunction();
      this.courseDialogMenu = true;
      this.courseData = item;
      this.getAllchaptersWithinCourse(item.id);
    },

    // Closing the dialog
    closeDialog(){
      this.resetFunction();
      this.courseDialogMenu = false;
    },

    // Reset the dialog
    resetFunction(){
      this.courseDataFromParent = [];
    },

    // Get all the chapters within the course
    getAllchaptersWithinCourse(courseID){
      this.$http.get("https://app.followup.prios.no/api/courses/collection_content?mode=getcollectioncontent&courses_collection_id=" + courseID,{headers:{Tempaccess:this.accessKey}}).then(response => {
        this.courseMenu = response.data;
        // console.log("Responese are as followed:", response.data);
      })
    },

    // * Get all the chapters within a lesson
    getAllLessonChapters(lessonID){
      // console.log("data i get are", lessonID);
      this.$http.get("https://app.followup.prios.no/api/task_library/lessons?mode=getchapters&courses_id=" + lessonID,{headers:{Tempaccess:this.accessKey}}).then(response => {
        // console.log("Yerp", response.data);
        this.courseLessonMenu = response.data;
      })
    }
  }
}
</script>