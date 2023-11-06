<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded"
    >
      <tr>
        <th v-for="property in fields" :key="property" scope="col" class="px-6 py-3">
          {{ property.id }}
        </th>
        <th scope="col" class="px-6 py-3"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in getFilteredItems"
        :key="item.id"
        class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
      >
        <td v-for="property in fields" :key="property" class="px-6 py-4">
          {{ item[property.id] }}
        </td>
        <td class="px-6 py-4 text-end">
          <button @click="removeItem(index)">Видалити</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TheTable',
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('config', ['getFilteredItems'])
  },
  methods: {
    ...mapActions('config', ['removeItem'])
  }
}
</script>
