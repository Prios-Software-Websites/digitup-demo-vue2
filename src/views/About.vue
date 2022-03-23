<template>
  <div class="homePageWidth">
    <v-row>
      <!-- ===== About Company ===== -->
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12" class="pt-0"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="mt-15">
        <v-row>
          <v-col cols="12">
            <p class="aboutTitle">About InproFuture</p>
            <p class="aboutDescription">
              The project “INPROFUTURE - Industry Professional's Future Education ” is inspired by the partners long time experience working with SME national settings, but it is also inspired by the EU Commissions proposal of March 2021 to establish a Digital Compass to further target the EU's digital ambitions 2030 for SMEs and their employees. <br>
              The “INPROFUTURE” project will focus on the cardinal point of Digital transformation of businesses and how to make possible and concrete that by 2030, three out of four SME companies should use cloud computing services, big data and Artificial Intelligence and how we can promote and ensure more than 90% SMEs should reach at least basic level of digital intensity in order to lift the number of EU unicorns to the double. <br>
              Small and medium-sized enterprises (SMEs) remain the backbone of the European economy, because of their high share of employment and value-added. <br>
              However, a renewed focus on innovation and digitalization is required for these companies to retain their local, national or global competitiveness.<br>
              The partners will through their cooperation with adult education providers, company instructors and in-service trainers from the SME industry create a program to help SMEs to benefit from digital transformation so that the involved SMEs in the program get access to very concrete opportunities to innovate and grow, overcome some of the significant barriers to raise digital competences from bottom to top of the SMEs.
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>

      <!-- ===== Aims and Results ===== -->
      <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12"></v-col>
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12" class="mt-15">
        <v-row>
          <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12">
            <v-row>
              <!-- Main Aim -->
              <v-col cols="12" >
                <p class="goalTitle">Main aim</p>
                <p class="goalDescription">The overall objective of the project is to improve SMEs innovative and digital transition capacity by creating structure, methodology and tools for improving employees lack of necessary skills to contribute. <br>
                The direct target group of the Project are consultants, adult educators and the managers of SME companies. <br>
                Tools, handbook and virtual resource platform will be made for them to support their work on digital literacy</p>
              </v-col>
              <!-- Aims -->
              <v-col cols="12" class="mb-15">
                <p class="goalTitle">Aims</p>
                <p class="goalDescription"><strong>The project aims to: </strong><br>
                  broaden project partners expertise in consultancy service regarding competence development, to develop educational methods for providing different digital competence development to improve SMEs innovation and digital transition capacity. <br>
                  Develop a mapping tool for SMEs to analyse and assess their level of digitalisation and give the digital transition process a clearer direction. <br>
                  Support SMEs and Educators to understand how the gaps could be filled with digital competence development, and training programs to improve employees digital skills and competencies. <br>
                  Motivate SMEs to strengthen their efforts to provide competence development training to their employees. <br>
                  Develop a complete toolkit for all involved in the facilitation of digital skills development as part of SMEs digital transition processes.</p>
              </v-col>
            </v-row>
          </v-col>
          <!-- ===== Results ===== -->
          <v-col cols="12" xl="7" lg="7" md="7" sm="12" xs="12">
            <p class="goalTitle">Results</p>
            <v-expansion-panels>
              <v-expansion-panel v-for="(item, index) in results" :key="index">
                <v-expansion-panel-header>
                  <p class="goalDescription" style="font-weight:bold;">{{item.title}}</p>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <pre class="goalDescription" style="white-space: pre-wrap;">{{item.description}}</pre>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
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
      ],
      results: [
        {
          title: "Output 1 - SME digitalization competence mapping tool",
          description: `The first step in solving a problem or reaching a potential, is to recognize that it does exist. 
A digital transmission strategy for every SME needs to be evidence-based, then it's possible to create and facilitate digital skills development which gives wanted effect.  
To provide trustworthy evidence, its necessary to understand, identify and develop measurable parameters to score and judge the degree of digitalisation in the SME. 
The mapping of their status and opportunities needs to be tailored to their field of business and give concrete results. 
A good mapping should provide results according to SWOT model in order to give the digital transmission process a clear direction.`
        },
        {
          title: "Output 2 - Digital handbook to strengthen planning and implementation of digital competences",
          description: `The project will produce a handbook to be used on the site of SMEs by in principle all stakeholders and with a special focus on how managers and adult educators/company instructors can prepare plans to facilitate digital skills training and competence development. 
(best practice collection and assessment) - Handbook (at least 25-30 pages) available on 4 language 
-   The handbook will provide recommendations for on how to set up the digital competence construction process and will give recommendations on how to ensure workplace organized training which can be customised to the individual SME.`
        },
        {
          title: "Output 3 - SME Improvement of digital competencies - The Resource Platform",
          description: `The project Recourse Center (RC) will be a virtual online platform with highly interactive features that will not only include all the project outcomes and outputs but also allow both adult educators, consultants, advisors, policymakers and SME management to interact online. 
The RC will be built with sole aim to be user friendly and easily navigated taking into consideration the target group features.`
        },
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