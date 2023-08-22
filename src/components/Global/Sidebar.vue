<template>
  <div>
    <ContactUs ref="OpenContactForm"></ContactUs>
    <!-- Navbar -->
    <v-app-bar app style="height: 6em; background-color: #ffffff !important">
      <a href="/">
        <v-img
          v-if="$vuetify.breakpoint.mdAndDown"
          class="mt-7"
          src="img/digitup-logo.jpg"
          max-height="100px"
          max-width="100px"
          contain
        ></v-img>
        <v-img
          v-else
          class="mt-7"
          src="img/digitup-logo.jpg"
          max-height="100px"
          max-width="100px"
          contain
        ></v-img>
      </a>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleNavbar()">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.OpenContactForm.openContactDialog()">
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Navbar -->
    <v-navigation-drawer v-model="navDrawer" app>
      <a href="/">
        <v-img
          v-if="$vuetify.breakpoint.mdAndDown"
          class="mt-5"
          src="img/digitup-logo.jpg"
          max-height="100px"
          max-width="100px"
          contain
        ></v-img>
        <v-img
          v-else
          class="mt-5"
          src="img/digitup-logo.jpg"
          max-height="100px"
          max-width="100px"
          contain
        ></v-img>
      </a>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in pageNavigation"
          :key="index"
          :to="item.location"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item @click="$refs.OpenContactForm.openContactDialog()">
          <v-list-item-icon>
            <v-icon>mdi-email-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item
          href="https://app.followup.prios.no/#/login"
          target="_blank"
        >
          <v-list-item-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
      <!-- <v-btn text href="https://app.followup.prios.no/#/login" target="_blank">Login</v-btn> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
import ContactUs from "@/components/Global/ContactUs.vue";
export default {
  components: {
    ContactUs,
  },
  data() {
    return {
      navDrawer: true,
      expand: true,
      pageNavigation: [
        // { name: "Home", location: "/", icon: "" },
        // { name: "About", location: "/about", icon: "" },
        // { name: "Partners", location: "/partners", icon: "" },
        // { name: "News", location: "/news", icon: "" },
        // { name: "RSS", location: "/rss", icon: "" },
        // { name: "Mapping Tool", location: "/mappingtool", icon: "" },
        // { name: "Handbook", location: "/handbook", icon: "" },
        // { name: "Resources", location: "/resources", icon: "" },
      ],
    };
  },

  methods: {
    // Toggles the sidebar on and offs
    toggleNavbar() {
      if (this.navDrawer == true) {
        this.navDrawer = false;
      } else {
        this.navDrawer = true;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

.fontTitle {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
}
.fontSubTitle {
  font-family: "Poppins", sans-serif;
  font-size: 19px;
}
.fontContent {
  font-size: 19px;
  font-family: "Source Sans Pro", sans-serif;
}
p {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
