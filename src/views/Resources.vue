<template>
  <div class="homePageWidth">
    <v-row>
      <!-- Cards -->
      <v-col cols="12" class="mt-10"></v-col>
      <v-col cols="12">
        <p class="text-center title">Resources</p>
      </v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12">
        <v-row>
          <v-col v-for="(item, index) in resourceFolders" :Key="index" cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
            <v-card @click="displayResource(item.template)">
              <p v-if="item.title == 'Video' || item.title == 'Video'" class="text-center title pt-10 pb-10">{{ $t('resources.video') }}</p>
              <p v-else-if="item.title == 'Files' || item.title == 'Filer'" class="text-center title pt-10 pb-10">{{ $t('resources.files') }}</p>
              <!-- <p v-else-if="item.title == 'Courses' || item.title == 'Kurs'" class="text-center title pt-10 pb-10">{{ $t('resources.courses') }}</p>
              <p v-else-if="item.title == 'Podcast' || item.title == 'Podcast'" class="text-center title pt-10 pb-10">{{ $t('resources.podcast') }}</p> -->
              <!-- <p v-else-if="item.title == 'Other' || item.title == 'Lyd'" class="text-center title pt-10 pb-10">Other</p> -->
              <p v-else-if="item.title == 'External Links' || item.title == 'Annet'" class="text-center title pt-10 pb-10">External Links</p>
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
                <p class=" title" v-if="resourceTemplate == 1">Video</p>
                <p class=" title" v-else-if="resourceTemplate == 2">Files</p>
                <!-- <p class=" title" v-else-if="resourceTemplate == 3">Courses</p>
                <p class=" title" v-else-if="resourceTemplate == 4">Podcast</p> -->
                <!-- <p class=" title" v-else-if="resourceTemplate == 5">Other</p> -->
                <p class=" title" v-else-if="resourceTemplate == 6">External Link</p>
              </v-col>
              <v-col cols="12" class="pt-0"></v-col>
              <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
              <template v-for="(resources, resourceIndex) in resourceContent">

                <!-- Video -->
                <template v-if="resourceTemplate == 1 & resources.type == 'youtube_video'">
                  <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" :key="resourceIndex">
                    <v-hover v-slot:default="{ hover }">
                      <v-card class="pa-5 pb-1" :elevation="hover ? 12 : 2" :href="resources.content" target="_blank" height="100%">
                        <v-row>
                          <!-- Flags -->
                          <v-col cols="12" class="ma-0 pa-0" style="height:40px;">
                            <v-card-actions class="ma-0 pa-0">
                              <v-spacer></v-spacer>
                              <v-img v-if="resources.language == 'Norsk'" src="/flags/norway.png" alt="Norwegian Flag" max-height="38" max-width="60" contain class="mb-1"></v-img>
                              <v-img v-else-if="resources.language == 'English'" src="/flags/england.png" alt="English Flag" max-height="38" max-width="60" contain class="mb-1"></v-img>
                            </v-card-actions>
                          </v-col>
                          <!-- Image -->
                          <v-col cols="12" class="pb-0">
                            <v-img :src="resources.thumbnail_url" height="300" width="450" contain></v-img>
                          </v-col>
                          <v-col cols="12">
                            <!-- Title -->
                            <p class="resourceCardTitle" style="font-size: 16px; height:40px;" v-if="$vuetify.breakpoint.width <= 959">{{resources.title}}</p>
                            <p class="resourceCardTitle" style="font-size: 16px; height:80px;" v-else-if="$vuetify.breakpoint.width <= 1300 && $vuetify.breakpoint.width >= 960">{{resources.title}}</p>
                            <p class="resourceCardTitle" style="font-size: 18px; height:80px;" v-else>{{resources.title}}</p>
                            <!-- Description -->
                            <p class="resourceDescription" style="font-size: 16px; height:100px;">{{resources.description}}</p>
                          </v-col>
                          <v-col cols="12" class="pt-0 mt-0 pb-0">
                            <v-card-actions class="pt-0 mt-0">
                              <p class="rssCardButton mr-2 pt-3">See video</p>
                              <v-icon class="rssCardButtonArrow">mdi-arrow-right</v-icon>
                            </v-card-actions>
                          </v-col>
                        </v-row>
                        <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;"></v-divider>
                      </v-card>
                    </v-hover>
                  </v-col>
                </template>

                <!-- Files -->
                <template v-else-if="resourceTemplate == 2 & resources.type == 'files'">
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" :key="resourceIndex">
                    <pre>{{resources}}</pre>
                  </v-col>
                </template>

                <!-- Courses -->
                <template v-else-if="resourceTemplate == 3 & resources.type == 'courses'">
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" :key="resourceIndex">
                    <pre>{{resources}}</pre>
                  </v-col>
                </template>

                <!-- Podcast -->
                <template v-else-if="resourceTemplate == 4 & resources.type == 'podcast'">
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" :key="resourceIndex">
                    <pre>{{resources}}</pre>
                  </v-col>
                </template>

                <!-- Sound -->
                <template v-else-if="resourceTemplate == 5 & resources.type == 'sound'">
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" :key="resourceIndex">
                    <pre>{{resources}}</pre>
                  </v-col>
                </template>

                <!-- Other -->
                <template v-else-if="resourceTemplate == 6 & resources.type == 'external_content'">
                  <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" :key="resourceIndex">
                    <v-hover v-slot:default="{ hover }">
                      <v-card class="pa-5 pb-1" :elevation="hover ? 12 : 2" :href="resources.content" target="_blank">
                        <v-row>
                          <!-- Image comes, and Logo comes here when created (make a new col) -->
                          <v-col cols="12" class="ma-0 pa-0" style="height:40px;">
                            <v-card-actions class="ma-0 pa-0">
                              <v-spacer></v-spacer>
                              <v-img v-if="resources.language == 'Norsk'" src="/flags/norway.png" alt="Norwegian Flag" max-height="38" max-width="60" contain class="mb-1"></v-img>
                              <v-img v-else-if="resources.language == 'English'" src="/flags/england.png" alt="English Flag" max-height="38" max-width="60" contain class="mb-1"></v-img>
                            </v-card-actions>
                          </v-col>
                          <v-col cols="12" class="pb-0">
                            <!-- Title -->
                            <p class="resourceCardTitle" style="font-size: 16px; height:20px;" v-if="$vuetify.breakpoint.width <= 959">{{resources.title}}</p>
                            <p class="resourceCardTitle" style="font-size: 14px; height:80px;" v-else-if="$vuetify.breakpoint.width <= 1300 && $vuetify.breakpoint.width >= 960">{{resources.title}}</p>
                            <p class="resourceCardTitle" style="font-size: 18px; height:90px;" v-else>{{resources.title}}</p>
                            <!-- Description -->
                            <p class="resourceDescription" style="height:90px">{{resources.description}}</p>
                          </v-col>
                          <v-col cols="12" class="pt-0 mt-0 pb-0">
                            <v-card-actions class="pt-0 mt-0">
                              <p class="rssCardButton mr-2 pt-3">Les Artikkel</p>
                              <v-icon class="rssCardButtonArrow">mdi-arrow-right</v-icon>
                            </v-card-actions>
                          </v-col>
                        </v-row>
                        <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;"></v-divider>
                      </v-card>
                    </v-hover>
                  </v-col>
                </template>
              </template>
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
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      colorArr:[ "#205072", "#329D9C", "#D83636", "#DD9A30", "#205072", "#329D9C" ],
      resourceFolders:[
        { title: this.$t('resources.video'), colour: "", image: "", description: "", template: 1 },
        { title: this.$t('resources.files'), colour: "", image: "", description: "", template: 2 },
        // { title: this.$t('resources.courses'), colour: "", image: "", description: "", template: 3 },
        // { title: this.$i18n.t('resources.podcast'), colour: "", image: "", description: "", template: 4 },
        // { title: "Other", colour: "", image: "", description: "", template: 5 },
        { title: "External Links", colour: "", image: "", description: "", template: 6 }
      ],
      /* Easy way to display the content
      
      */
      resourceTemplate: 0,
      resourceContent: [],
      

    }
  },
  mounted() {
    // this.getAllResources();
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
      this.getAllResources();
    },
    getAllResources(){
      this.$http.get(`https://app.followup.prios.no/api/resource_management/content?tenant_id=108`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
        this.resourceContent = response.data;
      })
    },
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

.resourceCardTitle {
  font-size: 20px;
  font-weight: bold;
}

.resourceDescription {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5; 
  -webkit-box-orient: vertical;
}

.resourcesLanguage {
  font-size: 12px;
}

.rssCardButton {
  font-family: 'Lato', sans-serif;
  font-weight: regular;
  font-size: 18px;
  text-align: left;
  color: #205072;
  opacity: 1;
  letter-spacing: 0px;
  text-decoration: underline;
}

.rssCardButtonArrow {
  color: #205072;
  opacity: 1;
}

</style>