<template>
  <div class="bg-base-200">
    <div class="container mx-auto">
      <app-auth/>
    </div>
  </div>
</template>

<script>
import AppAuth from '~/components/AppAuth.vue'
export default {
  name: 'IndexPage',
  components: { AppAuth },
}
</script>
