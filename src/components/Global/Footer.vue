<template>
  <v-footer color="#FFFFFF" elevation="10" class="pb-10">
    <v-row no-gutters>
      <v-col cols="12">
        <v-divider class="dividerStyling"></v-divider>
      </v-col>
      <!-- Erasmus Logo -->
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12" v-if="$vuetify.breakpoint.mdAndDown">
        <v-img src="img/erasmusLogoFooter.jpg" contain max-width="300"></v-img>
      </v-col>
      <v-col v-else cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
        <v-img src="img/erasmusLogoFooter.jpg" contain></v-img>
      </v-col>
      <v-spacer></v-spacer>
      <!-- EU Logo -->
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12" v-if="$vuetify.breakpoint.mdAndDown">
        <v-img src="img/EU_POS.png" contain max-width="150"></v-img>
      </v-col>
      <v-col v-else cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
        <v-img src="img/EU_POS.png" contain height="100"></v-img>
      </v-col>
      <!-- Text -->
      <!-- <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="pl-0 pt-3" v-if="$vuetify.breakpoint.mdAndDown">
        <p class="footerText mb-0 pb-0" style="font-weight: bold;">Contact info: </p>
        <p class="footerText ma-0 pa-0 ml-5">   Progress Consult    </p>
        <p class="footerText ma-0 pa-0 ml-5">   1046 Budapest, Klauzál u. 10.    </p>
        <p class="footerText ma-0 pa-0 ml-5">   + 36 1 399 0772    </p>
        <p class="footerText ma-0 pa-0 ml-5">   
          <a href="progress@progress.no" target="_blank">progress@progress.no</a>  
        </p>
      </v-col> -->
      <!-- <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="pl-15 pt-3" v-else>
        <p class="footerText mb-0 pb-0" style="font-weight: bold;">Contact info: </p>
        <p class="footerText ma-0 pa-0 ml-5">   Progress Consult    </p>
        <p class="footerText ma-0 pa-0 ml-5">   1046 Budapest, Klauzál u. 10.    </p>
        <p class="footerText ma-0 pa-0 ml-5">   + 36 1 399 0772    </p>
        <p class="footerText ma-0 pa-0 ml-5">   
          <a href="progress@progress.no" target="_blank">progress@progress.no</a>  
        </p>
      </v-col> -->
      <!-- Image -->
      <!-- <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
        <v-img
          v-if="$vuetify.breakpoint.mdAndDown"
          class="mt-5 mb-5"
          src="img/newLogo.jpg"
          max-height="150"
          max-width="150"
          contain
        ></v-img>
        <v-img
          v-else
          class="mt-5"
          src="img/newLogo.jpg"
          max-height="130"
          max-width="130"
          contain
        ></v-img>
      </v-col> -->
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
