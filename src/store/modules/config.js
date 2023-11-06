import { FILTER_RULES } from '@/constants'
import { applyFilters, applySort } from '@/utils'
export default {
  namespaced: true,
  state: {
    config: {
      fields: [
        { id: 'name', validation: (value) => value?.length > 3, type: 'text' },
        { id: 'phone', type: 'number', validation: (value) => value?.length < 10 },
        { id: 'email', type: 'text' }
      ]
    },
    items: [
      {
        name: 'alla',
        phone: 3,
        email: 'bem7@gmail.com'
      },
      {
        name: 'alla',
        phone: 110,
        email: 'aaaaaa7@gmail.com'
      },
      {
        name: 'Cem',
        phone: 10,
        email: 'js@gmail.com'
      },
      {
        name: 'Boris',
        phone: 5,
        email: 'css251617@gmail.com'
      },
      {
        name: 'sidor',
        phone: 45,
        email: 'vhunko251617@gmail.com'
      },
      {
        name: 'Xoy',
        phone: 6,
        email: 'vhunko251617@gmail.com'
      },
      {
        name: 'pon',
        phone: 12,
        email: 'vhunko251617@gmail.com'
      },
      {
        name: 'alla',
        phone: 90,
        email: 'bem7@gmail.com'
      },
      {
        name: 'alla',
        phone: 100,
        email: 'bem7@gmail.com'
      },
      {
        name: 'alla',
        phone: 2,
        email: 'bem7@gmail.com'
      },
      {
        name: 'Cem',
        phone: 80,
        email: 'js@gmail.com'
      },
      {
        name: 'Boris',
        phone: 70,
        email: 'css251617@gmail.com'
      },
      {
        name: 'sidor',
        phone: 60,
        email: 'stasbelinsky@gmail.com'
      },
      {
        name: 'Xoy',
        phone: 50,
        email: 'rommmmmmmmmmmaaa@gmail.com'
      },
      {
        name: 'pon',
        phone: 40,
        email: 'xantos@gmail.com'
      }
    ],
    filterRules: {
      include: [],
      exclude: []
    },
    currentRule: {},
    sortBy: []
  },
  getters: {
    getConfigFields: (state) => state.config.fields,
    getFilterRules: (state) => state.filterRules,
    getSortBy: (state) => state.sortBy,
    getItems: (state) => state.items,
    getFormData: (state) => {
      return state.config.fields.reduce((obj, field) => {
        obj[field.id] = ''
        return obj
      }, {})
    },
    getFilteredItems(state) {
      const filteredItems = applyFilters(state.items, state.filterRules)
      return applySort(filteredItems, state.sortBy)
    },
    getOptions(state) {
      return state.config.fields.map((field) => ({
        value: field.id,
        label: field.id,
        type: field.type
      }))
    }
  },
  actions: {
    setSortBy({ commit }, data) {
      commit('SET_SORT_BY', data)
    },
    removeSortByFields({ commit }, data) {
      commit('REMOVE_SORT_BY_FIELDS', data)
    },
    addItem({ commit }, data) {
      commit('ADD_ITEM', data)
    },
    removeItem({ commit }, data) {
      commit('REMOVE_ITEM', data)
    },
    setFilterRule({ commit }, data) {
      commit('SET_FILTER_RULE', data)
    },
    removeFilterRule({ commit }, data) {
      commit('REMOVE_FILTER_RULE', data)
    }
  },
  mutations: {
    ADD_ITEM(state, data) {
      state.items.push(data)
    },
    REMOVE_ITEM(state, data) {
      state.items.splice(data, 1)
    },
    SET_FILTER_RULE(state, data) {
      if (data.type === FILTER_RULES.INCLUDE) {
        state.filterRules.include.push(data.rule)
      } else if (data.type === FILTER_RULES.EXCLUDE) {
        state.filterRules.exclude.push(data.rule)
      }
    },
    REMOVE_FILTER_RULE(state, { type, index }) {
      if (type === FILTER_RULES.INCLUDE) {
        state.filterRules.include.splice(index, 1)
      } else if (type === FILTER_RULES.EXCLUDE) {
        state.filterRules.exclude.splice(index, 1)
      }
    },
    SET_SORT_BY(state, data) {
      state.sortBy = data
    },
    REMOVE_SORT_BY_FIELDS(state, data) {
      state.sortBy.splice(data, 1)
    }
  }
}
