<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
          <th>Fat %</th>
          <th>Muscle %</th>
          <th>Visceral Fat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="metric in healthMetrics" :key="metric.id">
          <th>{{ metric.date }}</th>
          <td>{{ metric.weight_kg }}</td>
          <td>{{ metric.fat_percentage }}</td>
          <td>{{ metric.muscle_percantage }}</td>
          <td>{{ metric.visceral_fat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthMetrics: [],
    }
  },
  async created() {
    const { data } = await this.$supabase
      .from('health_metric')
      .select('*')
      .order('date', { ascending: false })
    this.healthMetrics = data
  },
}
</script>

