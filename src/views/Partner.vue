<template>
  <div class="homePageWidth">
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="10" class="ma-0 pa-0 pt-16 mt-16">
        <v-card class="ma-0 pa-0 box" flat>
          <p class="ma-0 pa-0 partnerChapterTitle">Partners</p>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" v-for="(item, index) in projectPartners" :key="index">
        <v-card class="cardBorder ma-2 pa-7 px-2"  height="100%">
          <v-row>
            <v-col cols="12">
              <v-card height="90px" flat class="d-flex" :href="item.link" target="_blank">
                <v-img class="mt-5" :src="item.image" contain />
              </v-card>
            </v-col>
            <v-col class="pb-0 mb-0" cols="12">
              <p class="pl-3 partnerTitle">{{item.title}} 
                <span> 
                  <v-btn icon :href="item.link" target="_blank">
                    <v-icon color="green">mdi-open-in-new</v-icon>
                  </v-btn>
                </span>
              </p>
            </v-col>
            <v-col v-if="selectedIndex !== index" cols="12" class="ma-0 pa-0 pl-3 pr-3">
              <p class="pl-3 pr-3 partnerDescriptionPre">{{item.description}}</p>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon v-if="selectedIndex !== index" @click="openingPartnerExpand(index)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn icon v-else @click="closingPartnerExpand()">
              <v-icon large color="black">mdi-chevron-up</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="index === selectedIndex">
              <v-divider></v-divider>
              <v-card-text>
                <p class="partnerDescriptionPost">{{item.description}}</p>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: null,
      projectPartners: [
        { 
          title: "Progress Consult", 
          image: "img/PC_logo_angol-01.png", 
          link: "http://progress.hu/",
          description: `Progress Consult Ltd. 
Hungary (Danish-Hungarian Development Company) The mission of Progress Consult is to be an active, reliable, and innovative provider of lifelong learning solutions and basic skills development for both the private and public sector. 
The strategic focus of Progress is to contribute with learning and capacity building solutions to build capacities in a labour market in constant need of new competencies and skills and enforce people to get successful access (digital or analogue) to relevant skills and qualifications. 
Progress Consult Ltd. has been involved in lifelong learning and basic skills activities since 2009. 
Prior to this, the organisation had a broader focus on improving welfare services, social development, and institutional reforms for disadvantaged groups and long-term unemployed. 
The company started its operation in Hungary in 1998. 
In recent years Progress Consult has widened its operations to other countries in the region and participates in several innovative programmes in the field of adult education with partners from all over Europe.`, 
        },
        { 
          title: "Prios Kompetanse", 
          image: "img/prioslogo_PNG_big_dark.png", 
          link: "https://www.prios.no/",
          description: `Prios Kompetanse AS (Prios) from Steinkjer, Norway is a research-based corporation which aims to implement the idea of lifelong learning, support and conduct development projects. 
          The center is open to all who wish to develop their talents, refresh their knowledge, improve their business, needs new or better digital tools or have ideas in need for support to be fulfilled. 
The main sectors and activities is:
-	  Educational activities focused on adult learners and labor market service within basic skills training, VET, entrepreneurship training and tailored training for businesses. 
-	  Software support for their educational activities as well as developing new digital solutions based upon requests and needs in different projects, we participate in. For instance, Prios have developed and own the Follow-Up® concept.  
Consulting activities mostly supports business clients within internal innovation processes, HR processes, economical advises and management improvements.`, 
        },
        { 
          title: "Slovenska inovacna a energeticka agentura", 
          image: "img/siea-logo.png", 
          link: "https://www.siea.sk/",
          description: `SIEA was established in 1952 as a Professional agency focused on energy aspects. 
Since 1999 is directed by the Ministry of Economy.
It is the centre of competence for energy efficiency, energy innovations and renewable energies.
SIEA also acts as an implementation agency for Structural Funds. 
17 years ago, SIEA has extended the scope of its activities by innovation-related topics. 
SIEA acts as the national innovation and energy agency and knows deeply the Slovak market and its players, the decision-makers, companies, professionals, associations and all those who are involved in developing innovation ecosystem, energy and energy efficiency ecosystem. 
Since 2017 is involved in developing and providing training courses related to innovation development,  mainly on the part of idea generation. 
Since 2020 SIEA started its involvement in the building I4.0 ecosystem in Slovakia by supporting the establishment of cluster I4.0, participating in the national selection process for ECDI - with a focus on I4.0 and participating in international collaboration with Austrian and Swedish I4.0 platform. 
SIEA is involved in other strategic task related to digital transformation - via participation in the works of the European network of innovation agencies - Taftie (www.taftie.org). 
SIEA is in 2021 chairing this network under the headline Innovations for Sustainable Future.`, 
        },
      ]
    }
  },
  methods: {
    openingPartnerExpand(index){
      this.selectedIndex = index;
    },

    closingPartnerExpand(){
      this.selectedIndex = null;
    },

  }
}
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw; 
  margin:auto auto;
  margin-bottom: 50px;
}
/* Card CSS */
.box{
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(to right,  #DD9A30 5%, transparent 5%);
  border-image-slice: 1;
}
.cardBorder{
  border: 3px #329D9C solid;
}


/* Text styling */
.partnerChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.partnerTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #434343;
  letter-spacing: 0px;
  text-align: left;
}
.partnerDescriptionPre {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
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
.partnerDescriptionPost {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  text-align: left;
  color: #6A6A6A;
  opacity: 1;
  opacity: 1;
  letter-spacing: 0px;
}


</style>