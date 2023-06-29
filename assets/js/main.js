/**
 * Template Name: Personal - v4.3.0
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
// Redirect to / if the url contains #header to prevent the page from scrolling to the header if the user refreshes the page
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("#header")) {
    // redirect to the main page
    window.location = window.location.href.split("#")[0];
  }
});
// End of redirect fix

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

  const switchPage = (e, el) => {
    let section = select(el.hash);
    if (section) {
      e.preventDefault();

      let navbar = select("#navbar");
      let header = select("#header");
      let sections = select("section", true);
      let navlinks = select(".nav-link", true);

      navlinks.forEach((item) => {
        item.classList.remove("active");
      });

      // find the navlink that has the same href as the current element and add active class
      let currentNavlink = navlinks.find(
        (item) => item.getAttribute("href") == el.hash
      );
      // console.log(currentNavlink);
      // console.log(currentNavlink.hasAttribute("data-workshowcaseitem"));
      // highlight navlink if its href is work-showcase
      if (
        currentNavlink &&
        currentNavlink.hasAttribute("data-workshowcaseitem")
      ) {
        // TODO ADD A data ATTRIBUTE TO ALL WORK SHOWCASE LINKS. IF THE CURRENT ELEMENT IS A WORK SHOWCASE LINK, THEN ADD THE ACTIVE CLASS TO THE WORK SHOWCASE LINK THAT HAS THE SAME DATA ATTRIBUTE AS THE CURRENT ELEMENT
        // console.log(1);
        let workEl = navlinks.find(
          (item) => item.getAttribute("href") == "#work-showcase"
        );
        workEl.classList.add("active");
        // console.log(2);
      } else if (currentNavlink) {
        currentNavlink.classList.add("active");
        // console.log(3);
      } else if (el.hash == "#header") {
        navlinks[0].classList.add("active");
        // console.log(4);
      }

      // Add to browser history
      let currentURL = window.location.href.trim();
      let currentURLprimary = currentURL;
      if (currentURL.includes("#")) {
        currentURLprimary = currentURL.split("#")[0].trim();
      }
      let updatedURL = currentURLprimary + el.hash;
      updatedURL = updatedURL.trim();
      // if the currentNavlink doesnt have the data attribute nohistory, then push to history
      // if the previous url is the same as the updated url, then don't push to history
      if (
        currentNavlink &&
        !currentNavlink.hasAttribute("data-nohistory") &&
        currentURL !== updatedURL
      ) {
        window.history.pushState(null, null, updatedURL);
        // console.log(`pushed to history --${updatedURL}--`);
      }

      if (navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        let navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }

      if (el.hash == "#header") {
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

      scrollto(el.hash);
    }
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
   * Scroll with offset on links with a class name .scrollto
   */
  on(
    "click",
    ".nav-link",
    function (e) {
      switchPage(e, this);
    },
    true
  );

  window.addEventListener("hashchange", function (e) {
    // console.log("hash changed");
    // e.preventDefault();

    const element = document.getElementById(location.hash.substring(1));
    if (!element) {
      // simulate click on the main index.html page
      // TODO FIX BACK NOT WORKING TO MAIN PAGE BUG
      // get the main index.html page
      //
      //
      let currentURL = window.location.href.trim();
      let currentURLprimary = currentURL;
      if (currentURL.includes("#")) {
        currentURLprimary = currentURL.split("#")[0].trim();
      }
      // console.log("reloading");
      window.location = currentURLprimary;
      return;
    }
    element.hash = location.hash; // BUG CANNOT SET HASH OF NULL

    // console.log(element);

    switchPage(e, element);
  });

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
  let skillsContents = select(".skills-content", true);
  let offsetList =
    window.innerWidth >= 992
      ? ["70%", "80%", "80%", "90%"] // offset for desktop
      : ["65%", "80%", "80%", "92%"]; // offset for mobile
  skillsContents.forEach((skillsContent, index) => {
    if (skillsContent) {
      new Waypoint({
        element: skillsContent,
        offset: offsetList[index],
        handler: function (direction) {
          let progress = skillsContent.querySelectorAll(
            ".progress .progress-bar"
          );
          // console.log(offsetList[index]);
          progress.forEach((el) => {
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        },
      });
    }
  });

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

/*==================== Automatic Age Updater ====================*/
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

/*==================== End Automatic Age Updater ====================*/

/*==================== Code to keep all elements the same size ====================*/
/*For work showcase tabs specifically. Since they are responsive sometimes some elemnts are sized bigger than others*/
let currentWorkEls = {
  els: null,
  targetHeight: null,
};
// Match the height of the tabbed components so that they are all evenly sized when responsive
document.body.addEventListener("click", function (event) {
  // Get the tabbed components for the work section
  let workEls = document.querySelectorAll(".section-show .work-field");

  // Guard clause
  if (!workEls) return;

  // Reset the style of the previous tabbed components if they exist
  if (currentWorkEls.els && currentWorkEls.els !== workEls) {
    for (let i = 0; i < currentWorkEls.els.length; i++) {
      currentWorkEls.els[i].style.paddingTop = "";
      currentWorkEls.els[i].style.paddingBottom = "";
    }
  }

  // Remember the current tabbed components
  currentWorkEls.els = workEls;

  // Get the max height of the tabbed components. This will be the target height
  currentWorkEls.targetHeight = getMaxHeight(workEls);

  // Match the height of the tabbed components
  matchContentHeight(workEls, currentWorkEls.targetHeight);
});

window.addEventListener("resize", function (event) {
  // Get the tabbed components for the work section
  let workEls = document.querySelectorAll(".section-show .work-field");

  // Guard clause, Don't do anything if the tabbed components haven't changed
  if (!workEls || workEls === currentWorkEls) return;

  // Match the height of the tabbed components
  matchContentHeight(workEls, currentWorkEls.targetHeight);
});

function getMaxHeight(els) {
  let maxHeight = 0;

  // Find the maximum height
  for (let i = 0; i < els.length; i++) {
    const element = els[i];
    const height = element.clientHeight;
    maxHeight = Math.max(maxHeight, height);
  }

  return maxHeight;
}

function matchContentHeight(els, targetHeight) {
  function adjustPadding(els) {
    const elements = els;

    // Apply extra padding to match the maximum content height
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      const contentHeight = element.clientHeight;

      if (contentHeight !== targetHeight) {
        // Calculate the extra padding needed
        const extraPadding = targetHeight - contentHeight;

        // Get the computed styles of the element
        const styles = window.getComputedStyle(element);

        // Get the currently computed top and bottom padding
        const totalPaddingTop =
          parseInt(styles.getPropertyValue("padding-top")) + extraPadding / 2;
        const totalPaddingBottom =
          parseInt(styles.getPropertyValue("padding-bottom")) +
          extraPadding / 2;

        // Remove the transition so that the padding change is instant
        element.style.transition = "padding 0s ease-in-out";

        // Apply the new padding
        element.style.paddingTop = `${totalPaddingTop}px`;
        element.style.paddingBottom = `${totalPaddingBottom}px`;
      }
    }
  }

  // Initial adjustment
  adjustPadding(els);

  // Recalculate padding on window resize
  // window.addEventListener("resize", adjustPadding(els));
}
/*==================== End Code to keep all elements the same size ====================*/

/*==================== Code to Load Blogposts! Important section ====================*/
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

      goBackEl.innerHTML = `&#8701; Back to ${formatGoBack(
        goBackValue
      )} Showcase`;
      goBackEl.setAttribute("href", `#${goBackValue}`);

      // Retrieve the blogpost section
      const blogPostSectionEl = document
        .querySelector(".section-show")
        .closest("section");

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
      let waitTime = randomNum - elapsedTime <= 0 ? 0 : randomNum - elapsedTime;

      // If no load specified, set wait time to 0
      if (clickedEl.querySelector(".nav-link").hasAttribute("data-noload")) {
        waitTime = 0;
      }

      setTimeout(() => {
        loadBlogPost(blogPostSectionEl, html);
      }, waitTime);
    }
  });
});

