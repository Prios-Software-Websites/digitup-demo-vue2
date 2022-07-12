<template>
   <v-dialog v-model="courseDataDialogen" persistent fullscreen>
     <ImageDialog ref="openThisImageDialog"></ImageDialog>

     <!-- 
       Types: files, youtube_video, lesson, external_learning_content, task, learning_scene,    = have icons for aswell
       content: text, rowDivider, youtube_video, files, task, file, embededLink, image
       Remember: Desktop: sidebar + content in same dialog.
                 Phone/ipad: expandable + dialog with specific content.

      -->
      <v-card height="100%" class="ma-0">
        <!-- Both for Desktop and phone -->
        <!-- Main Header -->
        <v-app-bar clipped-left style="top: 0; position: sticky; z-index: 2;" color="primaryColor" :extension-height="8">
          <header>
            <span>{{ courseDataFromParent.name }}</span>
          </header>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <!-- =================== -->
        <!-- ===== Desktop ===== -->
        <!-- =================== -->
        <v-row v-if="!$vuetify.breakpoint.mdAndDown" class="ma-0 pa-0 pt-5">

          <!-- ===== Sidemenu ===== -->
          <v-col cols="3" class="ma-0 pa-0">
            <v-card class="ma-0 pa-0">
              <v-expansion-panels accordion>
                <v-expansion-panel v-for="(sidemenu, index) in sortLessonArray" :key="index.id">

                  <!-- Lesson -->
                  <!-- <v-expansion-panel-header @click="getChapters(chapterSection.content)" v-if="chapterSection.type == 'lesson'"> -->
                  <v-expansion-panel-header v-if="sidemenu.type == 'lesson'" @click="getAllLessonsInChapter(sidemenu.content)">
                    <span>{{sidemenu.content_label}}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class=" body-2" v-if="sidemenu.type == 'lesson'">
                    <template class="ma-0 pa-0">
                      <v-card v-for="(lesson, index) in lessonData" :key="index.ix" tile flat class="ma-0 pa-0" @click="getLessonContent(lesson.id)">
                        <v-card-text class="ma-0 pa-0" v-if="lesson.id == 290" style="display:none;"></v-card-text>
                        <v-card-text v-else class="ma-0 pa-0">
                          <!-- <p class="ma-0 pa-0 pt-4 pb-4">{{lesson.label}}</p> -->
                          <v-row>
                            <v-col cols="10" class="ma-0 pa-0 pa-5"> {{lesson.label}}</v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-expansion-panel-content>

                  <!-- Rest of the types - youtube_video, external_learning_content, task, learning_scene -->
                  <v-card v-else @click="getChapterContent(sidemenu)">
                    <v-card-text class="ma-0 pa-0">
                      <v-row row class="ma-0 pa-0">
                        <v-col cols="10" class="ma-0 pa-0 pt-2 pb-2 pl-6">{{sidemenu.content_label}}</v-col>
                        <v-col cols="1" class="ma-0 pa-0 pt-2 pb-2 pl-8">
                          <v-icon v-if="sidemenu.type == 'youtube_video'" small>mdi-youtube</v-icon>
                          <v-icon v-if="sidemenu.type == 'learning_scene'" small>mdi-open-in-new</v-icon>
                          <v-icon v-if="sidemenu.type == 'task'" small>mdi-format-list-checkbox</v-icon>
                          <v-icon v-if="sidemenu.type == 'external_learning_content'" small>mdi-link</v-icon>
                          <v-icon v-if="sidemenu.type == 'image'" small>mdi-image</v-icon>
                          <v-icon v-if="sidemenu.type == 'files'" small>mdi-paperclip</v-icon>
                          <!-- Files -->
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <!-- ===== Content ===== -->

          <!-- Landing course content -->
          <v-col cols="9" v-if="lessonContent == '' && contentData == ''">
            <!-- <pre>{{courseDataFromParent}}</pre> -->
            <p class="display-1 pb-5 text-center">{{courseDataFromParent.name}}</p>
            <v-row>
              <v-col cols="6">
                <v-img contain aspect-ratio="2" :src="courseDataFromParent.background_image" style="cursor: pointer;" @click="$refs.openThisImageDialog.openDialog(courseDataFromParent.background_image)"></v-img>
              </v-col>
              <v-col cols="6">
                <p class="pl-5 subtitle-1">{{courseDataFromParent.description}}</p>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="9" v-if="contentData != ''">
            <!-- <pre>{{contentData}}</pre> -->
             <!-- Text -->
            <!-- <p v-if="contentData.type == 'text'" v-html="contentData.content" class="pl-4 text-block" style="max-width:20%"></p> -->
            <div v-if="contentData.type == 'text'" v-html="contentData.content"></div>
            <!-- rowDivider -->
            <v-divider v-else-if="contentData.type == 'rowDivider'" style="border:1px solid lightgrey;"></v-divider>
            <!-- youtube_video  - Adjust due to sizes -->
            <iframe v-else-if="contentData.type == 'youtube_video'" :src="contentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen'></iframe>
            <!-- file -->
            <iframe v-else-if="contentData.type == 'file'" :src="lessonContent.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen'></iframe>
            <!-- task -->
            <TaskData v-else-if="contentData.type == 'task' && contentData.content != 62" :gettingChapterContentTask="contentData.content"></TaskData> 
            <!-- embededLink -->
            <iframe v-else-if="contentData.type == 'embededLink'" :src="contentData.content" width="90%" style="min-height:400px;" allowFullScreen='allowFullScreen'></iframe>
            <!-- image -->
            <v-img v-else-if="contentData.type == 'image'" contain aspect-ratio="1" :src="contentData.content" style="cursor: pointer;" @click="$refs.openThisImageDialog.openDialog(contentData.content)"></v-img>
            <!-- Learning Scene -->
            <iframe v-else-if="contentData.type == 'learning_scene'" :src="'https://prios360.netlify.app/?' + contentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen' ></iframe>
            <!-- external_learning_content -->
            <iframe v-else-if="contentData.type == 'external_learning_content'" :src="contentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen'></iframe>
            <!-- Files -->
            <div v-else-if="contentData.type='files'" >
              <v-card flat>
                <p class="text-center headline pb-5">{{contentData.content_label}}</p>
                <v-row class="ma-0 pa-0">
                  <v-col cols="12" class="mb-0 pb-0">
                    <v-img contain  max-height="600px" :src="contentData.content_background" @click="$refs.openThisImageDialog.openDialog(contentData.content_background)"></v-img>
                  </v-col>
                  <v-col class="mt-0 pt-0 title" cols="12" v-html="contentData.content_description"></v-col>
                </v-row>
              </v-card>
            </div>
          </v-col>

          <!-- Actual course of sidebar lessons -->
          <v-col cols="9" v-if="lessonContent != ''" style="overflow-x:hidden; height: 80vh">
            <v-card class="ma-0 pa-0 pa-5 flat">
              <div v-for="(lessonContentData, lessonIndex) in lessonContent" :key="lessonIndex">
                <!-- <pre>{{lessonContentData}}</pre> -->
                <!-- Text --> 
                <!-- <p v-if="lessonContentData.type == 'text'" v-html="lessonContentData.content" class="pa-3 pl-4 text-block" style="max-width:200px; word-wrap: break-word;"></p> -->
                <div v-if="lessonContentData.type == 'text'" v-html="lessonContentData.content"></div>
                <!-- rowDivider -->
                <v-divider v-if="lessonContentData.type == 'rowDivider'" style="border:1px solid lightgrey;"></v-divider>
                <!-- youtube_video  - Adjust due to sizes -->
                <iframe v-if="lessonContentData.type == 'youtube_video'" :src="lessonContentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen'></iframe>
                <!-- file -->
                <iframe v-if="lessonContentData.type == 'file'" :src="lessonContentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen'></iframe>
                <!-- task -->
                <TaskData v-if="lessonContentData.type == 'task' && lessonContentData.content != 62" :gettingChapterContentTask="lessonContentData.content"></TaskData> 
                <!-- embededLink -->
                <iframe v-if="lessonContentData.type == 'embededLink'" :src="lessonContentData.content" width="90%" style="min-height:400px;" allowFullScreen='allowFullScreen'></iframe>
                <!-- image -->
                <v-img v-if="lessonContentData.type == 'image' && lessonContentData.content != ''" contain aspect-ratio="3" :src="lessonContentData.content" style="cursor: pointer;" @click="$refs.openThisImageDialog.openDialog(lessonContentData.content)"></v-img>
                <!-- Learning Scene -->
                <iframe v-if="lessonContentData.type == 'learning_scene'" :src="'https://prios360.netlify.app/?' + lessonContentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen' ></iframe>
                <!-- external_learning_content -->
                <iframe v-if="lessonContentData.type == 'external_learning_content'" :src="lessonContentData.content" width="90%" style="min-height:600px;" allowFullScreen='allowFullScreen'></iframe>
                <!-- files -->
               
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- ================= -->
        <!-- ===== Phone ===== -->
        <!-- ================= -->
        <v-row v-else>
          <!-- Alread exists? check.... -->
          <!-- expands -->
          <!-- New window containing the data -->

        </v-row>


    </v-card>
  </v-dialog>
