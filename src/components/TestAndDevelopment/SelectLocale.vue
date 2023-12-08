<template>
  <div class="">
    <!-- <v-btn text @click="changeLanguage()">
      <p v-if="$i18n.locale == 'en'">asd</p>
    </v-btn> -->

    <!-- 
    <v-select :items="langs" v-model="$i18n.locale" style="max-width:35px;" class="ma-0" append-icon="" :menu-props="{ bottom: true, offsetY: true }" @click="setLanguage(item)">
      <template v-slot:selection="{ item }" >
        <v-img v-if="item == 'en'" src="../../assets/flags/england.png" alt="English Flag" max-height="25" max-width="30" contain></v-img>
        <v-img v-if="item == 'nb'" src="../../assets/flags/norway.png" alt="English Flag" max-height="19" max-width="30" contain></v-img>
      </template>
    </v-select> -->

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          class="transparent"
          rounded
          outlined
          v-on="on"
          v-model="$i18n.locale"
        >
          <!-- <v-img v-if="$i18n.locale == 'en'" src="../../assets/flags/england.png" alt="English Flag" max-height="25" max-width="30" contain></v-img>
          <v-img v-if="$i18n.locale == 'nb'" src="../../assets/flags/norway.png" alt="English Flag" max-height="19" max-width="30" contain></v-img> -->
          <!-- <v-icon class="pr-3">mdi-web</v-icon>  -->
          <!-- {{  $store.getters.getAppLanguage }} -->
          {{ $i18n.locale }}
          <v-icon class="pl-3">mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="setLanguage(item)"
          >
            <v-list-item-content class="text-center">
              <v-list-item-title
                v-text="item.text"
                v-model="$i18n.locale"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <!-- <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" v-on:click="$i18n.locale=lang">
        <v-img src="../../assets/flags/england.png"></v-img>
      </option>
    </select> -->

    <!-- <v-dialog v-model="languageDialog">
      <v-card>
        <v-radio-group v-model="$i18n.locale">
          <v-radio
            v-for="(lang, index) in langs"
            :key="index"
            :label="`Radio ${lang}`"
            :value="lang"
          ></v-radio>
        </v-radio-group>
      </v-card>
    </v-dialog> -->

    <!-- <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(lang, i) in langs" :key="i" v-model="$i18n.locale">
          <v-list-item-title>{{ lang }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->

    <!-- <v-menu offset-y v-model="$i18n.locale">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in langs" :key="index" v-model="$i18n.locale">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </div>
</template>

<script>
export default {
  name: "SelectLocale",
  data() {
    return {
      langs: ["en", "nb", "bg", "cz", "el", "es", "it"],
      languageDialog: false,
      selectedLanguage: this.$store.getters.getAppLanguage,
      items: [
        { text: "nb", image: "" },
        { text: "en", image: "" },
        { text: "bg", image: "" },
        { text: "cz", image: "" },
        { text: "el", image: "" },
        { text: "es", image: "" },
        { text: "it", image: "" },
      ],
    };
  },
  methods: {
    setLanguage(item) {
      if (item.text == "en") {
        this.$i18n.locale = "en";
        this.$store.commit("setAppLanguage", "en");
      } else if (item.text == "nb") {
        this.$i18n.locale = "nb";
        this.$store.commit("setAppLanguage", "nb");
      } else if (item.text == "bg") {
        this.$i18n.locale = "bg";
        this.$store.commit("setAppLanguage", "bg");
      } else if (item.text == "cz") {
        this.$i18n.locale = "cz";
        this.$store.commit("setAppLanguage", "cz");
      } else if (item.text == "el") {
        this.$i18n.locale = "el";
        this.$store.commit("setAppLanguage", "el");
      } else if (item.text == "es") {
        this.$i18n.locale = "es";
        this.$store.commit("setAppLanguage", "es");
      } else if (item.text == "it") {
        this.$i18n.locale = "it";
        this.$store.commit("setAppLanguage", "it");
      }
    },
    changeLanguage() {
      this.languageDialog = true;
      localStorage.setItem("lang", localeCode);
    },
  },
};
</script>
