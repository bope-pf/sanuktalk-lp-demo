// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initProgressBar()
  initFAQ()
  initChatbot()
  initExitIntent()
  initSmoothScrolling()
  initHeaderScroll()
  initIntersectionObserver()
  initMobileMenu()
  initLazyLoading()
  initPerformanceMonitoring()
  addClickTrackingToCTAButtons()
})

// Progress Bar
function initProgressBar() {
  const progressBar = document.getElementById("progressBar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100)

    progressBar.style.width = scrollPercent + "%"
  })
}

// FAQ Functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Chatbot Functionality
function initChatbot() {
  const chatbot = document.getElementById("chatbot")
  const chatbotToggle = chatbot.querySelector(".chatbot-toggle")
  const chatbotWindow = chatbot.querySelector(".chatbot-window")
  const chatbotClose = chatbot.querySelector(".chatbot-close")

  chatbotToggle.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active")
  })

  chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active")
  })

  // Close chatbot when clicking outside
  document.addEventListener("click", (e) => {
    if (!chatbot.contains(e.target)) {
      chatbotWindow.classList.remove("active")
    }
  })
}

// Exit Intent Popup
function initExitIntent() {
  const exitPopup = document.getElementById("exitPopup")
  const exitPopupClose = exitPopup.querySelector(".exit-popup-close")
  let hasShownPopup = false

  // Show popup on exit intent
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && !hasShownPopup) {
      showExitPopup()
    }
  })

  // Show popup on mobile scroll up
  let lastScrollY = window.scrollY
  window.addEventListener("scroll", () => {
    if (window.scrollY < lastScrollY && window.scrollY < 100 && !hasShownPopup) {
      showExitPopup()
    }
    lastScrollY = window.scrollY
  })

  function showExitPopup() {
    exitPopup.classList.add("active")
    hasShownPopup = true

    // Auto-hide after 10 seconds
    setTimeout(() => {
      exitPopup.classList.remove("active")
    }, 10000)
  }

  // Close popup
  exitPopupClose.addEventListener("click", () => {
    exitPopup.classList.remove("active")
  })

  // Close popup when clicking outside
  exitPopup.addEventListener("click", (e) => {
    if (e.target === exitPopup) {
      exitPopup.classList.remove("active")
    }
  })
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector(".header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "none"
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })
}

// Intersection Observer for Animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for fade-in animation
  const animatedElements = document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card")

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}

// Button Click Tracking (for analytics)
function trackButtonClick(buttonText, location) {
  // Google Analytics 4 event tracking
  window.gtag =
    window.gtag ||
    (() => {
      ;(window.gtag.q = window.gtag.q || []).push(arguments)
    })
  window.gtag("event", "click", {
    event_category: "CTA",
    event_label: buttonText,
    custom_parameter_1: location,
  })

  // Facebook Pixel tracking
  window.fbq =
    window.fbq ||
    (() => {
      ;(window.fbq.q = window.fbq.q || []).push(arguments)
    })
  window.fbq("track", "Lead", {
    content_name: buttonText,
    content_category: "CTA",
  })
}

// Add click tracking to all CTA buttons
function addClickTrackingToCTAButtons() {
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-line")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.trim()
      const location = this.closest("section")?.className || "unknown"
      trackButtonClick(buttonText, location)
    })
  })
}

// Form Validation (if forms are added later)
function validateForm(formElement) {
  const requiredFields = formElement.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("error")
      isValid = false
    } else {
      field.classList.remove("error")
    }
  })

  return isValid
}

// Mobile Menu Toggle (for responsive navigation)
function initMobileMenu() {
  const nav = document.querySelector(".nav")
  const mobileMenuButton = document.createElement("button")
  mobileMenuButton.className = "mobile-menu-toggle"
  mobileMenuButton.innerHTML = "☰"
  mobileMenuButton.setAttribute("aria-label", "メニューを開く")

  // Insert mobile menu button
  const headerContent = document.querySelector(".header-content")
  headerContent.insertBefore(mobileMenuButton, nav)

  mobileMenuButton.addEventListener("click", () => {
    nav.classList.toggle("mobile-active")
    mobileMenuButton.innerHTML = nav.classList.contains("mobile-active") ? "✕" : "☰"
  })

  // Close mobile menu when clicking nav links
  const navLinks = nav.querySelectorAll("a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-active")
      mobileMenuButton.innerHTML = "☰"
    })
  })
}

// Lazy Loading for Images (when images are added)
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Performance Monitoring
function initPerformanceMonitoring() {
  // Core Web Vitals monitoring
  if ("web-vitals" in window) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)

  // Send error to analytics (optional)
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "exception", {
      description: e.error.toString(),
      fatal: false,
    })
  }
})

// Service Worker Registration (for PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}
