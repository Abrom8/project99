<template>
  <div>
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <div class="flex gap-2 flex-nowrap">
      <button class="btn btn-square" @click="decreaseValue()">-</button>
      <input
        :value="currentValue"
        type="number"
        :step="step"
        :placeholder="placeholder"
        class="input input-bordered"
      />
      <button class="btn btn-square" @click="increaseValue()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal
    },
  },
  methods: {
    increaseValue() {
      this.currentValue = (parseFloat(this.currentValue) + this.step).toFixed(1)
      this.$emit('input', parseFloat(this.currentValue))
    },
    decreaseValue() {
      this.currentValue = (parseFloat(this.currentValue) - this.step).toFixed(1)
      this.$emit('input', parseFloat(this.currentValue))
    },
  },
}
</script>

