<template>
  <v-dialog v-model="courseContentPhoneDialog" fullscreen persistent>
    <ImageDialog ref="openThisImageDialog"></ImageDialog>
    <v-card>
      <!-- Navbar with close -->
      <v-app-bar clipped-left style="top: 0; position: sticky; z-index: 2;" color="primaryColor" :extension-height="8">
        <header>
          <span>{{ courseHeader }}</span>
        </header>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
      </v-app-bar>


      <!-- Parent are of type Files - Print in directly -->
      <div v-if="isTypeFiles == true">
        <v-card>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0">
              <p class="text-center headline pt-3">{{courseContent.content_label}}</p>
            </v-col>
            <v-col cols="12">
              <v-img contain aspect-ratio="1" :src="courseContent.content" @click="$refs.openThisImageDialog.openDialog(courseContent.content)"></v-img>
            </v-col>
            <v-col cols="12">
              <p v-html="courseContent.content_description" class="pa-3 pl-4 text-block" ></p>
            </v-col>
          </v-row>
        </v-card>
      </div>

      <!-- Parent are of type Lessons - Fetch content through Axios call, then display based upon type -->
      <div v-else-if="isTypeLesson == true">
        <v-card>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0">
              <v-card flat v-for="(lesson, lessonIndex) in courseContent" :key="lessonIndex">
                <!-- Text -->
                <div v-if="lesson.type == 'text'" v-html="lesson.content" class="pa-3"></div>
                <!-- Image -->
                <v-img v-else-if="lesson.type == 'image'" contain aspect-ratio="2" :src="lesson.content" @click="$refs.openThisImageDialog.openDialog(lesson.content)"></v-img>
                <!-- Task - Need Fix/Rewrite - props given are correct, but never read??-->
                <div v-else-if="lesson.type == 'task'">
                  <!-- <p>Task</p> -->
                  <TaskData :gettingChapterContentTask="lesson.content && courseContent.content != 62"></TaskData>
                  <pre>{{lesson}}</pre>
                </div>
                <!-- Embedded Link -->
                <iframe v-else-if="lesson.type == 'embededLink'" :src="lesson.content" width="99%" style="min-height:400px;"></iframe> 
                <!-- Youtube -->
                <iframe v-else-if="lesson.type == 'youtube_video'" :src="lesson.content" width="99%" style="min-height:400px;"></iframe>
                <!-- File -->
                <iframe v-else-if="lesson.type == 'file'" :src="lesson.content" width="99%" style="min-height:400px;"></iframe>
                <!-- Learning Scene -->
                <iframe v-else-if="lesson.type == 'learning_scene'" :src="'https://prios360.netlify.app/?' + lesson.content" style="min-height:400px;" width="100%"></iframe>
                <!-- Row Divider -->
                <v-divider v-else-if="lesson.type == 'rowDivider'" style="border:1px solid lightgrey;"></v-divider>
                <!-- External Learning Content -->
                <iframe v-else-if="lesson.type == 'external_learning_content'" :src="lesson.content" width="99%" style="min-height:400px;"></iframe>
                <p v-else>Unknown type: {{lesson}}</p>
              </v-card>
            </v-col>
          </v-row>
          <!-- <pre>{{courseContent}}</pre> -->
        </v-card>
      </div>

      <!-- Anything else - Need to run a for loop, to display correct data -->
      <div v-else-if="isTypeMixed == true">
        <v-card>
          <!-- Text -->
          <div v-if="courseContent.type == 'text'" v-html="courseContent.content" class="pa-3"></div>
          <!-- Image -->
          <v-img v-else-if="courseContent.type == 'image'" contain aspect-ratio="2" :src="courseContent.content" @click="$refs.openThisImageDialog.openDialog(courseContent.content)"></v-img>
          <!-- Task Works here, but not on lesson? find the differance. -->
          <div v-else-if="courseContent.type == 'task' && courseContent.content != 62">
            <!-- <p>Task</p> -->
            <TaskData :gettingChapterContentTask="courseContent.content"></TaskData> 
          </div>
          <!-- Embedded Link -->
          <iframe v-else-if="courseContent.type == 'embededLink'" :src="courseContent.content" width="99%" style="min-height:400px;"></iframe> 
          <!-- Youtube -->
          <iframe v-else-if="courseContent.type == 'youtube_video'" :src="courseContent.content" width="99%" style="min-height:400px;"></iframe>
          <!-- File -->
          <iframe v-else-if="courseContent.type == 'file'" :src="courseContent.content" width="99%" style="min-height:400px;"></iframe>
          <!-- Learning Scene -->
          <iframe v-else-if="courseContent.type == 'learning_scene'" :src="'https://prios360.netlify.app/?' + courseContent.content" style="min-height:400px;" width="100%"></iframe>
          <!-- Row Divider -->
          <v-divider v-else-if="courseContent.type == 'rowDivider'" style="border:1px solid lightgrey;"></v-divider>
          <!-- External Learning Content -->
          <iframe v-else-if="courseContent.type == 'external_learning_content'" :src="courseContent.content" width="99%" style="min-height:400px;"></iframe>
          <p v-else>Unknown type: {{courseContent}}</p>
          <!-- <pre>{{courseContent}}</pre> -->
        </v-card>
      </div>

      <div v-else>
        <v-card>
          <p>Content not found.</p>
        </v-card>
      </div>

    </v-card>
  </v-dialog>
