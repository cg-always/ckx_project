import { defineStore } from 'pinia'
import { isApiAvailable, glossaryAPI, casesAPI, linksAPI, templatesAPI } from '../api/index.js'
import { staticGlossary, staticCases, staticLinks, staticTemplates } from '../data/static.js'

export const useDataStore = defineStore('data', {
  state: () => ({
    apiOnline: false,
    glossary: [],
    cases: [],
    links: [],
    templates: [],
    loading: false,
    error: null
  }),

  actions: {
    async checkApi() {
      this.apiOnline = await isApiAvailable()
    },

    async fetchGlossary(params = {}) {
      this.loading = true
      try {
        if (this.apiOnline) {
          const res = await glossaryAPI.getAll(params)
          this.glossary = res.data.data || []
        } else {
          let items = [...staticGlossary]
          if (params.category && params.category !== 'all') {
            items = items.filter(i => i.category === params.category)
          }
          if (params.search) {
            const s = params.search.toLowerCase()
            items = items.filter(i => i.en.toLowerCase().includes(s) || i.cn.includes(s) || i.definition.includes(s))
          }
          this.glossary = items
        }
      } catch (err) {
        // fallback to static
        this.glossary = staticGlossary
      }
      this.loading = false
    },

    async fetchCases() {
      try {
        if (this.apiOnline) {
          const res = await casesAPI.getAll()
          this.cases = res.data.data || []
        } else {
          this.cases = staticCases
        }
      } catch {
        this.cases = staticCases
      }
    },

    async fetchLinks(category = 'all') {
      try {
        if (this.apiOnline) {
          const params = category !== 'all' ? { category } : {}
          const res = await linksAPI.getAll(params)
          this.links = res.data.data || []
        } else {
          this.links = category === 'all' ? staticLinks : staticLinks.filter(l => l.category === category)
        }
      } catch {
        this.links = staticLinks
      }
    },

    async fetchTemplates() {
      try {
        if (this.apiOnline) {
          const res = await templatesAPI.getAll()
          this.templates = res.data.data || []
        } else {
          this.templates = staticTemplates
        }
      } catch {
        this.templates = staticTemplates
      }
    }
  }
})
