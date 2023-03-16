<template>
  <div class="homePageWidth">
    <p class="mt-15"></p>
    <p class="trainingChapterTitle">Digital Maturity Assessment Tool</p>
    <p class="trainingChapterDescription">
      Assessing your level of digitalisation. The Digital Maturity Assessment Tool (DMAT) is an online tool that assesses digital maturity based on a questionnaire in 5 categories: 
      Business Strategy, Business Operations, Data and Technology, HR and Culture, Green Digitalization.
    </p>
    <p>
      For each category there are two questions and their corresponding answers, from which please choose all that you consider relevant.
      This assessment is standard and uniform across the EU for possible comparisons and subsequent adjustment for improvement.
    </p>
    <p>
      It is necessary to look at these aspects and categories of business from a higher perspective, the so-called helicopter view. Try to be unbiased and evaluate objectively.
    </p>
    <p>
      You may have been thinking about opportunities to engage and extend digital technologies within the business, 
      it is likely that you have taken the first steps, have a plan to implement digital measures or are consulting externally on digital solutions. 
      All of these activities help to increase the level of digitalisation of your business and at the same time motivate other small and medium-sized entrepreneurs in Europe.
    </p>

    <v-btn @click="$refs.openMappingDialog.openDialog()" large dark class="mt-15"> Start the Assessment Tool </v-btn>

    <MappingToolsDialog ref="openMappingDialog"></MappingToolsDialog>
  </div>
</template>

<script>
import MappingToolsDialog from "@/components/MappingTool/MappingToolsDialog.vue"
export default {
  components: {
    MappingToolsDialog
  },
  data(){
    return{

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
.trainingChapterTitle {
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 46px;
  color: #434343;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
.trainingChapterDescription {
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #6A6A6A;
  opacity: 1;
  letter-spacing: 0px;
  text-align: left;
}
</style>