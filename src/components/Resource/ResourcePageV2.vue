<template>
  <div class="homePageWidth">
    <v-row>
      <v-col cols="12" class="mt-10"></v-col>
      <v-col cols="12">
        <p class="text-center title">Resources</p>
        <!-- <pre>{{categoryContent}}</pre> -->
      </v-col>
      <v-col cols="12">
        <p>Select Language</p>
        <p>{{countrySelected}}</p>
        <v-row>
          <v-col cols="auto" class="ma-0 pa-0 my-auto">
            <v-img @click="viewCountry('null')" src="/flags/norway.png" alt="Norwegian Flag" max-height="38" max-width="60" contain style="cursor: pointer;"></v-img>
          </v-col>
          <v-col cols="auto" class="ma-0 pa-0 my-auto ml-4">
            <v-img @click="viewCountry('England')" src="/flags/england.png" alt="English Flag" max-height="100" width="55" contain style="cursor: pointer;"></v-img>
          </v-col>
          <v-col cols="auto" class="ma-0 pa-0 my-auto ml-4">
            <v-img @click="viewCountry('Hungary')" src="/flags/hungary.png" alt="Hungary Flag" max-height="100" width="62" contain style="cursor: pointer;"></v-img>
          </v-col>
          <v-col cols="auto" class="ma-0 pa-0 my-auto ml-4">
            <v-img @click="viewCountry('Slovakia')" src="/flags/Slovakia.png" alt="Slovakia Flag" max-height="100" width="45" contain style="cursor: pointer;"></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12">
        <v-row class="ma-0 pa-0">
          <v-col v-for="(category, index) in uniqueCategories" :key="index" cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
            <!-- <pre>{{index}}</pre> -->
            <!-- Render the category card here -->
            <v-card v-if="category !== null" @click="displayAllContentOfCategory(category)">
              <p class="text-center title pt-10 pb-10">{{ category }}</p>
              <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;" :style="`background-color:${colorArr[index]}`"></v-divider>
              <v-col cols="12" class="ma-0 pa-0" style="padding-top: 0.1px !important;"></v-col>
            </v-card>

            <!-- Display all the things which got no category -->
            <v-card v-if="category == null" @click="displayAllContentOfCategory(null)">
              <p class="text-center title pt-10 pb-10"> Unsorted </p>
              <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;" :style="`background-color:${colorArr[index]}`"></v-divider>
              <v-col cols="12" class="ma-0 pa-0" style="padding-top: 0.1px !important;"></v-col>
            </v-card>
            
          </v-col>
          <!-- Creating space -->
          <v-col cols="12">
            <v-divider class="mt-10"></v-divider>
            <v-divider></v-divider>
            <v-divider></v-divider>
          </v-col>
          <!-- Display the Content of said Category, then displayed accordingly to type -->
          <v-col v-for="(resource, resourceIndex) in categoryContent" :key="resourceIndex" cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-if="countrySelected == 'null'">
            <!-- <pre>{{resource}}</pre> -->
            <!-- <p>{{resourceIndex}}</p> -->

            <!-- External Content || files || video -->
            <v-hover v-slot:default="{ hover }">
              <v-card v-if="resource.type == 'external_content' || resource.type == 'files' || resource.type == 'video' || resource.type == 'youtube_video'" :href="resource.content" target="_blank" class="pa-5" :elevation="hover ? 12 : 2">
                <v-row>
                  <p style="font-size: 12px; color: grey;">{{resource.type}}</p>
                  <p style="font-size: 12px; color: grey;">{{resource.id}}</p>
                  <!-- Image -->
                  <v-col cols="12" class="pb-0" v-if="resource.thumbnail_url">
                    <v-img :src="resource.thumbnail_url" height="300" width="450" contain></v-img>
                  </v-col>
                  <v-col cols="12" class="pb-0">
                    <!-- Title -->
                    <p class="resourceCardTitle" style="font-size: 16px; height:20px;" v-if="$vuetify.breakpoint.width <= 959">{{resource.title}}</p>
                    <p class="resourceCardTitle" style="font-size: 14px; height:80px;" v-else-if="$vuetify.breakpoint.width <= 1300 && $vuetify.breakpoint.width >= 960">{{resource.title}}</p>
                    <p class="resourceCardTitle" style="font-size: 18px; height:50px;" v-else>{{resource.title}}</p>
                    <!-- Description -->
                    <p class="resourceDescription" style="height:90px">{{resource.description}}</p>
                  </v-col>
                  <v-col cols="12" class="pt-0 mt-0 pb-0">
                    <v-card-actions class="pt-0 mt-0">
                      <p class="rssCardButton mr-2 pt-3" v-if="resource.type == 'external_content'">Read Article</p>
                      <p class="rssCardButton mr-2 pt-3" v-if="resource.type == 'files'">Open File</p>
                      <p class="rssCardButton mr-2 pt-3" v-if="resource.type == 'video'">See Video</p>
                      <v-icon class="rssCardButtonArrow">mdi-arrow-right</v-icon>
                    </v-card-actions>
                  </v-col>
                </v-row>
                <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;"></v-divider>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      // Array of colors for the categories
      colorArr:[ "#205072", "#329D9C", "#D83636", "#DD9A30", "#205072", "#329D9C" ],
      // Content from the API
      resourceContent: [],
      // Content to display based on category selected
      categoryContent: [],
      countrySelected: ""
    }
  },
  mounted(){
    this.getAllResources();
  },

  computed: {
    // uniqueCategories() {
    //   // Create a Set to store unique categories
    //   const uniqueCategories = new Set();
    //   // Loop through the resourceContent array
    //   for (const item of this.resourceContent) {
    //     // Get the category value
    //     const category = item.category;
    //     // Check if the category is null or not already in uniqueCategories
    //     if (category === null || !uniqueCategories.has(category)) {
    //       // If it's null or not a duplicate, add it to uniqueCategories
    //       uniqueCategories.add(category);
    //     }
    //   }
    //   // Convert the Set back to an array and include 'null' as a category
    //   const uniqueCategoriesArray = Array.from(uniqueCategories);
    //   if (!uniqueCategoriesArray.includes(null)) {
    //     uniqueCategoriesArray.push(null);
    //   }
    //   // Return the array of unique categories
    //   return uniqueCategoriesArray;
    // },

    uniqueCategories() {
      // Create a Set to store unique categories
      const uniqueCategories = new Set();

      // Loop through the resourceContent array
      for (const item of this.resourceContent) {
        // Get the category value
        const category = item.category;

        // Check if the category is not null and not already in uniqueCategories
        if (category !== null && !uniqueCategories.has(category)) {
          // If it's not null and not a duplicate, add it to uniqueCategories
          uniqueCategories.add(category);
        }
      }

      // Convert the Set back to an array
      const uniqueCategoriesArray = Array.from(uniqueCategories);

      // Return the array of unique categories
      return uniqueCategoriesArray;
    },
  },

  methods: {
    // Get all the resources
    // 108 is the tenant_id for the resources
    getAllResources(){
      this.$http.get(`https://app.followup.prios.no/api/resource_management/content?tenant_id=107`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
        this.resourceContent = response.data;
      })
      this.getCountry();
    },
    // Based on the category selected, display the content
    displayAllContentOfCategory(categoryGiven){
      if(categoryGiven == null){
        this.categoryContent = this.resourceContent.filter((item) => item.category === null);
      } else {
        this.categoryContent = this.resourceContent.filter((item) => item.category === categoryGiven);
      }
    },

    // Based on flag clicked, save country to local storage
    viewCountry(country){
      localStorage.setItem('country', country);
      // this.filterCountry(country);
      this.getCountry();
    },

    // Filter the category content based on country selected
    // filterCountry(country){
    //   if(country == null){
    //     this.categoryContent = this.resourceContent.filter((item) => item.category === null);
    //   } else {
    //     this.categoryContent = this.resourceContent.filter((item) => item.category === this.category && item.country === country);
    //   }
    // },

    // Get country from local storage
    getCountry(){
      this.countrySelected = localStorage.getItem('country');
    },
  }
}
</script>

<style scoped>

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
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}
</style>