</template>

<script>
import TaskData from "@/components/TrainingModule/TrainingModuleTaskData.vue"
import ImageDialog from "@/components/TrainingModule/TrainingModuleImageDialog.vue"

export default {
  components:{
    TaskData,
    ImageDialog
  },
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      courseContentPhoneDialog: false,
      // * Easier define the check of things
      isTypeFiles: false,  // Data ready to be implemented
      isTypeLesson: false, // Get data through ID
      isTypeMixed: false,  // Standalone - Array
      CourseDataFromParent: [], // Data gotten through props
      courseContent: [], // Finished data to implement into this file
      courseHeader: ""




      // courseContentLessonData: [],
      // courseContentDataFromParent: [],
    }
  },
  methods:{

    // * Standalone object array to iterate in
    openDialog(courseStandardContent, parentData){
      this.resetFunction();
      this.courseContentPhoneDialog = true;
      this.isTypeMixed = true;
      this.courseContent = courseStandardContent;
      // console.log("Data from the parent are [courseStandardContent]: ", courseStandardContent);
      // console.log("ParentData", parentData);
      this.courseHeader = parentData;
    },

    // * If lesson - get content through id
    openLessonDialog(courseLessonContent, parentData){
      this.resetFunction();
      this.courseContentPhoneDialog = true;
      this.isTypeLesson = true;
      this.CourseDataFromParent = courseLessonContent;
      this.fetchCourseLessonData(courseLessonContent.id);
      // console.log("Data from the parent are [courseLessonContent]: ", courseLessonContent);
      // console.log("ParentData", parentData);
      this.courseHeader = parentData;
    },

    // * If Files just iterate it in.
    openFilesDialog(courseFilesContent, parentData){
      this.resetFunction();
      this.courseContentPhoneDialog = true;
      this.isTypeFiles = true;
      this.courseContent = courseFilesContent;
      // console.log("Data from the parent are [courseFilesContent]: ", courseFilesContent);
      // console.log("ParentData", parentData);
      this.courseHeader = parentData;
    },

    // * Close Dialog
    closeDialog(){
      this.resetFunction();
      this.courseContentPhoneDialog = false;
    },

    // * Reset Function
    resetFunction(){
      this.isTypeLesson = false;
      this.isTypeFiles = false;
      this.isTypeMixed = false;
      this.CourseDataFromParent = [];
      this.courseContent = [];
      this.courseHeader = "";
      

      // this.courseContentDataFromParent = [];
      // this.courseContentLessonData = [];
    },

    // * Fetch Course Content of a Lesson
    fetchCourseLessonData(courseContentID){
      this.$http.get("https://app.followup.prios.no/api/task_library/lesson_chapters_content?chapter_id=" + courseContentID,{headers:{Tempaccess:this.accessKey}}).then(response =>{
        this.courseContent = response.data;
      })
    }
  }
}
</script>