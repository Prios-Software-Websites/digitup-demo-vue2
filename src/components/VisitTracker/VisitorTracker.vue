<template>
  <div> </div>
</template>

<script>
export default {
  data(){
    return {
      // accessKey:process.env.VUE_APP_API_KEY,
      accessKey:window.btoa('bac436b32a36431bb437b9509b6d3495'),
      visitor: {
        project: "Inprofuture",
        location: "",
      },
      hasVisited: 'no'
    }
  },
  mounted(){
    this.isFirstTimeVisitor();
  },
   methods: {

    /* Check if user have been to this page before (yes = do nothing,  no = add unique visitor to localhost and database) */
    isFirstTimeVisitor(){
      const firstTimeVIsitor = localStorage.getItem('hasVisitedPage');
      if(firstTimeVIsitor == 'yes') {
        console.log("Been here Before")
      } else {
        console.log("First Timer")
        this.setUserLocalStorage();
        this.submitUserVisited();
      }
    },

    /* Give localstorage a key, defining that this user have now visited the page */
    setUserLocalStorage(){
      localStorage.setItem('hasVisitedPage', 'yes');
    },

    /* Get needed project and user locale data, to registrer user as an unique one 
      - Get location
      - Set it into an variable
      - Get pute object out of the variable crated
      - Send to Database
    */
    submitUserVisited(){
      const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.visitor.location = location;
      const finalData = JSON.parse(JSON.stringify(this.visitor));
      this.$http.post('https://app.followup.prios.no/api/page_visitor', finalData,{headers:{Tempaccess:this.accessKey}}).then(()=> {
        console.log("sent")
      })
    },
  }
}
</script>
