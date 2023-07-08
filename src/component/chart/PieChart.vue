<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
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

</style>