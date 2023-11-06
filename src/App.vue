<template>
  <div class="app">
    <div class="container">
      <TheSidebar v-if="getSidebarIsOpen" />
      <main class="flex items-center justify-center h-full p-8">
        <MainForm />
      </main>
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'
import MainForm from '@/components/MainForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MainApp',
  components: {
    TheSidebar,
    MainForm
  },
  computed: {
    ...mapGetters('sidebar', ['getSidebarIsOpen'])
  }
}
</script>
