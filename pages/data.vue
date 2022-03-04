<template>
  <div class="bg-base-200">
    <div class="container mx-auto">
      <NuxtLink to="/input" class="btn">Input</NuxtLink>
      <health-metric-table />
    </div>
  </div>
</template>

<script>
import HealthMetricTable from '~/components/HealthMetricTable.vue'
export default {
  name: 'DataPage',
  components: { HealthMetricTable },
}
</script>
