<template>
  <div class="pa-3" v-if="questionData.length != 0"> 
    
    <v-stepper v-model="questionStepper" non-linear>
    <v-stepper-items>
      <v-stepper-content v-for="(item,index) in questionData" :step="index+1" :key="index">
        <v-card class="mb-7 mt-5 textColorList elevation-0">
        <v-layout row wrap>
          <v-flex xs6>
            <p class="pl-4">Nr: <span class="displayCircleStyle">{{questionStepper}}/{{questionData.length}}</span></p>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <p>Nr: <span class="displayCircleStyle">{{currentAttempts}}</span></p>
          </v-flex>
        </v-layout>
        <div class="" v-if="item.type == 'text_multiple'">
          <p class="subheading">{{item.question}}</p>
          <v-radio-group v-model="selectedValue" class="radioAlignClass" @change="resetAnswerAttempt">
            <v-radio :label="questionOption" :value="questionOption" v-for="(questionOption, optionIndex) in item.options" :key="optionIndex"></v-radio>
          </v-radio-group>
        </div>
        <div class="" v-if="item.type == 'text_sort'">
          <p class="subheading">{{item.question}}</p>
          <draggable v-model="item.options" group="options" class="mt-1 pt-1" :sort="true" ghostClass="ghost" animation="200" @change="resetAnswerAttempt">
            <transition-group type="transition">
              <div draggable class="optiondrag pa-2 sortableQuestion" v-for="(questionOption,optionIndex) in item.options" :key="optionIndex">
                <p>{{optionIndex + 1}}. {{questionOption}}</p>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="" v-if="item.type == 'text_fill'">
          <p class="subheading">{{item.question}}</p>
          <v-text-field @click="resetAnswerAttempt" box label="Your answer" v-model="selectedValue"></v-text-field>
        </div>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
    <template>
    <div class="ml-2 mr-2 mb-5">
      <v-layout row>
        <v-flex>
          <v-pagination id="paginationItem" circle :color="setPagnationColors" v-model="questionStepper" :length="questionData.length"></v-pagination>
        </v-flex>
        <v-flex class="text-xs-right">
          <v-btn color="primary" :disabled="!selectedValue" @click="checkAnswer()" class="text-capitalize" v-if="checkQuestionProgress == 'notAnswered'"> Check answer </v-btn>
          <v-btn color="success" class="text-capitalize" v-else-if="checkQuestionProgress == 'correctAnswer'"> Correct answer </v-btn>
          <v-btn color="error" :disabled="!selectedValue" class="text-capitalize" @click="checkAnswer()" v-else> Incorrect Answer </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </template>
  </v-stepper>
