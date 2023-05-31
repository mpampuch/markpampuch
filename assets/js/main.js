/**
 * Template Name: Personal - v4.3.0
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let sections = select("section", true);
        let navlinks = select(".nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        if (this.hash == "#header") {
          header.classList.remove("header-top");
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          return;
        }

        if (!header.classList.contains("header-top")) {
          header.classList.add("header-top");
          setTimeout(function () {
            sections.forEach((item) => {
              item.classList.remove("section-show");
            });
            section.classList.add("section-show");
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          section.classList.add("section-show");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select("#header");
        let navlinks = select("#navbar .nav-link", true);

        header.classList.add("header-top");

        navlinks.forEach((item) => {
          if (item.getAttribute("href") == window.location.hash) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        setTimeout(function () {
          initial_nav.classList.add("section-show");
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }
})();

// Automatic age updater
// Month is 0-indexed so August is month 7, not 8
const birthDate = new Date(1998, 7, 17, 0, 0, 0, 0);

// The current date
let currentDate = new Date();

// The age in years
let age = currentDate.getFullYear() - birthDate.getFullYear();

// Compare the months
let month = currentDate.getMonth() - birthDate.getMonth();

// Compare the days
let day = currentDate.getDate() - birthDate.getDate();

// If the date has already happened this year
if (month < 0 || (month == 0 && day < 0)) {
  age--;
}

document.querySelector(".age").textContent = age;

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

/* 
WORK SHOWCASE SECTION EVENT PROPAGATION 
Here I have the code used to create clickable tabbed components in the work showcase section.
The event listener is attached to the parent element of the tabs and the content (the row containing all the work tabs).
The first thing I did was check where the target of the event was.
If it was outside the tabs, I did nothing. (guard clause)
If it was inside the tabs, I selected the closest tab element
From that tab, I selected the child anchor element and got the href attribute
I then followed the href attribute to the content element
*/

// Select all the work tabs containers
// Did this instead of adding an event listener to the workshowcase section because there are less of these elements than there are sections with a class of work-showcase so this way I am adding less event listeners and improving performance

// Create a set to store the blog posts to retrieve and remove falsey values
const workTabsContainers = document.querySelectorAll(".work-tabs-container");
clicked = false;
// Add an event listener to each container
workTabsContainers.forEach((workTabsContainer) => {
  workTabsContainer.addEventListener("click", async (e) => {
    // Guard clause
    if (!e.target.closest(".work-field")) return;

    // Select the closest tab element
    const clickedEl = e.target.closest(".work-field");

    // Mimic a click on the tabs anchor element to trigger its event handler
    clickedEl.querySelector(".nav-link").click();

    // Get the data attribute of the clicked element
    const blogPost = clickedEl
      .querySelector(".nav-link")
      .getAttribute("data-blogpost");

    // If the element has a data attribute of blogpost, retrieve the blogpost
    // Set clicked to true so that the blogpost is only retrieved once
    if (blogPost && !clicked) {
      // Set clicked to true so that the blogpost not retrieved again (because of the .click() method above
      clicked = true;

      // Set the value of the go back tab to the showcase that it was clicked from
      const goBackValue = clickedEl
        .querySelector(".nav-link")
        .getAttribute("data-goback");

      let goBackEl = document
        .querySelector(".section-show")
        .querySelector(".go-back");

      goBackEl.innerHTML = `&#8701; Back to ${capitalize(
        goBackValue
      )} Showcase`;
      goBackEl.setAttribute("href", `#${goBackValue}`);

      // Retrieve the blogpost
      // Calculate the elapsed time
      const startTime = performance.now();
      let html = await retrieveBlogPost(`./assets/blog-posts/${blogPost}.html`);
      const endTime = performance.now();

      // Calculate the elapsed time
      const elapsedTime = endTime - startTime;

      // Reset clicked to false so that the blogpost can be retrieved again
      resetClicked();

      // Load the blogpost into the content element
      // Generate a random number between min and max values
      let min = 300;
      let max = 500;
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      // Calculate the wait time
      const waitTime =
        randomNum - elapsedTime <= 0 ? 0 : randomNum - elapsedTime;

      setTimeout(() => {
        loadBlogPost(html);
      }, waitTime);
    }
  });
});

// Function to load the blogpost if it was not accessed by clicking on a tab
window.addEventListener("load", async () => {
  // Wait for the page to load to ensure .show-section is present
  setTimeout(async () => {
    console.log(await document.querySelector(".section-show"));

    // If there is a data attribute of blogpost in the URL, load the blogpost
    if (document.querySelector(".section-show").hasAttribute("data-blogpost")) {
      // Get the data attribute of the clicked element
      const blogPost = document
        .querySelector(".section-show")
        .getAttribute("data-blogpost");
      console.log(blogPost);

      // Retrieve the blogpost
      let html = await retrieveBlogPost(`./assets/blog-posts/${blogPost}.html`);

      // Load the blogpost into the content element
      loadBlogPost(html);
    }
  }, 1000);
});

function resetClicked() {
  setTimeout(() => {
    // Reset clicked to false so that the blogpost can be retrieved again
    clicked = false;
  }, 10);
}

// Retrieve blogpost HTML from an HTML file
async function retrieveBlogPost(filePath) {
  try {
    // Fetch the HTML
    const response = await fetch(filePath);

    // Throw an error if the response is not ok
    if (!response.ok) {
      throw new Error(`Failed to load HTML from ${filePath}`);
    }

    // Convert the response to text
    const html = await response.text();

    // Return the HTML
    return html;

    // Catch any errors
  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Return an error message
    html = `<p>Failed to load blog post</p>`;

    // Return the HTML
    return html;
  }
}

function loadBlogPost(html) {
  // Add the blogpost to the DOM if the .insert-html-below element exists
  if (!document.querySelector(".insert-html-below")) return;
  document
    .querySelector(".insert-html-below")
    .insertAdjacentHTML("afterend", html);

  // Reload the code formatting file after HTML insertion
  reloadJavaScriptFile("assets/js/prism.js");

  // Remove the .insert-html-below element so that the blogpost is only added once. This will also remove the loading spinner
  document.querySelector(".insert-html-below").remove();
}

function reloadJavaScriptFile(filePath) {
  const script = document.createElement("script");
  script.src = filePath;
  script.async = true;
  script.onload = () => {
    console.log(`JavaScript file '${filePath}' has been reloaded.`);
  };

  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}
