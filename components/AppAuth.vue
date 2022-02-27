<template>
  <div>
    <NuxtLink to="/input">Input</NuxtLink>
    <form class="flex" @submit.prevent="handleLogin">
      <div class="">
        <h1 class="">Supabase + Vue 3</h1>
        <p class="">Sign in via magic link with your email below</p>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Your email address</span>
          </label>
          <input
            v-model="email"
            type="text"
            placeholder="Your email"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="submit"
            class="btn"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
    <button class="btn" @click="signOut()">Logout</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      loading: false,
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true
        const { error } = await this.$supabase.auth.signIn({ email: this.email })
        if (error) throw error
        alert('Check your email for the login link!')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loading = false
      }
    },
    async signOut() {
      const { error } = await this.$supabase.auth.signOut()
      if (error) throw error
    },
  },
}
</script>

