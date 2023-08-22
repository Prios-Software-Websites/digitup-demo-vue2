<template>
  <div>
    <div class="mainDisplayContainer">
      <div>
        <p class="containerHeader">Company information</p>
        <!-- <p>{{this.front_page.name}}</p> -->
        <p class="subHeader">{{pdfData.front_page.description}}</p>
      </div>
      <div class="companyInfoFlexContainer">
          <div class="companyInfoFlexItem" v-for="(item,index) in pdfData.front_page.questions" :key="index">
            <p style="margin: 0px 0px 5px 0px"><b>{{item.title}}:</b></p>
            <ul v-if="item.checkbox">
              <li v-for="(answer, answerIndex) in item.answer" :key="answerIndex">
                <p style="margin: 5px 0px 5px 0px">{{answer.label}}</p>
              </li>
            </ul>
              <p v-else style="margin: 5px 0px 5px 0px">{{item.answer}}</p>
          </div>
      </div>
    </div>
    <!--Graph container-->
    <div class="mainDisplayContainer">
      <!-- <div class="companyInfoFlexContainer"> -->
        <div class="divContainer">
          <p class="containerHeader">Categories and sub categories</p>
          <div v-for="(category,index) in pdfData.categories" :key="index">
            <div class="categoryContainer subHeader" :style="`--score-color:${category.color};--score-value:${category.score}`">
              {{category.name}} {{category.score}}
            </div>
            <div v-for="(subCategory,subCatIndex) in category.sub_categories" :key="subCatIndex">
              <div class="subCategoryContainer" :style="`--score-color:${subCategory.color};--score-value:${subCategory.score}`">
                {{subCategory.name}} {{subCategory.score}}
              </div>
            </div>
          </div>
        </div>
    </div>
    <!--Graph container 2-->
    <div style="page-break-before: always;">
      <p class="containerHeader">Categories</p>
      <div>
        <PolarAreaGraph style="height:40em;" :propsChartData="pdfData.categories.map(i => {return {category_name:i.name, score:i.score.split('%')[0]}})" />
      </div>
    </div>
    <!--Trends container-->
    <div class="mainDisplayContainer">
      <p class="containerHeader">Makro and mega trends</p>
      <div class="companyInfoFlexContainer">
        <!-- Strength/weakness from form-->
        <div class="trendsFlexItem">
          <div class="swotBorderStyle" style="background:#81C784">
            <p class="swotHeader"><b>Strengths</b></p>
            <p v-if="pdfData.swot_text.strengths.showdata">According to our rating system these could be the strengths of your company:</p>
            <p v-else>You didn't achieve enough points in all of the five domains and neither of them can be considered your strength.</p>
            <div v-for="(item,index) in pdfData.swot_text.strengths.data" :key="index">
               <p><b>{{item.name}}</b></p>
              <ul>
                <li v-for="(trendPoint, pointIndex) in item.points" :key="pointIndex"><span>{{trendPoint}}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="trendsFlexItem">
          <div class="swotBorderStyle" style="background:#64B5F6">
            <p class="swotHeader"><b>Weaknesses</b></p>
            <p v-if="pdfData.swot_text.strengths.showdata">According to our rating system these could be the strengths of your company:</p>
            <p v-else>You didn't achieve enough points in all of the five domains and neither of them can be considered your strength.</p>
            <div v-for="(item,index) in pdfData.swot_text.weaknesses.data" :key="index">
               <p><b>{{item.name}}</b></p>
              <ul>
                <li v-for="(trendPoint, pointIndex) in item.points" :key="pointIndex"><span>{{trendPoint}}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Opportunities/Threats from trends-->
        <div class="trendsFlexItem" style="background:#FFB74D;">
          <div class="swotBorderStyle">
            <p class="swotHeader"><b>Opportunities</b></p>
            <p>According to our rating system these could be the threats for your coampany:</p>
            <p v-for="(item,index) in pdfData.trends.opportunities.data" :key="index"><span><b>{{item.trend_name}}</b> {{item.trend_text}}</span></p>
          </div>
        </div>
        <div class="trendsFlexItem" style="background:#E57373">
          <div class="swotBorderStyle">
            <p class="swotHeader"><b>Threats</b></p>
            <p>According to our rating system these could be the opportunities for your coampany:</p>
            <p v-for="(item,index) in pdfData.trends.threats.data" :key="index"><span><b>{{item.trend_name}}</b> {{item.trend_text}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PolarAreaGraph from "./PolarAreaGraph.vue"
 export default {
   components:{
     PolarAreaGraph
   },
   props:{
     pdfData:{
       type:Object,
     }
   }
 }
</script>

<style>
  body{
    font-family: "Times New Roman", "Georgia", serif;
    font-size:18px;
  }
  .mainDisplayContainer{
    page-break-inside:avoid;
  }
  .containerHeader{
    font-size:30px;
    font-weight:600;
    text-align: center;
  }
  .subHeader{
    font-size:22px;
    font-weight:500;
  }
  .companyInfoFlexContainer{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
  }
  .companyInfoFlexItem{
    width:45%;
    padding:5px;
  }
  .trendsFlexItem{
    width:50%;
  }
  .swotHeader{
    font-size:22px;
    text-align: center;
    margin:0;
  }
  .companyInfoFlexItem:nth-child(4n+1), .companyInfoFlexItem:nth-child(4n+2){
    background-color: #f2f2f2;
  }
  .divContainer{
    width:70%;
    padding:10px;
  }
  .categoryContainer{
    margin-top:10px;
    margin-bottom:10px;
    padding:10px;
    background:linear-gradient(to right, var(--score-color) var(--score-value), #EEEEEE 0%)
  }
  .subCategoryContainer{
    margin-top:10px;
    margin-left:30px;
    padding:10px;
    background:linear-gradient(to right, var(--score-color) var(--score-value), #EEEEEE 0%)
  }
  .swotBorderStyle{
    height:100%;
    padding:5px;
    border:3px solid white;
  }
</style>

