<template>
  <div class="flex flex-col gap-4">
    <el-select-v2
      v-model="filterKeyRule"
      :options="getOptions"
      placeholder="Виберіть поля фільтрації"
      multiple
    />
    <div v-for="option in filterKeyRule" :key="option" class="flex flex-col mb-4">
      <label class="capitalize font-bold" :for="option">{{ option }}</label>
      <input
        v-model="formData[option]"
        :type="getInputType(option)"
        :id="option"
        class="border rounded-sm p-1"
      />
    </div>
    <div class="flex gap-2">
      <el-button
        class="w-full"
        type="primary"
        :disabled="isDisabledAddButton"
        @click="addFilterRule(FILTER_RULES.INCLUDE)"
        >Додати до Include</el-button
      >
      <el-button
        class="w-full"
        :disabled="isDisabledAddButton"
        @click="addFilterRule(FILTER_RULES.EXCLUDE)"
      >
        Додати до Exclude</el-button
      >
    </div>
    <template v-if="getFilterRules.include.length">
      <span class="font-bold">Include</span>
      <ul class="flex flex-col gap-2">
        <li
          v-for="(rule, index) in getFilterRules.include"
          :key="index"
          class="flex items-center justify-between gap-4"
        >
          {{ rule }}
          <el-button @click="removeFilterItem(FILTER_RULES.INCLUDE, index)">Видалити</el-button>
        </li>
      </ul>
    </template>
    <template v-if="getFilterRules.exclude.length">
      <span class="font-bold">Exclude</span>
      <ul class="flex flex-col gap-2">
        <li
          v-for="(rule, index) in getFilterRules.exclude"
          :key="index"
          class="flex items-center justify-between gap-4"
        >
          {{ rule }}
          <el-button @click="removeFilterItem(FILTER_RULES.EXCLUDE, index)">Видалити</el-button>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { FILTER_RULES } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
import { areObjectValuesEmpty } from '@/utils'
export default {
  name: 'TheSidebar',
  data() {
    return {
      filterKeyRule: '',
      formData: {}
    }
  },
  computed: {
    FILTER_RULES() {
      return FILTER_RULES
    },
    ...mapGetters('config', ['getFilterRules', 'getConfigFields', 'getOptions']),
    isDisabledAddButton() {
      if (!Object.keys(this.formData).length) return true
      return areObjectValuesEmpty(this.formData)
    }
  },
  methods: {
    ...mapActions('config', ['setFilterRule', 'removeFilterRule']),
    addFilterRule(type) {
      this.setFilterRule({
        type,
        rule: this.formData
      })
      this.formData = {}
      this.filterKeyRule = ''
    },
    removeFilterItem(type, index) {
      this.removeFilterRule({ type, index })
    },
    getInputType(option) {
      return this.getOptions.find((item) => item.value === option).type
    }
  }
}
</script>
