<template>
  <div>
    <v-row>
      <v-col cols="12" class="mt-15"></v-col>
      <v-col cols="12" class="ma-0 pa-0 mb-15">
        <p class="handbookTitle">Handbook</p>
      </v-col>

      <v-col cols="4" class="ma-0 pa-0" v-for="(handbook, handbookIndex) in handbooks" :key="handbookIndex">
        <a :href="handbook.handbookLink" target="_blank">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2">
              <v-img :src="handbook.handbookImage" width="300px" height="auto" contain class="mx-auto"></v-img>
            </v-card>
          </v-hover>
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handbooks: [
        {
          handbookTitle: 'Handbook 1',
          handbookImage: "img/handbook1.jpg",
          handbookLink: "https://anyflip.com/whhx/byvg/"
        },
      ]
    }
  },
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
}

.handbookTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.handbookDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}

</style>