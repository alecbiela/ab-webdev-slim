import { createApp, reactive } from "https://unpkg.com/petite-vue?module";

window.onload = (() => {
  "use strict";

  /* -- Removed light/dark mode switching for now --
    let isLight = !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const html = document.documentElement;
    const switchTheme = document.getElementById('theme_switcher');
    const os_default = '<svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/></svg>';
    const sun = '<svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 11a3 3 0 1 1 0-6a3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>';
    const moon = '<svg viewBox="0 0 16 16"><g fill="currentColor"><path d="M6 .278a.768.768 0 0 1 .08.858a7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277c.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316a.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71C0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29c0-1.167.242-2.278.681-3.286z"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/></g></svg>';
    switchTheme.addEventListener('click', (e)=> {
        e.preventDefault();
        isLight = !isLight;
        html.setAttribute('data-theme', isLight? 'light':'dark');
        switchTheme.innerHTML = isLight? sun : moon;
        switchTheme.setAttribute('data-tooltip', `${isLight?'Light':'Dark'} Mode`);
        removeTooltip();
    });
    const removeTooltip = (timeInt = 1750) => {
        setTimeout(()=>{
            switchTheme.blur();
        },timeInt);
    };
    
    switchTheme.innerHTML = os_default;
    switchTheme.setAttribute('data-tooltip', 'Auto Theme');
    switchTheme.focus();
    removeTooltip(3000);
    */

  const smoothScroll = () => {
    let x = document.querySelectorAll('a[href*="#"]');
    for (let i = 0; i < x.length; i++) {
      x[i].onclick = (e) => {
        e.preventDefault();
        const ele = document.querySelector(e.target.hash);
        window.scrollTo({
          top: ele.offsetTop - 90,
          left: 0,
          behavior: "smooth",
        });
        document
          .getElementById("nav_toggle")
          .setAttribute("aria-expanded", "false");
        ele.focus();
        return false;
      };
    }
  };

  //honeypot
  const handleOnMount = () => {
    document.getElementById("hhpp").value = "check";
    smoothScroll();
  };

  // Form submit for social links
  const handleSocialLinks = (e) => {
    if (document.getElementById("hhpp").value === "check") {
      switch (e.submitter.id) {
        case "bt_em":
          window.open("mailto:alec.bielanos@gmail.com", "_blank");
          break;
        case "bt_li":
          window.open("https://www.linkedin.com/in/alec-bielanos/", "_blank");
          break;
        case "bt_gh":
          window.open(
            "https://bitbucket.org/alecbiela/workspace/repositories/",
            "_blank"
          );
          break;
      }
    }
  };

  // Global store for the entire page
  const store = reactive({
    count: 0,
    navOpen: false,
    inc() {
      this.count++;
    },
  });

  // manipulate it here
  store.inc();

  createApp({
    // share it with app scopes
    store,
    handleSocialLinks,
    handleOnMount,
  }).mount();
})();
