O<template>
  <v-app-bar app class="navbarStyling" flat>
    <ContactForm ref="OpenContactForm"></ContactForm>
    
    <!-- <p v-if="$i18n.locale == 'en'">asd</p> -->
    <!-- Logo -->
    <!-- <div class="d-flex align-center">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="img/DIGI_logo.png" transition="scale-transition" width="40"/>
      <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/>
    </div> -->
    <!-- <v-img src="img/DIGI_logo.png" height="40" width="260px" contain/> -->
    <v-spacer></v-spacer>
    <v-img v-if="$vuetify.breakpoint.mdAndDown" class="mt-5 mb-5" src="img/newLogo.jpg"  max-height="150" max-width="150" contain></v-img>
    <v-img v-else class="mt-5" src="img/newLogo.jpg"  max-height="130" max-width="130" contain></v-img>
    <v-spacer></v-spacer>
    <!-- Links -->
    <!-- 
      1. Logo
      2. Home Button
      3. About
      4. News
      5. Training Modules
      6. Digital Learning Design
      7. Digital Pedagogical Strategy
      8. Contact (dialog)
      9. Login (Link to followup? OR same as valuable creativity) 
    -->
    <div class="mt-10">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/partners">Partners</a>
      <a href="/news">News</a>
      <a href="/rss">RSS</a>
      <a href="/trainingmodules">Training Modules</a>
      <a href="/resources" class="mr-2">Resources</a>

      <!-- <v-btn text to="/">{{ $t('navbar.home') }}</v-btn>
      <v-btn text to="/about">{{ $t('navbar.about') }}</v-btn>
      <v-btn text to="/news">{{ $t('navbar.news') }}</v-btn>
      <v-btn text to="/trainingmodules">Training Modules</v-btn>
      <v-btn text to="/resources">Resources</v-btn> -->
      <!-- <v-btn text to="/digitallearningdesign">Digital Learning Design</v-btn> -->
      <!-- <v-btn text to="/digitalpedagogicalstrategy">Digital Pedagogical Strategy</v-btn> -->
      <!-- <v-btn class="contactButton" small text @click="$refs.OpenContactForm.openContactDialog()">Contact</v-btn> -->
      <span class="contactButton" @click="$refs.OpenContactForm.openContactDialog()">Contact</span>
      <!-- <v-btn icon @click="$refs.OpenContactForm.openContactDialog()">
        <v-icon>mdi-email-outline</v-icon>
      </v-btn> -->
    </div>
    <!-- <div class="mt-10">
      <LanguageSelection></LanguageSelection>
    </div> -->


    <v-spacer></v-spacer>
    <!-- Login -->
    <!-- <div class="mt-7">
      <v-btn text href="https://app.followup.prios.no/#/login" target="_blank">Login</v-btn>
    </div> -->
  </v-app-bar>
</template>

<script>
import ContactForm from "@/components/Global/ContactUs.vue"
import LanguageSelection from "@/components/TestAndDevelopment/SelectLocale.vue"

export default {
  components:{
    ContactForm,
    LanguageSelection
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>
.navbarStyling{
  height:6em !important; 
  width: 90vw !important; 
  margin: auto auto !important; 
  background-color:#FFFFFF !important; 
  border-bottom:5px solid #2a4b7f!important;
}
a {
  padding: 14px;
  color: #141428;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif */
}
a:visited {
  color: #141428;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a:active {
  background-color:black;
  color: orangered;
}

/* Contact Button */
.contactButton {
  font-family: 'Lato', sans-serif;
  font-weight: regular;
  color: #141428;
  line-height: 1em;
  font-size: 16px;
}

.contactButton:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>