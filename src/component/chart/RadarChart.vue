<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  props: ["data", "options"],
  mounted() {
    this.renderChartData();
  },
  methods: {
    renderChartData() {
      this.renderChart(this.data, this.options);
    }
  }
};
</script>

<style>
.barchart{
  padding: 0 30px;
  height: 328px;
  border: 1px solid #DCDCDC;
}
</style>