</template>

<script>
import TaskData from "@/components/TrainingModule/TrainingModuleTaskData.vue"
import ImageDialog from "@/components/TrainingModule/TrainingModuleImageDialog.vue"

export default {
  components: {
    TaskData,
    ImageDialog
  },
  data(){
    return{
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      courseDataDialogen: false,
      courseDataFromParent: [],
      chapterData: [],
      lessonData: [],
      lessonContent: [],
      contentData: []

    }
  },

  computed: {
    sortLessonArray: function() {
      function compare(a, b) {
        if (a.sort < b.sort)
          return -1;
        if (a.sort > b.sort)
          return 1;
        return 0;
      }
      return this.chapterData.sort(compare);
    }
  },

  methods:{

    // Open Dialog
    openDialog(item){
      this.resetFunction();
      this.courseDataFromParent = item;
      this.getChaptersOfThisCourse(item.id);
      this.courseDataDialogen = true;
    },

    // Close Dialog
    closeDialog(){
      this.resetFunction();
      this.courseDataDialogen = false;
    },

    // Reset function
    resetFunction(){
      this.courseDataFromParent = [];
      // this.chapterData = [],
      // this.lessonData = [],
      this.lessonContent = [],
      this.contentData = []

    },
    
    // Get all the chapters within the course - using parent course id
    getChaptersOfThisCourse(courseID){
      this.$http.get("https://app.followup.prios.no/api/courses/collection_content?mode=getcollectioncontent&courses_collection_id=" + courseID,{headers:{Tempaccess:this.accessKey}})
      .then(response =>{
        this.chapterData = response.data;
      })
    },

    // Get all the lessons within a chapter for the sidemenu
    getAllLessonsInChapter(lessonID){
      // this.resetFunction();
      this.$http.get("https://app.followup.prios.no/api/task_library/lessons?mode=getchapters&courses_id=" + lessonID,{headers:{Tempaccess:this.accessKey}}).then(response => {
        this.lessonData = response.data;
      })
    },

    // * Get Content of lesson clicked in the sidemenu
    getLessonContent(lessonContentID){
      this.resetFunction();
      // console.log("ID i get are", lessonContentID);
      this.$http.get("https://app.followup.prios.no/api/task_library/lesson_chapters_content?chapter_id=" + lessonContentID,{headers:{Tempaccess:this.accessKey}}).then(response =>{
        this.lessonContent = response.data;
        // console.log("content of clicked lesson are", response.data);
      })
    },


    // * Get clicked solo content
    getChapterContent(chapterContent){
      this.resetFunction();
      // console.log("Content", chapterContent);
      this.contentData = chapterContent;
    },

  }
}
</script>

<style scoped>
  .text-block { white-space: pre;}
</style>