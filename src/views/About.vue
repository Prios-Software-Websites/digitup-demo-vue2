<template>
  <div class="homePageWidth">
    <v-row>
      <!-- ===== About Company ===== -->
      <v-col cols="2" class="pt-0"></v-col>
      <v-col cols="8" class="mt-15">
        <v-row>
          <v-col cols="6">
            <p class="aboutTitle">About InproFuture</p>
            <p class="aboutDescription">Voluptate quisquam voluptatum velit facilis. Et nihil repellat architecto asperiores sequi facere. Eligendi distinctio iste Iste quis rerum molestias expedita necessitatibus. Laudantium in facere labore ut.</p>
            <v-row>
              <v-col cols="4" v-for="(keyboxitem, keyboxindex) in keyBoxes" :key="keyboxindex">
                <div class="aboutKeyBoxes">{{keyboxitem.title}}</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <div class="aboutImageBox"></div>
          </v-col>
        </v-row>
      </v-col>

      <!-- ===== Goal of company ===== -->
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="5">
            <div class="goalImage"></div>
          </v-col>
          <v-col cols="7" class="mt-15 mb-15">
            <p class="goalTitle">The goal</p>
            <p class="goalDescription">Voluptate quisquam voluptatum velit facilis. Et nihil repellat architecto asperiores sequi facere. Eligendi distinctio iste Iste quis rerum molestias expedita necessitatibus. Laudantium in facere labore ut.</p>
          </v-col>
        </v-row>
      </v-col>

      <!-- ===== For Whom ===== -->
      <v-col cols="12" class="mt-15 whomBackground"></v-col>
      <v-col cols="2" class="whomBackground"></v-col>
      <v-col cols="8" class="whomBackground">
        <v-row>
          <v-col cols="6" class="mt-15 mb-15">
            <p class="whomTitle">For whom</p>
            <p class="whomDescription">Voluptate quisquam voluptatum velit facilis. Et nihil repellat architecto asperiores sequi facere. Eligendi distinctio iste Iste quis rerum molestias expedita necessitatibus. Laudantium in facere labore ut.</p>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="5">
            <div class="whomImage"></div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="whomBackground"></v-col>
      <v-col cols="12" class="whomBackground"></v-col>

      <!-- Why -->
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="5">
            <div class="whyImage"></div>
          </v-col>
          <v-col cols="7" class="mt-15 mb-15">
            <p class="whyTitle">Why</p>
            <p class="whyDescription">Voluptate quisquam voluptatum velit facilis. Et nihil repellat architecto asperiores sequi facere. Eligendi distinctio iste Iste quis rerum molestias expedita necessitatibus. Laudantium in facere labore ut.</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="mt-15"></v-col>
    </v-row>
  </div>
</template>

<script>
import LanguageTest from "@/components/TestAndDevelopment/LanguageTest.vue"
import SelectLocale from "@/components/TestAndDevelopment/SelectLocale.vue"
export default {
  name: 'About',
  components:{
    LanguageTest,
    SelectLocale
  },
  data(){
    return {
      keyBoxes: [
        { title: "Some key words" },
        { title: "To describe the project" },
        { title: "To make it more digestible" },
        { title: "To describe the project" },
        { title: "Some key words" }
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

/* About Company */
.aboutTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 48px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.aboutDescription {
  color: #6A6A6A;
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.aboutKeyBoxes {
  margin: 0px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  text-align: center; 
  background-color: #E0F1FF;
  padding: 5px 10px 5px 10px;
  font-size: 12px;
}
.aboutImageBox {
  width: 100%;
  height: 100%;
  background-color: #D1D1D1;
  opacity: 1;
}

/* Goal */
.goalTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 34px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.goalDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.goalImage {
  width: 100%;
  height: 100%;
  background-color: #D1D1D1;
  opacity: 1;
}

/* For Whom */
.whomTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 34px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.whomDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.whomImage {
  width: 100%;
  height: 100%;
  background-color: #D1D1D1;
  opacity: 1;
}
.whomBackground {
  background-color: #F2F2F2;
  opacity: 1;
}

/* Why */
.whyTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 34px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.whyDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.whyImage {
  width: 100%;
  height: 100%;
  background-color: #D1D1D1;
  opacity: 1;
}

</style>