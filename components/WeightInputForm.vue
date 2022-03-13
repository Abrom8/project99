<template>
  <div class="hero min-h-screen">
    <div class="flex-col justify-center hero-content">
      <div class="text-center lg:text-left">
        <h1 class="mb-5 text-5xl font-bold">Body data input</h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <number-input
              :value="kg"
              :step="0.1"
              label="Weight kg"
              @input="kg = $event"
            />
            <number-input
              :value="fat"
              :step="0.1"
              label="Bodyfat %"
              @input="fat = $event"
            />
            <number-input
              :value="muscle"
              :step="0.1"
              label="Muscle %"
              @input="muscle = $event"
            />
            <number-input
              :value="visceralFat"
              :step="1"
              label="Visceral Fat"
              @input="visceralFat = $event"
            />
          </div>

          <div class="form-control mt-6">
            <input
              type="button"
              value="Save"
              class="btn btn-primary"
              :class="{ loading: loading }"
              @click="submitHealthMetrics()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kg: 0,
      fat: 0,
      muscle: 0,
      visceralFat: 0,
      test: 99,
      loading: false,
    }
  },
  async created() {
    const { data: healthMetric } = await this.$supabase
      .from('health_metric')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single()
    if (healthMetric) {
      this.kg = healthMetric.weight_kg
      this.fat = healthMetric.fat_percentage
      this.muscle = healthMetric.muscle_percantage
      this.visceralFat = healthMetric.visceral_fat
    }
  },
  methods: {
    async submitHealthMetrics() {
      try {
        this.loading = true
        const { error } = await this.$supabase.from('health_metric').insert([
          {
            date: new Date(),
            fat_percentage: this.fat,
            muscle_percantage: this.muscle,
            visceral_fat: this.visceralFat,
            weight_kg: this.kg,
          },
        ])
        if (error) throw error
        alert('Submitted!')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

