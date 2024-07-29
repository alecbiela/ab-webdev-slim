/**
 * A collection of some basic utility functions/helpers
 * getTitleCase - transforms strings to "Title Case"
 * asyncGetMarkdown and asyncGetJSON - gets md/json content by file name
 * smoothScroll - hooks up anchor links as scrolling targets, rather than instant-jumping
 */

'use strict'

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs'

// An event to emit that updates the navigation state to closed (used in main.js)
const navClosed = new CustomEvent('navigation-closed', {
  bubbles: true,
  cancelable: true,
  detail: 'The navigation was closed.',
})

// Converts strings from snake case to title case
const getTitleCase = (str) => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1))
    .join(' ')
}

// Load up all the content from the markdown files
const asyncGetMarkdown = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    if (!res.ok) {
      throw new Error(
        `Getting content failed at URL ${url} with error status ${res.status}`
      )
    }
    const text = await res.text()
    return DOMPurify.sanitize(marked(text))
  } catch (error) {
    console.error(error.message)
  }
}

// Load up all the content from the markdown files
const asyncGetJSON = async (url) => {
  try {
    // const res = await fetch(url, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'no-cors',
    //   method: 'GET',
    // })
    const res = await fetch(url)
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
      document.dispatchEvent(navClosed)
      ele.focus()
      return false
    }
  }
}

export { getTitleCase, asyncGetJSON, asyncGetMarkdown, smoothScroll }
