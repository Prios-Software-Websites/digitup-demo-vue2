<template>
  <v-footer color="#FFFFFF" elevation="10">
    <v-row  no-gutters>
      <v-col cols="12">
      <v-divider class="dividerStyling"></v-divider>

      </v-col>
      <!-- Erasmus Logo -->
      <v-col cols="2">
        <v-img src="img/erasmusLogoFooter.jpg" contain></v-img>
      </v-col>
      <!-- Text -->
      <v-col cols="8" class="pl-15 pt-3">
        <p class="footerText">Footer design will change depending on content</p>
        <p class="footerText">Contact info</p>
      </v-col>
      <!-- Image -->
      <v-col cols="2">
        <!-- <v-img class="mt-5" src="img/EVOLVE.png"  max-height="130" max-width="130" contain></v-img> -->
        <p class="pt-5" style="font-weight: bold; font-size: 20px; color: blue;">InproFuture</p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style scoped>
.cursorStyle{ cursor:pointer; }
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
  border-top:red solid 2px;
  box-shadow: 0px 2px 12px #00000033;
}

.dividerStyling {
  background-color:#329d9c;
  border-radius: 4px;
  opacity: 1;
  padding: 2px;
  margin-bottom: 20px;
  margin-top: 5px;
}

.footerText {
  font-family: 'Lato', sans-serif;
  text-align: left;
  letter-spacing: 0px;
  color: #6A6A6A;
  opacity: 1;
  font-size: 14px;
}

</style>