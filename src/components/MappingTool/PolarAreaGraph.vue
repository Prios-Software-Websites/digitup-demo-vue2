<script>
export default {};
</script>

<style scoped></style>


<script>
import VueChartJs from "vue-chartjs";
import Chart from "chart.js";
export default {
  extends: VueChartJs.PolarArea,
  props: {
    propsChartData: {
      type: Array
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            backgroundColor: [
              '#FF8A6580',
              '#4DB6AC80',
              '#BA68C880',
              '#7986CB80',
              '#DCE77580'
            ],
            data: [],
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scale:{
          ticks: {
            display: true,
            max:100,
            min:0,
            stepSize: 20
          },
          pointLabels: {
            display: true,
            centerPointLabels: true,
            fontSize:18,
          }
        },
        maintainAspectRatio: false,
        tooltips:{
          enabled:true,
          callbacks: {
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index] + ": " + tooltipItem[0].label + "%"
              },
            },
        }
      }
    };
  },
  methods: {
    renderBarChart() {
      console.log("i ran")
      let _self = this;
      console.log(_self.propsChartData)
      _self.chartData.labels = [];
      _self.chartData.datasets[0].data = [];
      _self.propsChartData.forEach(item =>{
        _self.chartData.labels.push(item.category_name)
        _self.chartData.datasets[0].data.push(item.score);
      })
      _self.renderChart(_self.chartData, _self.chartOptions);
    }
  },
  computed:{
    watchRenderChange(){
      return this.$store.state.updateBarChartsFormBuilder;
    }
  },
  mounted() {
    this.renderBarChart();
  },
  watch:{
    watchRenderChange(){
      this.renderBarChart();
    }
  }
};
</script>

<style lang="css" scoped>
.expansion-margin-fix.v-expansion-panel__container:not(last-child) {
  margin-bottom: 24px;
}
</style>
