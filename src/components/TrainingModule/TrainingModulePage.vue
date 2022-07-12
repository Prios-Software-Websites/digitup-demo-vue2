<template>
  <div class="homePageWidth">
    <MainCourseDataDialog ref="openThisCourseDataDialog"></MainCourseDataDialog>
    <MainTrainingDialogPhone ref="openThisCourseDataDialogPhone"></MainTrainingDialogPhone>
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <p class="trainingChapterTitle">Training Modules</p>
        <p class="trainingChapterDescription">
          Our partnership is still working on the curriculum, resources center and the training materials.  <br>
          Once they are available, you will be able to find them here.
          <br>
          Below you will find an example of one such module.
        </p>
      </v-col>

      <v-col cols="12">
        <v-card flat>
          <v-row>
            <template v-for="(courseCollection, index) in filteredCategories" >
              <v-col :key="index" v-if="courseCollection.id == 25" cols="12" lg="3" md="3" class="mt-3">
                <v-card v-if="$vuetify.breakpoint.mdAndDown" height="100%" @click="$refs.openThisCourseDataDialogPhone.openDialog(courseCollection)">
                  <v-img v-if="courseCollection.background_image" :src="courseCollection.background_image"></v-img>
                  <p class="pa-2 pb-0">{{courseCollection.name}}</p>
                  <p class="pa-2 pt-0">{{courseCollection.description}}</p>
                </v-card> 
                <v-card v-else height="100%" @click="$refs.openThisCourseDataDialog.openDialog(courseCollection)">
                  <v-img v-if="courseCollection.background_image" :src="courseCollection.background_image"></v-img>
                  <p class="pa-2 pb-0">{{courseCollection.name}}</p>
                  <p class="pa-2 pt-0">{{courseCollection.description}}</p>
                </v-card>
              </v-col>
              
            </template> 
          </v-row>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import MainCourseDataDialog from "@/components/TrainingModule/TrainingModuleDialog.vue"
import MainTrainingDialogPhone from "@/components/TrainingModule/TrainingModuleDialogPhone.vue"
export default {
  name: 'Training-Modules',
  components: {
    MainCourseDataDialog,
    MainTrainingDialogPhone
  },
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      courseCollections:[],
    }
  },
  mounted(){
    this.getAllCourses();
  },
  methods:{
    getAllCourses(){
      this.courseCollections = [];
      this.$http.get(`https://app.followup.prios.no/api/courses/collection?tenant_id=98`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
        this.courseCollections = response.data;
      })
    },
    changeCourseLanguage(languageID){
      this.courseLanguage = languageID;
    }
  },
  computed: {
    // Fix to remove any non public courses from the array list.
    filteredCategories() {
      return this.courseCollections.filter((isPublic) => {
        return (isPublic.public == 1)
      })
    },
  },
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}

.trainingChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.trainingChapterDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}

</style>