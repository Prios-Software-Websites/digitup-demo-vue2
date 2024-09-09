<template>
  <v-footer color="#FFFFFF" elevation="10" class="pb-10 mt-15">
    <v-row no-gutters class="mt-5">
      <v-col cols="12">
        <v-divider class="dividerStyling"></v-divider>
      </v-col>
      <!-- Erasmus Logo -->
      <v-col
        cols="12"
        xl="2"
        lg="2"
        md="2"
        sm="12"
        xs="12"
        v-if="$vuetify.breakpoint.mdAndDown"
      >
        <v-img src="img/newEuLogo.jpg" contain max-width="300"></v-img>
      </v-col>
      <v-col v-else cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
        <v-img
          src="img/newEuLogo.jpg"
          contain
          height="100px"
          width="250px"
        ></v-img>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.cursorStyle {
  cursor: pointer;
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.borderTop {
  border-top: red solid 2px;
  box-shadow: 0px 2px 12px #00000033;
}

.dividerStyling {
  background-color: #2a4b7f;
  border-radius: 4px;
  opacity: 1;
  padding: 2px;
  margin-bottom: 20px;
  margin-top: 5px;
}

.footerText {
  font-family: "Lato", sans-serif;
  text-align: left;
  letter-spacing: 0px;
  color: #141428;
  opacity: 1;
  font-size: 14px;
}
</style>
