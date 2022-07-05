<template>
  <div class="mb-10">
    <RssModuleDialog ref="openRssDialog"></RssModuleDialog>
    <v-row>
      <v-col cols="12" class="pt-15 mt-15 pb-0">
        <p class="rssHeadlinerTitle text-center">External News</p>
      </v-col>
      <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;"></v-divider>
      <!-- Display RSS cards -->
      <v-col cols="12" v-for="(item, index) in rssEntryContent" :key="index">
        
        <v-row>
          <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-for="(rssCard, rssCardIndex) in item.items" :key="rssCardIndex">
            <v-hover v-slot:default="{ hover }">
              <!-- <v-card class="pa-5 pb-1" :elevation="hover ? 12 : 2" @click="$refs.openRssDialog.openDialog(rssCard)"> -->
              <v-card class="pa-5 pb-1" :elevation="hover ? 12 : 2" :href="rssCard.link" target="_blank">
                <v-row>
                  <!-- Image comes, and Logo comes here when created (make a new col) -->
                  <v-col cols="12" style="height:80px;" class="mb-0 ml-2 pb-0">
                    <p class="rssCardTitle">{{rssCard.title[0]}}</p>
                  </v-col>
                  <v-col style="height:80px;" class="mb-0 ml-2 pb-0 mt-3">
                    <p class="rssDescriptionPre" v-html="rssCard.description[0]"></p>
                  </v-col>
                  <v-col cols="12" class="pt-0 mt-0 pb-0">
                    <v-card-actions class="pt-0 mt-5">
                      <p class="rssCardButton mr-2 pt-3">Read article</p>
                      <v-icon class="rssCardButtonArrow">mdi-arrow-right</v-icon>
                    </v-card-actions>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <p style="font-size: 12px">{{item.link[0]}}</p>
                    <!-- <pre>{{item}}</pre> -->
                  </v-col>
                </v-row>
                <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;" :style="`background-color:${colorArr[rssCardIndex]}`"></v-divider>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import  RssModuleDialog from "@/components/rss/rssModuleDialog.vue"
export default {
  components: {
    RssModuleDialog
  },
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      rssEntryContent: [],
      colorArr:[
        "#0E3196",
        "#249ebe",
        "#FF7E26",
        "#FFD43D"
      ],
    }
  },
  mounted(){
    this.getAllRSSEntries();
  },
  methods: {

    // #1. Get ALL entries of type RSS and pass them to the iterator
    getAllRSSEntries(){
      this.$http.get(`https://app.followup.prios.no/api/resource_management/content?tenant_id=108`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
        let allRssEntriesFromFollowup = response.data;
        this.getRssSources(allRssEntriesFromFollowup);
      })
    },

    // #2. Get the entries from Follow-Up and run a for loop getting the Source URL to each RSS
    getRssSources(rssEntries){
      for(let index = 0; index < rssEntries.length; index++){
        this.getRssContent(rssEntries[index].content);  
      }
    },

    /* #3. Get the actual data, to implement into the html
      - Run a query utilising the parameter from the parent function.
        - Get all RSS Content of each RSS feed.
        - If successful, push to the Main RSS Array, as a new entry.
        - Else, display custom error message.
    */
    getRssContent(rssSource){
      this.$http.get(`https://app.followup.prios.no/api/resource_management/content?mode=getrssdata&url=${rssSource}&rss_count=3`,{headers:{Tempaccess:this.accessKey}}).then((response) => {
        this.rssEntryContent.push(response.data);
      }).catch(function (error) {
        console.log("%cError", "color: red; display: block; width: 100%; font-size:36px; font-weight: bold; border:solid black 2px; padding:5px; background-color: lightblue;",error.toJSON());
      });
    },

  }
}
</script>

<style scoped>
.mainTitle{
  font-weight: bold; 
}

/* a {
  color: hotpink;
} */
.rssCardTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #434343;
  letter-spacing: 0px;
  text-align: left;
}
.rssDescriptionPre {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  text-align: left;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3; 
  -webkit-box-orient: vertical;
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

.newsCardDividerPositioning {
  margin-left:1%; 
  margin-bottom:2%;
}

.rssHeadlinerTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 26px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
</style>