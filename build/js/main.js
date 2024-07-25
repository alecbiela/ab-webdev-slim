import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
// import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
// import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs'

document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  // Converts strings from snake case to title case
  const getTitleCase = (str) => {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1))
      .join(' ')
  }

  // Global store for the entire page
  const store = reactive({
    count: 0,
    navOpen: false,
    content: {
      generic: { hero_rotator: [], about: { heading: '', body: '' } },
    },
    util: { getTitleCase },
  })

  // Load up all the content from the markdown files
  // const asyncGetMarkdown = async (url) => {
  //   try {
  //     const res = await fetch(url, {
  //       headers: {
  //         'Content-Type': 'text/plain',
  //       },
  //     })
  //     if (!res.ok) {
  //       throw new Error(
  //         `Getting content failed at URL ${url} with error status ${res.status}`
  //       )
  //     }
  //     const text = await res.text()
  //     return DOMPurify.sanitize(marked(text))
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }

  // Load up all the content from the markdown files
  const asyncGetJSON = async (url) => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        throw new Error(
          `Getting JSON failed at URL ${url} with error status ${res.status}`
        )
      }
      return await res.json()
    } catch (error) {
      console.error(error.message)
    }
  }

  const loadContent = async () => {
    let promises = []
    // promises.push(
    //   await asyncGetMarkdown('/content/about.md').then(
    //     (text) => (store.content.about = text)
    //   )
    // )

    promises.push(
      await asyncGetJSON('/content/generic.json').then(
        (json) => (store.content.generic = json)
      )
    )
    promises.push(
      await asyncGetJSON('/content/my_stack.json').then(
        (json) => (store.content.my_stack = json)
      )
    )
    promises.push(
      await asyncGetJSON('/content/academic_work.json').then(
        (json) => (store.content.academic_work = json)
      )
    )
    promises.push(
      await asyncGetJSON('/content/personal_projects.json').then(
        (json) => (store.content.personal_projects = json)
      )
    )
    Promise.all(promises).then(() => document.body.classList.remove('loading'))
  }

  // Set up smooth scrolling on all anchor links
  const smoothScroll = () => {
    let x = document.querySelectorAll('a[href*="#"]')
    for (let i = 0; i < x.length; i++) {
      x[i].onclick = (e) => {
        e.preventDefault()
        const ele = document.querySelector(e.target.hash)
        window.scrollTo({
          top: ele.offsetTop - 90,
          left: 0,
          behavior: 'smooth',
        })
        document
          .getElementById('nav_toggle')
          .setAttribute('aria-expanded', 'false')
        ele.focus()
        return false
      }
    }
  }

  // Main initialization logic, runs when petite-vue gets mounted
  const handleOnMount = () => {
    //set honeypot
    document.getElementById('hhpp').value = 'check'

    //init smooth scrolling functionality
    smoothScroll()

    //get page content
    loadContent()
  }

  // Form submit for social links
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
    // share it with app scopes
    store,
    handleSocialLinks,
    handleOnMount,
  }).mount()
})
