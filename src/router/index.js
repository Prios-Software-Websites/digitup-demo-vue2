import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Newss from '../views/News.vue'
// Due to lack of time, rename of files is not done - see readme.md file
import TrainingModules from '../views/TrainingModules.vue'
import DigitalLearningDesign from '../views/DigitalLearningDesign.vue'
import DigitalPedagogicalStrategy from '../views/DigitalPedagogicalStrategy.vue'
import Resources from '../views/Resources.vue'
import Partners from '../views/Partner.vue'
import Handbook from '../views/Handbook.vue'
import MappingTool from "../views/MappingTools.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/partners', name: 'Partner', component: Partners },
  { path: '/news', name: 'News', component: Newss },
  // { path: '/mappingtool', name: 'Mappingtool', component: TrainingModules },
  { path: '/mappingtool', name: 'Mappingtool', component: MappingTool },
  { path: '/digitallearningdesign', name: 'DigitalLearningDesign', component: DigitalLearningDesign },
  { path: '/digitalpedagogicalstrategy', name: 'DigitalPedagogicalStrategy', component: DigitalPedagogicalStrategy },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/handbook', name: 'Handbook', component: Handbook },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
