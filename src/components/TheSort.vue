<template>
  <div class="flex flex-col gap-4">
    <el-select-v2
      v-model="sortFields"
      :options="getOptions"
      placeholder="Виберіть поля сортування в таблиці"
      multiple
    />
    <ul v-if="getSortBy.length">
      <li
        v-for="(rule, index) in getSortBy"
        :key="index"
        class="flex items-center justify-between gap-4"
      >
        {{ rule }}
        <button class="p-2 font-bold" @click="removeSortByFields(index)">Видалити</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheSort',
  computed: {
    ...mapGetters('config', ['getSortBy', 'getConfigFields', 'getOptions']),
    sortFields: {
      set(value) {
        this.setSortBy(value)
      },
      get() {
        return this.getSortBy
      }
    }
  },
  methods: {
    ...mapActions('config', ['removeSortByFields', 'setSortBy'])
  }
}
</script>
