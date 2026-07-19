// ============================================
// TAHA MOUSAVI PORTFOLIO
// Shared bilingual site behavior
// English / فارسی
// ============================================

(function () {

  "use strict";


  const STORAGE_KEY = "taha-portfolio-language";


  function getLanguage() {

    const savedLanguage =
      localStorage.getItem(STORAGE_KEY);


    if (savedLanguage === "fa" ||
        savedLanguage === "en") {

      return savedLanguage;

    }


    return "en";

  }


  function applyLanguage(language) {


    if (language !== "en" &&
        language !== "fa") {

      language = "en";

    }


    const isPersian =
      language === "fa";


    const html =
      document.documentElement;


    const body =
      document.body;


    // Language and direction

    html.setAttribute(
      "lang",
      isPersian ? "fa" : "en"
    );


    html.setAttribute(
      "dir",
      isPersian ? "rtl" : "ltr"
    );


    body.classList.toggle(
      "lang-fa",
      isPersian
    );


    body.classList.toggle(
      "lang-en",
      !isPersian
    );


    // Swap all translated elements

    document
      .querySelectorAll("[data-en]")
      .forEach(function (element) {


        const translatedText =
          isPersian

            ? element.getAttribute("data-fa")

            : element.getAttribute("data-en");


        if (
          translatedText !== null &&
          translatedText !== ""
        ) {

          element.textContent =
            translatedText;

        }

      });


    // Swap placeholders

    document
      .querySelectorAll("[data-en-placeholder]")
      .forEach(function (element) {


        const placeholder =
          isPersian

            ? element.getAttribute(
                "data-fa-placeholder"
              )

            : element.getAttribute(
                "data-en-placeholder"
              );


        if (placeholder !== null) {

          element.setAttribute(
            "placeholder",
            placeholder
          );

        }

      });


    // Update page title

    const title =
      document.querySelector(
        "title[data-en]"
      );


    if (title) {


      document.title =
        isPersian

          ? title.getAttribute("data-fa")

          : title.getAttribute("data-en");

    }


    // Update meta description

    const description =
      document.querySelector(
        'meta[name="description"][data-en]'
      );


    if (description) {


      const content =
        isPersian

          ? description.getAttribute(
              "data-fa"
            )

          : description.getAttribute(
              "data-en"
            );


      if (content) {

        description.setAttribute(
          "content",
          content
        );

      }

    }


    // Update language toggle

    document
      .querySelectorAll(
        ".lang-toggle button"
      )
      .forEach(function (button) {


        const buttonLanguage =
          button.getAttribute(
            "data-lang"
          );


        const isActive =
          buttonLanguage === language;


        button.classList.toggle(
          "is-active",
          isActive
        );


        button.setAttribute(
          "aria-pressed",
          String(isActive)
        );

      });


    // Save selected language

    localStorage.setItem(
      STORAGE_KEY,
      language
    );


    window.__currentLanguage =
      language;

  }


  function initializeLanguageToggle() {


    document
      .querySelectorAll(
        ".lang-toggle button"
      )
      .forEach(function (button) {


        button.addEventListener(
          "click",
          function () {


            const selectedLanguage =
              button.getAttribute(
                "data-lang"
              );


            const currentScroll =
              window.scrollY;


            applyLanguage(
              selectedLanguage
            );


            window.scrollTo(
              0,
              currentScroll
            );

          }

        );

      });


    applyLanguage(
      getLanguage()
    );

  }


  function initializeMobileMenu() {


    const hamburger =
      document.querySelector(
        ".hamburger"
      );


    const navList =
      document.querySelector(
        ".navbar > ul"
      );


    if (
      !hamburger ||
      !navList
    ) {

      return;

    }


    hamburger.addEventListener(
      "click",
      function () {


        const isOpen =
          navList.classList.toggle(
            "is-open"
          );


        hamburger.classList.toggle(
          "is-open",
          isOpen
        );


        hamburger.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }

    );


    navList
      .querySelectorAll("a")
      .forEach(function (link) {


        link.addEventListener(
          "click",
          function () {


            navList.classList.remove(
              "is-open"
            );


            hamburger.classList.remove(
              "is-open"
            );


            hamburger.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        );

      });

  }


  function initializeScrollBehavior() {


    if (
      "scrollRestoration"
      in history
    ) {

      history.scrollRestoration =
        "manual";

    }


    if (
      !window.location.hash
    ) {


      window.addEventListener(
        "load",
        function () {

          window.scrollTo(
            0,
            0
          );

        }

      );

    }

  }


  window.getSiteLang =
    getLanguage;


  window.applySiteLang =
    applyLanguage;


  document.addEventListener(
    "DOMContentLoaded",
    function () {


      initializeLanguageToggle();


      initializeMobileMenu();


      initializeScrollBehavior();


    }

  );


})();