<template>
  <div class="w-full max-w-4xl">
    <form @submit.prevent="addNewItem" class="bg-white p-8">
      <div v-for="field in getConfigFields" :key="field.id" class="flex flex-col mb-4">
        <label class="capitalize font-bold" :for="field.id">{{ field.id }}</label>
        <input
          v-model="formData[field.id]"
          :id="field.id"
          :type="field.type"
          :class="inputClasses(field)"
        />
      </div>
      <div class="flex gap-4">
        <el-button
          class="w-full"
          type="primary"
          native-type="submit"
          :disabled="isDisabledAddButton"
          >Додати
        </el-button>
        <el-button class="w-full" @click="openSidebar">Налаштування</el-button>
      </div>
    </form>
    <TheTable v-if="getFilteredItems.length" :fields="getConfigFields" />
  </div>
</template>

<script>
import TheTable from '@/components/TheTable.vue'
import { mapActions, mapGetters } from 'vuex'
import { ElNotification } from 'element-plus'
import { areObjectValuesEmpty } from '@/utils'

export default {
  name: 'MainForm',
  components: { TheTable },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    ...mapGetters('config', ['getFormData', 'getItems', 'getFilteredItems', 'getConfigFields']),
    isDisabledAddButton() {
      if (!Object.keys(this.formData).length) return true
      return areObjectValuesEmpty(this.formData, this.getConfigFields)
    }
  },
  methods: {
    ...mapActions('sidebar', ['openSidebar']),
    ...mapActions('config', ['addItem', 'removeItem']),
    inputClasses(field) {
      return [
        'border rounded-md p-2',
        {
          'border-red-700':
            this.formData[field.id] &&
            field.validation &&
            !field.validation(this.formData[field.id].toString())
        }
      ]
    },
    addNewItem() {
      if (this.validateForm()) {
        this.addItem(this.formData)
        this.formData = {}
      }
    },
    validateForm() {
      for (const field of this.getConfigFields) {
        if (field.validation && !field.validation(this.formData[field.id].toString())) {
          this.showValidationError(field.id)
          return false
        }
      }
      return true
    },
    showValidationError(field) {
      ElNotification({
        title: 'Validation Error',
        message: `Field ${field} is not valid`,
        type: 'error'
      })
    }
  }
}
</script>
