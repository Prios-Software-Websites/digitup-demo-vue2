<template>
  <v-app style="display: flex; flex-direction: column; min-height: 100vh">
    <VisitorTracker></VisitorTracker>
    <v-main style="flex: 1">
      <router-view />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Global/Navbar.vue";
import NavbarPhone from "@/components/Global/NavbarPhone.vue";
import LanguageTest from "@/components/TestAndDevelopment/LanguageTest.vue";
import SelectLocale from "@/components/TestAndDevelopment/SelectLocale.vue";
import Sidebar from "@/components/Global/Sidebar.vue";
import Footer from "@/components/Global/Footer.vue";
import VisitorTracker from "@/components/VisitTracker/VisitorTracker.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    NavbarPhone,
    LanguageTest,
    SelectLocale,
    Footer,
    VisitorTracker,
  },
  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Lato:wght@400;700&display=swap");
</style>
