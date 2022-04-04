<template>
  <div class="homePageWidth">
    <RssDialog ref="openingRssDialog"></RssDialog>
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="mb-15">
        <v-row> 
          <!-- RSS feed Chapter info -->
          <v-col cols="12">
            <!-- <RssTest></RssTest> -->
            <p class="rssChapterTitle">RSS feed</p>
            <p class="rssChapterDescription">Keep up to date about the InproFuture project</p>
          </v-col>
          <!-- RSS feed Cards -->
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="mb-3" v-for="(rssFeed, rssFeedIndex) in fakeRSSfeed" :key="rssFeedIndex">
            <v-card height="100%" :style="`border-right:3px solid ${colorArr[rssFeedIndex]}`" @click="$refs.openingRssDialog.openRssDialog(rssFeed)">
              <v-row>
                <!-- Image -->
                <v-col cols="3" style="height: 100px;" class="ma-0 pa-0">
                  <v-img v-if="rssFeed.image" :src="rssFeed.image" alt="News Image" max-height="50px" contain></v-img>
                  <div v-else style="height:85px; width:100px; background-color:#D1D1D1; margin:5px 15px 15px 15px;"></div>
                </v-col>
                <!-- Title and Content -->
                <v-col cols="8">
                  <p class="rssCardTitle">{{rssFeed.title}}</p>
                  <p class="rssCardDescription">{{rssFeed.content}}</p>
                </v-col>
                <!-- Date and Arrow -->
                <v-col cols="12" xl="1" lg="1" md="1" sm="12" xs="12" class="pb-10">
                  <p class="rssCardDate">{{rssFeed.date}}</p>
                  <v-icon class="ml-5 rssCardArrow">mdi-arrow-right</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RssDialog from "@/components/dialogs/rssFeedDialog.vue"
import RssTest from "@/components/rss/rssTest.vue"
export default {
  components: {
    RssDialog,
    RssTest
  },
  data() {
    return {
      colorArr:[
          "#205072",
          "#329D9C",
          "#D83636",
          "#DD9A30",
          "#205072",
        ],
       fakeRSSfeed: [
        { 
          title: "RSS feed title", 
          image: "", 
          content: "Lorem ipsum dolor sit amet, eligendi distinctio iste Iste quis rerum", 
          date: "02.03.2022"
        },
        { 
          title: "RSS feed title", 
          image: "", 
          content: "Lorem ipsum dolor sit amet, eligendi distinctio iste Iste quis rerum", 
          date: "02.03.2022"
        },
        { 
          title: "RSS feed title", 
          image: "", 
          content: "Lorem ipsum dolor sit amet, eligendi distinctio iste Iste quis rerum", 
          date: "02.03.2022"
        },
        { 
          title: "RSS feed title", 
          image: "", 
          content: "Lorem ipsum dolor sit amet, eligendi distinctio iste Iste quis rerum", 
          date: "02.03.2022"
        },
        { 
          title: "RSS feed title", 
          image: "", 
          content: "Lorem ipsum dolor sit amet, eligendi distinctio iste Iste quis rerum", 
          date: "02.03.2022"
        },
      ]
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
.rssChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssChapterDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssCard {
  box-shadow: 0px 2px 16px #00000033;
}
.rssCardTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 28px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssCardDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssCardDate {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 11px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.rssCardArrow {
  color: #205072;
  opacity: 1;
}
</style>