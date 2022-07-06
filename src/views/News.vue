<template>
  <div class="homePageWidth">
    <NewsDialog ref="openingNewsDialog"></NewsDialog>
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="mb-15">
        <v-row>
          <!-- Headliner -->
          <v-col cols="12">
            <p class="newsChapterTitle">News</p>
          </v-col>
          <!-- Description -->
          <v-col cols="12" class="mb-15">
            <p class="newsChapterDescription">Keep up to date about the InproFuture project</p>
          </v-col>

          <!-- Implement Once having News -->
          <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-for="(newsData, newsDataIndex) in allTheNews" :key="newsDataIndex">
            <v-card height="100%" @click="getNewsContent(newsData)">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-row>
                    <v-col cols="12">
                      <v-img v-if="newsData.media_url" :src="newsData.media_url" alt="News Image" width="auto" height="200px" cover class="ml-2 mr-2"></v-img>
                      <div v-else style="height:200px; width:auto; background-color:#D1D1D1; margin:0px 15px 0px 15px;"></div>
                    </v-col>
                    <v-col cols="12" style="height:60px;" class="mb-0 ml-2 pb-0">
                      <p class="resourceCardTitle">{{newsData.title}}</p>
                    </v-col>
                    <v-col cols="12" style="height:130px;" class="mb-0 ml-2 pb-0 mt-3">
                      <p class="resourceDescription">{{newsData.description}}</p>
                    </v-col>
                    <v-col cols="12" class="pt-0 mt-0 pt-7">
                      <v-card-actions class="pt-0">
                        <p class="newsCardButton mr-2 pt-3">Read article</p>
                        <v-icon class="newsCardButtonArrow">mdi-arrow-right</v-icon>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                  <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;" :style="`background-color:${colorArr[newsDataIndex]}`"></v-divider>
                </v-col>
                <v-col cols="12"></v-col>
              </v-row>
            </v-card>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewsDialog from "@/components/dialogs/newsDialog.vue"
export default {
  name: 'News',
  components: {
    NewsDialog
  },
  data(){
    return {
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      tenant: 108,
      allTheNews: [],
      theNewsContent: [],
      colorArr:[ "#1b1b61", "#387b9d", "#47abbb", "#DD9A30", "#47b5b0", "#387b9d" ],
      fakeNewsCards:[
        { 
          title: "News title", 
          article: "Lorem ipsum dolor sit amet, nihil repellat arcitecto asperiores sequi facere",
          external_link: "", 
          image: "" 
        },
        { 
          title: "News title", 
          article: "Lorem ipsum dolor sit amet, nihil repellat arcitecto asperiores sequi facere",
          external_link: "", 
          image: "" 
        },
        { 
          title: "News title", 
          article: "Lorem ipsum dolor sit amet, nihil repellat arcitecto asperiores sequi facere",
          external_link: "", 
          image: "" 
        },
        { 
          title: "News title", 
          article: "Lorem ipsum dolor sit amet, nihil repellat arcitecto asperiores sequi facere",
          external_link: "", 
          image: "" 
        },
        { 
          title: "News title", 
          article: "Lorem ipsum dolor sit amet, nihil repellat arcitecto asperiores sequi facere",
          external_link: "", 
          image: "" 
        },
        { 
          title: "News title", 
          article: "Lorem ipsum dolor sit amet, nihil repellat arcitecto asperiores sequi facere",
          external_link: "", 
          image: "" 
        },
      ],
    }
  },
  mounted(){
    this.getAllNews();
  },
  methods: {
    // Get all news made for this tenant
    getAllNews(){
      this.$http.get(`https://app.followup.prios.no/api/resource_management/news?mode=getpublicnews&tenant_id=${this.tenant}`,{headers:{Tempaccess:this.accessKey}}).then(response =>{
        this.allTheNews = response.data;
        console.log("Responsen", response.data);
      })
    },

    // Get all the content of the clicked news
    getNewsContent(data){
      this.$http.get(`https://app.followup.prios.no/api/resource_management/news_content?mode=getpublicnews&news_id=${data.id}`,{headers:{Tempaccess:this.accessKey}}).then(response =>{
        this.theNewsContent = response.data;
        console.log("Responsen", response.data);
      }).then(responsen => {
        this.openTheDialog(data, this.theNewsContent);
      })
    },

    // Open the Dialog while passing the correct data
    openTheDialog(originalData, contentData){
      this.$refs.openingNewsDialog.openNewsDialog(originalData, contentData);
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
.newsChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #141428;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.newsChapterDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #141428;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.newsCardTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #434343;
  letter-spacing: 0px;
  text-align: left;
}
.newsCardDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  text-align: left;
  color: #141428;
  opacity: 1;
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2; 
  -webkit-box-orient: vertical;
}
.newsCardButton {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 18px;
  text-align: left;
  color: #2a4b7f;
  opacity: 1;
  letter-spacing: 0px;
  text-decoration: underline;
}
.newsCardButtonArrow {
  color: #2a4b7f;
  opacity: 1;
}
.newsCardDividerPositioning {
  margin-left:1%; 
  margin-bottom:2%;
}

.pageCardDividerBlue {
  background-color:#2a4b7f; 
}
.pageCardDividerGreen {
  background-color:#47abbb; 
  padding: 2px;
}
.pageCardDividerRed {
  background-color:#47b5b0; 
  padding: 2px;
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

</style>