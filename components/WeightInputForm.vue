<template>
  <div class="hero min-h-screen">
    <div class="flex-col justify-center hero-content">
      <div class="text-center lg:text-left">
        <h1 class="mb-5 text-5xl font-bold">Body data input</h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Weight</span>
            </label>
            <input
              v-model="kg"
              type="number"
              step="0.1"
              placeholder="kg"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Bodyfat %</span>
            </label>
            <input
              v-model="fat"
              type="number"
              step="0.1"
              placeholder="%"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Muscle %</span>
            </label>
            <input
              v-model="muscle"
              type="number"
              step="0.1"
              placeholder="%"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Visceral Fat</span>
            </label>
            <input
              v-model="visceralFat"
              type="number"
              placeholder="10"
              class="input input-bordered"
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
      loading: false,
    }
  },
  async created() {
    const { data: healthMetric} = await this.$supabase
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
        const { error } = await this.$supabase
          .from('health_metric')
          .insert([
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