// Function to load the blogpost if it was not accessed by clicking on a tab
window.addEventListener("load", async () => {
  // Wait for the page to load to ensure .show-section is present
  setTimeout(async () => {
    autoLoadBlogPost();
  }, 1000);
});
window.addEventListener("hashchange", async () => {
  // Wait for the page to load to ensure .show-section is present
  setTimeout(async () => {
    autoLoadBlogPost();
  }, 1000);
});

async function autoLoadBlogPost() {
  try {
    // If there is a data attribute of blogpost in the URL, load the blogpost
    if (
      // document.body.classList.contains("section-show") &&
      document.querySelector(".section-show").hasAttribute("data-blogpost")
    ) {
      // Retrieve the blogpost section
      const blogPostSectionEl = document
        .querySelector(".section-show")
        .closest("section");

      // Get the data attribute of the clicked element
      const blogPost = document
        .querySelector(".section-show")
        .getAttribute("data-blogpost");

      // Retrieve the blogpost
      let html = await retrieveBlogPost(`./assets/blog-posts/${blogPost}.html`);

      // Load the blogpost into the content element
      loadBlogPost(blogPostSectionEl, html);
    }
  } catch (error) {
    if (error instanceof TypeError) {
      // console.log("Page loaded correctly");
    } else {
      // console.log(error);
    }
  }
}

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
    // console.error(error);

    // Return an error message
    html = `<p>Failed to load blog post</p>`;

    // Return the HTML
    return html;
  }
}

