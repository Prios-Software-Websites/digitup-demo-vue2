<template>
  <div>
    Form Page

    <!-- Bruker går inn og velger at han/hun vil gjennomføre skjema
      fyll in epost.
      Trigg en funksjon som registrerer denne eposten mot ett skjema ID i form_builder_responses tabellen.
        - Bruker får en epost, med lenke til skjemabesvarelsen.

      ** Ekstern Side for skjemabesvarelse?
        - Eller ekstra side innad på siden. (Bruk localstorage for å registrere dette.)
    -->

    <!-- Bruker fyller inn skjemaet (uansett side)
      Svarene på hovedskjema blir lagret som tenkt (med resultatkategorier)
        - Extraskjema (trender) vil bli fylt ut, men ikke lagret i followup databasen.
          - Localstorage for lagring? Trengs dette?

      - Mening: Bruker fyller enten inn alt av data på en gang, eller må starte igjen.
        - Eller Bruke localhost til større lagring av data, og slette denne på ny epost registrering eller fullføring av skjema.
    -->

    <!-- Skjemaet er fylt ut, og resultatet er generert på klientsiden og PDF blir laget.
      - PDF Side 1: Bruker data. (Må fylle ut dette før på epost siden)
      - Statestikk fra hovedside (data fra Followup)
      - Statestikk over trender i en egen seksjon eller kombinert med statestikken fra hovedsiden.
      - SWOT tekst slik vi ønsker å vise den.
    -->

    <!-- PDF sendes til bruker og kopi til oss i Prios (eller i filopplasteren som bevis på gjennomført test)  -->

    <!-- Bruker må få ett valg om å slette data fra databasen, etter at prøven er gjennomført. -->

    <!-- Vi skal sitte igjen med: PDF og Svarene lagret i mappintool i followup -->

    

    <!-- Jeg trenger:
      1. Datagrunnlag.
      2. Ønsket oppsett.
      3. Utregnings grunnlag
    -->
























    adadwdqd

    

    
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },

  // Calculations

  // Submit and send to DB + Email
  
  // 

}
</script>

<style scoped>

</style>