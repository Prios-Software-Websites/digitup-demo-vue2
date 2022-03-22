<template>
  <div class="homePageWidth">
    <NewsDialog ref="openingNewsDialog"></NewsDialog>
    <RssDialog ref="openingRssDialog"></RssDialog>

    <!-- Snackbar for Contact Form -->
    <v-snackbar v-model="contactToast" dark color="success">
      <span>The message has been sent!</span>
      <v-btn class="float-right" x-small dark icon @click="contactToast = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <!-- Home Page Content -->
    <v-row>
      <v-col cols="12" class="mt-5"></v-col>
      <!-- Intro Image -->
      <v-col cols="12" class="pb-0">
        <v-card class="pt-15 pb-3 introImage">
          <p class="introTitle">Welcome to InproFuture</p>
          <p class="introDescription">Some short information about the project</p>
        </v-card>
      </v-col>

      <!-- 3 Cards in center of cards -->
      <v-col cols="2" class="pt-0"></v-col>
      <v-col cols="8" class="pt-0">
        <v-row>
          <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-for="(pageCard, pageCardIndex) in pageCards" :key="pageCardIndex">
            <v-card class="pageCardPositioning" :to="pageCard.link" style="position:relative;">
              <v-divider v-if="pageCardIndex == 0" class="pageCardDividerBlue"></v-divider>
              <v-divider v-if="pageCardIndex == 1" class="pageCardDividerGreen"></v-divider>
              <v-divider v-if="pageCardIndex == 2" class="pageCardDividerRed"></v-divider>
              <v-row>
                <v-col cols="10">
                  <p class="pt-2 pageCardTitle">{{pageCard.name}}</p>
                </v-col>
                <v-col cols="2">
                  <v-icon large class="pt-2 pageCardArrow">mdi-arrow-right</v-icon>
                </v-col>
              </v-row>
              <p class="pageCardDescription">{{pageCard.description}}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Info Text -->
      <v-col cols="12">
        <v-row>
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <p class="shortInfoTitle">Some short info</p>
            <p class="shortInfoDescription">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident voluptas asperiores dolores aspernatur, inventore blanditiis mollitia harum quo adipisci quisquam, quod odit ad explicabo consequuntur eos saepe animi quasi maiores.</p>
          </v-col>
        </v-row>
      </v-col>

      <!-- News -->
      <v-col cols="2" class="pt-0"></v-col>
      <v-col cols="8">
        <v-row>
          <!-- Chapter Title -->
          <v-col cols="12" class="pt-15 mt-15">
            <p class="newsChapterTitle">News</p>
          </v-col>
          <!-- News Articles - Need a slice later (simulate) -->
          <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12" v-for="(fakeNews, fakeNewsIndex) in fakeNewsCards" :key="fakeNewsIndex">
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
                  <v-divider v-if="fakeNewsIndex == 0" class="pageCardDividerBlue newsCardDividerPositioning" width="98%"></v-divider>
                  <v-divider v-if="fakeNewsIndex == 1" class="pageCardDividerGreen newsCardDividerPositioning" width="98%"></v-divider>
                  <v-divider v-if="fakeNewsIndex == 2" class="pageCardDividerRed newsCardDividerPositioning" width="98%"></v-divider>
                </v-col>
                <v-col cols="12"></v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- See all news button - go to page -->
      <v-col cols="12" align="center">
        <v-btn class="seeAllButtonBorder seeAllButtonText" rounded to="/news">
          See all news
        </v-btn>
      </v-col>

      <!-- RSS -->
      <v-col cols="2" class="pt-0"></v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="12" class="pt-15 mt-15">
            <p class="newsChapterTitle">RSS feed</p>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" v-for="(rssFeed, rssFeedIndex) in fakeRSSfeed" :key="rssFeedIndex">
            <v-card height="100%" :style="`border-right:3px solid ${colorArr[rssFeedIndex]}`" @click="$refs.openingRssDialog.openRssDialog(rssFeed)">
              <v-row>
                <!-- Image -->
                <v-col cols="3" style="height: 100px;" class="ma-0 pa-0">
                  <v-img v-if="rssFeed.image" :src="rssFeed.image" alt="News Image" max-height="50px" contain></v-img>
                  <div v-else style="height:105px; width:100px; background-color:#D1D1D1; margin:5px 15px 15px 15px;"></div>
                </v-col>
                <!-- Title and Content -->
                <v-col cols="6">
                  <p class="rssCardTitle">{{rssFeed.title}}</p>
                  <p class="rssCardDescription">{{rssFeed.content}}</p>
                </v-col>
                <!-- Date and Arrow -->
                <v-col cols="3">
                  <p class="rssCardDate">{{rssFeed.date}}</p>
                  <v-icon class="ml-5 rssCardArrow">mdi-arrow-right</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- See all RSS button - go to page -->
      <v-col cols="12" class="mb-15 pb-15" align="center">
        <v-btn class="seeAllButtonBorder seeAllButtonText" rounded to="/rss">
          View RSS feed
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewsDialog from "@/components/dialogs/newsDialog.vue"
import RssDialog from "@/components/dialogs/rssFeedDialog.vue"
import RssTest from "@/components/rss/rssTest.vue"
  export default {
    name: 'Home',
    components:{
      NewsDialog,
      RssDialog,
      RssTest
    },
    data(){
      return {
        colorArr:[
          "#205072",
          "#329D9C",
          "#D83636",
          "#DD9A30"
        ],
        contactToast: false,
        // Contact Form
        contactForm: {
          name: "",
          email: "",
          message: "",
          subject: "",
          sentFrom: "InproFuture"
        },
        // Rules for the contact Form
        rules:{
          requiredField: value => !!value || 'This field is required',
          requiredName: value => !!value || 'Your name is required',
          requiredEmail: value => !!value || 'A propper email adress is required',
          emailRequirement: value => /.+@.+\..+/.test(value) || 'A proper email address is required',
        },
        contactToast: false,
        isContactFormValid: true,
        // In Page Pages Cards
        pageCards:[
          { name: "E-Learning", color: "", link: "trainingmodules", description: "Lorem ipsum dolores sit amet. Nihil repellat architecto asperiores sequi facere" },
          { name: "Available resources", color: "", link: "/resources",  description: "Lorem ipsum dolores sit amet. Nihil repellat architecto asperiores sequi facere" },
          { name: "About the project", color: "", link: "/about",  description: "Lorem ipsum dolores sit amet. Nihil repellat architecto asperiores sequi facere" }
        ],
        // Dummy data below - Replace when db are implemented
        fakeNewsCards:[
          // { 
          //   title: "Smite officially the best game!", 
          //   article: "10/10 best game! Play it now!", 
          //   external_link: "https://www.smitegame.com/gods/", 
          //   image: "https://i.ytimg.com/vi/xAPsmI_zDZs/maxresdefault.jpg" 
          // },
          // { 
          //   title: "Lorem Ipsum", 
          //   article: "Lorem Ipsum dolores dahls ",
          //   external_link: "https://www.lipsum.com/", 
          //   image: "https://www.multimediaxp.com/images/article_190508124638.1557333998.jpg" 
          // },
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
        ],
      }
    },
    methods: {
      
      // Form: Clear all data
      clearForm(){
        this.$refs.form.reset()
      },
      // Form: Send Data
      postContactForm(){
        const ContactForm = {
          name: this.contactForm.name,
          email: this.contactForm.email,
          subject: this.contactForm.subject,
          message: this.contactForm.message,
          sentFrom: this.contactForm.sentFrom
        };
        console.log("Sending Contact Form", ContactForm);
        this.messageSent();
        this.clearForm();
      },
      // Form: Notification that message have been sent, through Toast.
      messageSent() {
        this.contactToast = true
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

/* Intro Classes for box and text at the top */
.introImage {
  height:650px;
  background-color:rgb(213, 211, 211);
}
.introTitle {
  font-size:48px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  margin-left: 15%; 
  margin-top:10%;
  font-weight: bold;
  font-family: 'Barlow', sans-serif;
  font-style:normal;
}
.introDescription {
  font-size:28px;
  color: #434343; 
  opacity: 1;
  letter-spacing: 0px;
  margin-left: 15%;
  font-weight: bold;
  font-family: 'Barlow', sans-serif;
  font-style:normal;
}
/* Styling the 3 cards close to the intro top */
.pageCardPositioning {
  position:relative;
  top: -5em;
  right: 50;
  padding: 10px;
}
.pageCardDividerBlue {
  background-color:#205072; 
  padding: 2px
}
.pageCardDividerGreen {
  background-color:#329D9C; 
  padding: 2px;
}
.pageCardDividerRed {
  background-color:#D83636; 
  padding: 2px;
}
.pageCardTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #434343;
  letter-spacing: 0;
}
.pageCardDescription {
  font-family: 'Lato', sans-serif;
  font-weight: regular;
  font-size: 14px;
  color: #6A6A6A;
  letter-spacing: 0;
}

.pageCardArrow {
  color: #205072;
  opacity: 1;
}

/* Short Info Text */
.shortInfoTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
}

.shortInfoDescription {
  font-family: 'Lato', sans-serif;
  font-weight: regular;
  text-align: center;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
}

/* Used several places */


/* NEWS */
.newsChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 26px;
  color: #434343;
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
  font-weight: regular;
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
  font-weight: regular;
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

/* See All News / RSS Button */
.seeAllButtonText {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #205072;
  opacity: 1;
  text-align: center;
  letter-spacing: 0px;
  text-transform: initial;
}
.seeAllButtonBorder {
  border: 3px solid #205072;
  font-family: 'Lato', sans-serif;
  opacity: 1;
  border-radius: 52px;
}
.seeAllButtonBorder:after {
  border: 3px solid #d6d2d24d;
  content: '';
  position: absolute;
  top: -9px;
  right: -9px;
  bottom: -9px;
  left: -9px;
  border-radius: 4em;
  box-shadow: 0px 2px 12px #00000033;
}

/* RSS feed */
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