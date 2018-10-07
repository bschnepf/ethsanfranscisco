import Vue from 'vue'
import Router from 'vue-router'
import MainTemplate from '../components/main-template.vue'
import SearchTemplate from '../components/search-template.vue'
import ExplorerTemplate from '../components/explorer-template.vue'
import ProjectTemplate from '../components/project-template.vue'
import addProjectTemplate from '../components/add-project-template.vue'

import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({y: 0}),
    routes: [
      {path: '/', name: 'mainTemplate', component: MainTemplate},
      {path: '/search', name: 'searchTemplate', component: SearchTemplate},
      {path: '/explorer', name: 'explorerTemplate', component: ExplorerTemplate},
      {path: '/project', name: 'projectTemplate', component: ProjectTemplate},
      {path: '/addProject', name: 'addProjectTemplate', component: addProjectTemplate}
    ]
  })
}
