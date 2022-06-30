<template>
  <div class="homePageWidth">
    <v-row>
      <!-- Cards -->
      <v-col cols="12" class="mt-10"></v-col>
      <v-col cols="12">
        <p class="text-center title">Resources</p>
        <!-- <p>{{resourceTemplate}}</p> -->
      </v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12">
        <v-row>
          <v-col v-for="(item, index) in resourceFolders" :Key="index" cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
            <v-card @click="displayResource(item.template)">
              <p v-if="item.title == 'Video' || item.title == 'Video'" class="text-center title pt-10 pb-10">{{ $t('resources.video') }}</p>
              <p v-else-if="item.title == 'Files' || item.title == 'Filer'" class="text-center title pt-10 pb-10">{{ $t('resources.files') }}</p>
              <p v-else-if="item.title == 'Courses' || item.title == 'Kurs'" class="text-center title pt-10 pb-10">{{ $t('resources.courses') }}</p>
              <p v-else-if="item.title == 'Podcast' || item.title == 'Podcast'" class="text-center title pt-10 pb-10">{{ $t('resources.podcast') }}</p>
              <p v-else-if="item.title == 'Sound' || item.title == 'Lyd'" class="text-center title pt-10 pb-10">{{ $t('resources.sound') }}</p>
              <p v-else-if="item.title == 'Other' || item.title == 'Annet'" class="text-center title pt-10 pb-10">{{ $t('resources.other') }}</p>
              <p v-else>...</p>
              <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;" :style="`background-color:${colorArr[index]}`"></v-divider>
              <v-col cols="12" class="ma-0 pa-0" style="padding-top: 0.1px !important;"></v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mt-10"></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
      </v-col>

      <!-- Resource Content -->
      <v-col cols="12" class="pt-5 mb-15">
        <v-card flat>
          <v-row>
            <!-- Default -->
            <template v-if="resourceTemplate == 0">
              <v-col cols="12">
                <p class="text-center title">HOME</p>
              </v-col>
            </template>

            <!-- No content added yet -->
            <template v-else-if="resourceContent == ''">
              <v-col cols="12" xl="7" lg="7" md="7" sm="12" xs="12">
                <p class="text-end title">Sorry no content added yet</p>
              </v-col>
               <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" class="d-flex align-end flex-column">
                <v-btn class="mr-5" @click="closeTheResourceBox()">X</v-btn>
              </v-col>
            </template>

            <!-- Display Content -->
            <template v-else-if="resourceContent">
              <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
              <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12" class="pb-0">
                <p class=" title">Resource Content</p>
              </v-col>
               <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" class="d-flex align-end flex-column">
                <v-btn class="mr-5" @click="closeTheResourceBox()">X</v-btn>
              </v-col>
              <v-col cols="12" class="pt-0"></v-col>
              <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-for="(resources, resourceIndex) in resourceContent" :key="resourceIndex">
                <!-- <pre>{{resource}}</pre> -->
                <v-card height="100%" flat>
                
                  <!-- Media above title, sort by type -->
                  <v-divider></v-divider>
                  <p class="title text-center">{{resources.title}}</p>
                  <!-- {{ $t('resource.other') }} -->
                  <v-divider></v-divider>
                  <!-- Languages -->
                  <v-row>
                    <v-col cols="12" v-for="(language, languageIndex) in resources.languages" :Key="languageIndex" class="pb-0 pt-0">
                      <v-card  v-if="language.link" height="100%" @click="test(language.link)">
                        <v-divider style="color:hotpink"></v-divider>
                        <!-- <pre>{{language}}</pre> -->
                        <v-row>
                          <v-col cols="1" class="pt-7 ml-5">
                            <v-img v-if="language.language == 'English'" src="@/assets/flags/england.png" alt="Norwegian Flag" max-height="30" max-width="30" contain></v-img>
                            <v-img v-if="language.language == 'Italian'" src="@/assets/flags/italy.png" alt="Norwegian Flag" max-height="25" max-width="25" contain class="ml-1"></v-img>
                            <v-img v-if="language.language == 'Norwegian'" src="@/assets/flags/norway.png" alt="Norwegian Flag" min-height="25" min-width="25" max-height="25" max-width="25" contain class="ml-1"></v-img>
                            <v-img v-if="language.language == 'Danish'" src="@/assets/flags/denmark.png" alt="Norwegian Flag" max-height="25" max-width="25" contain class="ml-1"></v-img>
                          </v-col>
                          <v-col class="title pt-7">
                            <p>{{language.language}}</p>
                          </v-col>
                        </v-row>
                          <v-divider></v-divider>
                      </v-card>
                    </v-col>
                  </v-row>
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
export default {
  data(){
    return {
      colorArr:[ "#205072", "#329D9C", "#D83636", "#DD9A30", "#205072", "#329D9C" ],
      resourceFolders:[
        { title: this.$t('resources.video'), colour: "", image: "", description: "", template: 1 },
        { title: this.$t('resources.files'), colour: "", image: "", description: "", template: 2 },
        { title: this.$t('resources.courses'), colour: "", image: "", description: "", template: 3 },
        { title: this.$i18n.t('resources.podcast'), colour: "", image: "", description: "", template: 4 },
        { title: this.$i18n.t('resources.sound'), colour: "", image: "", description: "", template: 5 },
        { title: this.$i18n.t('resources.other'), colour: "", image: "", description: "", template: 6 }
      ],
      /* Easy way to display the content
      
      */
      resourceTemplate: 0,
      resourceContent: [],
      

    }
  },
  methods:{
    // Close the Bottom Box
    closeTheResourceBox(){
      this.resourceTemplate = 0;
      this.resourceContent = [];
    },

    // Display the specific Resource Content
    displayResource(templateID){
      this.resourceTemplate = templateID;
      if(this.resourceTemplate == 1){
        this.resourceContent = [];
      } else {
        this.resourceContent = [];
      }
    },
    test(link){
      window.open(link);
    }
  }
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}

.newsCardDividerPositioning {
  margin-left:1%; 
  margin-bottom:2%;
}

</style>