</div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props:{
    gettingChapterContentTask:{
      type: String
      // type: Number
    }
  },
  components:{
    draggable
  },
  data(){
    return{
      questionData:[],
      questionProgress:[],
      questionStepper:1,
      selectedValue:null,
      currentAttempts:0,
      loadProgressDialog:true,
      // Access Key to followup API - Need to be hidden better - talk with ola
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
    }
  },
  methods:{
    setPaginationStatusColors(){
    let selectAllItems =  document.querySelectorAll(".v-pagination__item")
    selectAllItems.forEach((item,index) =>{
      let findQuestion = this.questionData[index];
      let findQuestionProgress = this.questionProgress.find(i => i.question_id == findQuestion.id);
      if(findQuestionProgress.correct_answer == true && findQuestionProgress.active == true){
        item.style.border = "2px solid #4caf50"
      } else if(findQuestionProgress.correct_answer == false && findQuestionProgress.active == true){
        item.style.border = "2px solid #ff5252";
      }
    })},


    getTask(){
      this.questionData = []
      let taskID = this.gettingChapterContentTask;
      console.log("AM I RAN?", taskID);
      // this.$axios.get(`/task_library/chapters?mode=getsinglechapterandquestions&chapter_id=${this.gettingChapterContentTask}`)
      this.$http.get("https://app.followup.prios.no/api/task_library/chapters?mode=getsinglechapterandquestions&chapter_id=" + taskID ,{headers:{Tempaccess:this.accessKey}}).then(response =>{
        console.log("Responsen av tasken", response);
        response.data.questions.forEach(item =>{
          if(item.options){
            item.options = item.options.split("---")
            for(let i = item.options.length - 1; i > 0; i--){
              let j = Math.floor(Math.random() * i)
              let temp = item.options[i]
              item.options[i] = item.options[j]
              item.options[j] = temp
            }
          }
          this.questionData.push(item);
          let questionProgressObj = {
            question_id:item.id,
            active:false,
            correct_answer:false,
            user_answer:""
          }
          this.questionProgress.push(questionProgressObj);
        })
        this.questionStepper = 1;
      })
    },


    resetAnswerAttempt(){
      let findQuestion = this.questionData[this.questionStepper - 1];
      let findQuestionProgress = this.questionProgress.find(i => i.question_id == findQuestion.id);
      if(findQuestionProgress.correct_answer == false && findQuestionProgress.active == true){
        findQuestionProgress.active = false;
      }
    },


    checkAnswer(){
      let findQuestion = this.questionData[this.questionStepper - 1];
      let findQuestionProgress = this.questionProgress.find(i => i.question_id == findQuestion.id);
      let correctValue = findQuestion.correct_answer.toLowerCase().trim();
      let userAnswer = this.selectedValue.toLowerCase().trim();
      if(findQuestion.type == 'text_sort'){
        userAnswer = findQuestion.options.join("").toLowerCase();
      }
      if(correctValue != userAnswer){
        this.currentAttempts++;
        findQuestionProgress.active = true;
        findQuestionProgress.user_answer = this.selectedValue;
        findQuestionProgress.correct_answer = false;
      } else {
        this.currentAttempts++;
        findQuestionProgress.active = true;
        findQuestionProgress.user_answer = this.selectedValue;
        findQuestionProgress.correct_answer = true;
      }
      this.setPaginationStatusColors()
    }
  },

  mounted(){
    this.getTask();
    if(this.questionData.length != 0 && this.questionData[this.questionStepper - 1].type == "text_sort"){
      this.selectedValue = "text_sort";
    }
  },

  computed:{
    checkQuestionProgress(){
      let findQuestion = this.questionData[this.questionStepper - 1]
      let findQuestionProgress = this.questionProgress.find(i => i.question_id == findQuestion.id);
      if(findQuestionProgress.correct_answer == true && findQuestionProgress.active == true){
        return "correctAnswer"
      }
      else if(findQuestionProgress.correct_answer == false && findQuestionProgress.active == true){
        return "wrongAnswer"
      }
      else{
        return "notAnswered"
      }
    },


    setPagnationColors(){
      let findQuestion = this.questionData[this.questionStepper - 1];
      let findQuestionProgress = this.questionProgress.find(i => i.question_id == findQuestion.id);
      if(findQuestionProgress.correct_answer == true && findQuestionProgress.active == true){
        return "success"
      } else if (findQuestionProgress.correct_answer == false && findQuestionProgress.active == true){
        return "error"
      } else {
        return ""
      }
    }
  },

  watch:{
    questionStepper(){
      let findQuestionProgress = this.questionProgress[this.questionStepper - 1];
      this.selectedValue = findQuestionProgress.user_answer ? findQuestionProgress.user_answer : null;
      if(this.questionData[this.questionStepper - 1].type == "text_sort"){
        this.selectedValue = "text_sort";
      }
    },
  }
}
</script>

<style scoped>
.radioAlignClass{
  display:flex;
  align-items:center;
  justify-content:center;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
.sortableQuestion:hover{
  background-color: #546E7A;
  color:#fff;
  cursor:pointer;
  border-radius:5px;
}
.displayCircleStyle {
 height: 30px;
 width: 30px;
 background-color: #f6f7fa;
 color:#1a8096;
 border-radius: 50%;
 display: inline-block;
 text-align: center;
 padding-top:5px;
}
.textColorList{
  color:#616161;
  
}
.correctAnswerStyle{
  background-color:green !important;
}
.incorrectAnswerStyle{
  background-color:red;
}
</style>
