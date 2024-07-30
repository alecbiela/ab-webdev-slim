import {
  createApp,
  reactive,
} from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js'
import { getTitleCase, asyncGetJSON, smoothScroll } from './util.min.js'

document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  // Global store for the entire page
  const store = reactive({
    navOpen: false,
    content: {
      generic: { hero_rotator: [], about: { heading: '', body: '' } },
    },
    util: { getTitleCase },
  })

  // Handles loading page content
  // Uses Promise.all() to remove the loading overlay once content is loaded
  const loadContent = async () => {
    let promises = []
    // promises.push(
    //   await asyncGetMarkdown('/content/about.md').then(
    //     (text) => (store.content.about = text)
    //   )
    // )

    promises.push(
      await asyncGetJSON('https://files.ab-web.dev/json/generic.json').then(
        (json) => (store.content.generic = json)
      )
    )
    promises.push(
      await asyncGetJSON('/content/my_stack').then(
        (json) => (store.content.my_stack = json)
      )
    )
    promises.push(
      await asyncGetJSON('/content/academic_work').then(
        (json) => (store.content.academic_work = json)
      )
    )
    promises.push(
      await asyncGetJSON(
        'https://files.ab-web.dev/json/personal_projects.json'
      ).then((json) => (store.content.personal_projects = json))
    )
    Promise.all(promises).then(() => document.body.classList.remove('loading'))
  }

  // Main initialization logic, runs when petite-vue gets mounted
  const handleOnMount = () => {
    //set honeypot
    document.getElementById('hhpp').value = 'check'

    //init smooth scrolling functionality
    smoothScroll()

    //get page content
    loadContent()

    //close the nav when the anchor links smooth-scroll
    document.addEventListener(
      'navigation-closed',
      () => (store.navOpen = false)
    )
  }

  // Handle clicking on the social links in the contact callout
  // Prevents link scraping and allows for honeypot usage
  const handleSocialLinks = (e) => {
    if (document.getElementById('hhpp').value === 'check') {
      switch (e.submitter.id) {
        case 'bt_em':
          window.open('mailto:alec.bielanos@gmail.com', '_blank')
          break
        case 'bt_li':
          window.open('https://www.linkedin.com/in/alec-bielanos/', '_blank')
          break
        case 'bt_gh':
          window.open(
            'https://bitbucket.org/alecbiela/workspace/repositories/',
            '_blank'
          )
          break
      }
    }
  }

  createApp({
    // Share this info with the app scope (in this case, the whole page)
    store,
    handleSocialLinks,
    handleOnMount,
  }).mount()
})