function loadBlogPost(blogPostSectionEl, html) {
  // Add the blogpost to the DOM if the .insert-html-below element exists
  if (!blogPostSectionEl.querySelector(".insert-html-below")) return;
  blogPostSectionEl
    .querySelector(".insert-html-below")
    .insertAdjacentHTML("afterend", html);

  // Reload the code formatting file after HTML insertion
  reloadJavaScriptFile("assets/js/prism.js");

  // Remove the .insert-html-below element so that the blogpost is only added once. This will also remove the loading spinner
  blogPostSectionEl.querySelector(".insert-html-below").remove();
}

function reloadJavaScriptFile(filePath) {
  const script = document.createElement("script");
  script.src = filePath;
  script.async = true;
  script.onload = () => {
    // console.log(`JavaScript file '${filePath}' has been reloaded.`);
  };

  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}

/*==================== End Code to Load Blogposts ====================*/

/*==================== Code for History API ====================*/

// window.addEventListener("hashchange", function (e) {
// console.log("hash changed");
//   // e.preventDefault();

//   const element = document.getElementById(location.hash.substring(1));
// console.log(element);

//   // remove the class 'active' from all elements
//   document.querySelectorAll(".nav-link").forEach((el) => {
//     el.classList.remove("active");
//   });

//   // add the class 'active' to the element that was clicked
//   element.classList.add("active");

//   // scroll to that element
//   scrollto(element.hash);
// });

// // Function to update the URL
// function updateURL(clickedEl) {
//   // Get the data attribute of the clicked element
//   const clickedElData = clickedEl.getAttribute("data-showcase");

//   // Get the current URL
//   const currentURL = window.location.href;

//   // Get the current URL without the hash
//   const currentURLNoHash = currentURL.split("#")[0];

//   // Get the current hash
//   const currentHash = currentURL.split("#")[1];

//   // If the current hash is the same as the clicked element data attribute, do nothing
//   if (currentHash === clickedElData) return;

//   // If the current hash is empty, add the clicked element data attribute to the URL
//   if (currentHash === undefined) {
//     history.pushState(null, null, `${currentURL}#${clickedElData}`);
//     return;

//     // If the current hash is not empty, replace the current hash with the clicked element data attribute
//   } else {
//     history.replaceState(null, null, `${currentURLNoHash}#${clickedElData}`);
//     return;
//   }
// }

// // Add an event listener to the window to listen for hash changes
// window.addEventListener("click", (e) => {
//   // Get clicked element
//   const clickedEl = document.querySelector(e.target.location.hash);

//   // if clicked element is not an anchor tag, do nothing
//   if (clickedEl === null) return;
// console.log(clickedEl);

//   // Call updateURL function
//   updateURL(clickedEl);
// });

/*==================== End Code for History API ====================*/

/*==================== General Helper functions ====================*/

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  // console.log("scrolling");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Function to capitalize the first letter of a string
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

// Format the go back strings
function formatGoBack(word) {
  conversions = {
    "work-showcase": "",
    science: "Science",
    software: "Software",
    business: "Business",
    "wet-lab": "Wet Lab",
    "dry-lab": "Dry Lab",
    "other-science": "Other Science Projects",
    "cli-softwares": "Command Line Softwares",
    "web-softwares": "Web Softwares",
  };

  return conversions[word];
}
/*==================== End General Helper functions ====================*/
