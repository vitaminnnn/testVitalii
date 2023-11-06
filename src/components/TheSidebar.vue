<template>
  <aside
    class="fixed z-10 right-0 flex bg-white flex-col p-8 rounded w-[420px] h-screen gap-6 max-md:w-full max-md:p-4"
  >
    <div class="flex flex-col justify-between gap-4">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg">Налаштування:</h3>
        <button @click="closeSidebar">X</button>
      </div>
      <TheFilters />
      <div class="h-px w-full bg-gray-950"></div>
      <TheSort />
    </div>
  </aside>
</template>

<script>
import TheFilters from '@/components/TheFilters.vue'
import TheSort from '@/components/TheSort.vue'
import { mapActions } from 'vuex'

export default {
  name: 'TheSidebar',
  components: {
    TheFilters,
    TheSort
  },
  methods: {
    ...mapActions('sidebar', ['closeSidebar'])
  }
}
</script>
