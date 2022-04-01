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
          <!-- News Cards - Delete once News have gotten -->
          <!-- <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-for="(fakeNews, fakeNewsIndex) in fakeNewsCards" :key="fakeNewsIndex">
            <v-card height="100%" @click="$refs.openingNewsDialog.openNewsDialog(fakeNews)">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-row>
                    <v-col cols="12">
                      <v-img v-if="fakeNews.image" :src="fakeNews.image" alt="News Image" width="auto" height="200px" cover class="ml-2 mr-2"></v-img>
                      <div v-else style="height:200px; width:auto; background-color:#D1D1D1; margin:0px 15px 0px 15px;"></div>
                    </v-col>
                    <v-col cols="12" style="height:110px;" class="mb-0 ml-2 pb-0">
                      <p class="pl-2 mb-0 newsCardTitle">{{fakeNews.title}}</p>
                      <p class="pa-2 mb-0 pb-0 newsCardDescription">{{fakeNews.article}}</p>
                    </v-col>
                    <v-col cols="12" class="pt-0 mt-0">
                      <v-card-actions class="pt-0">
                        <p class="newsCardButton mr-2 pt-3">Read article</p>
                        <v-icon class="newsCardButtonArrow">mdi-arrow-right</v-icon>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                  <v-divider class="newsCardDividerPositioning" width="98%" style="padding: 2px;" :style="`background-color:${colorArr[fakeNewsIndex]}`"></v-divider>
                </v-col>
                <v-col cols="12"></v-col>
              </v-row>
            </v-card>
          </v-col> -->

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
                    <v-col cols="12" style="height:110px;" class="mb-0 ml-2 pb-0">
                      <p class="pl-2 mb-0 newsCardTitle">{{newsData.title}}</p>
                      <p class="pa-2 mb-0 pb-0 newsCardDescription">{{newsData.description}}</p>
                    </v-col>
                    <v-col cols="12" class="pt-0 mt-0">
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
      tenant: 107,
      allTheNews: [],
      theNewsContent: [],
      colorArr:[ "#205072", "#329D9C", "#D83636", "#DD9A30", "#205072", "#329D9C" ],
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
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.newsChapterDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
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
  color: #6A6A6A;
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
  color: #205072;
  opacity: 1;
  letter-spacing: 0px;
  text-decoration: underline;
}
.newsCardButtonArrow {
  color: #205072;
  opacity: 1;
}
.newsCardDividerPositioning {
  margin-left:1%; 
  margin-bottom:2%;
}

.pageCardDividerBlue {
  background-color:#205072; 
}
.pageCardDividerGreen {
  background-color:#329D9C; 
  padding: 2px;
}
.pageCardDividerRed {
  background-color:#D83636; 
  padding: 2px;
}

</style>