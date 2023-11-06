import { TYPES } from '@/constants'
export const applyFilters = (items, filterRules) => {
  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const { include = [], exclude = [] } = filterRules

  const matchesIncludeRule = (item, rule) =>
    Object.entries(rule).every(([key, value]) =>
      item[key]?.toString().toLowerCase().includes(value.toString().toLowerCase())
    )
  const matchesExcludeRule = (item, rule) =>
    Object.entries(rule).some(([key, value]) =>
      item[key]?.toString().toLowerCase().includes(value.toString().toLowerCase())
    )

  const filteredByInclude = include.length
    ? items.filter((item) => include.some((rule) => matchesIncludeRule(item, rule)))
    : items

  const filteredByExclude = exclude.length
    ? filteredByInclude.filter((item) => !exclude.some((rule) => matchesExcludeRule(item, rule)))
    : filteredByInclude

  return filteredByExclude
}

export const applySort = (items, sortBy) => {
  const sortedItems = items.slice()

  sortedItems.sort((a, b) => {
    for (const field of sortBy) {
      if (typeof a[field] === TYPES.NUMBER && typeof b[field] === TYPES.NUMBER) {
        if (a[field] < b[field]) return -1
        if (a[field] > b[field]) return 1
      } else if (typeof a[field] === TYPES.STRING && typeof b[field] === TYPES.STRING) {
        const comparison = a[field].localeCompare(b[field])
        if (comparison !== 0) {
          return comparison
        }
      }
    }
    return 0
  })

  return sortedItems
}

export const areObjectValuesEmpty = (obj, config) => {
  const configDataLength = Object.keys(config || {}).length
  const formDataLength = Object.keys(obj).length

  if (configDataLength && configDataLength !== formDataLength) {
    return true
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]

      if (value === null || value === undefined || value === '') {
        return true
      }
    }
  }

  return false
}
