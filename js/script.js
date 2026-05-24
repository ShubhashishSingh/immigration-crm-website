console.log("script.js loaded");

/* MOBILE MENU */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) {
    nav.classList.toggle("active");
  }
}

/* REVEAL ANIMATION */
const revealItems = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < window.innerHeight - 80) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* DROPDOWN MENU */
document.querySelectorAll(".dropdown .drop-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const parent = this.closest(".dropdown");

    document.querySelectorAll(".dropdown").forEach((item) => {
      if (item !== parent) {
        item.classList.remove("open");

        const btn = item.querySelector(".drop-btn");
        if (btn) {
          btn.setAttribute("aria-expanded", "false");
        }
      }
    });

    parent.classList.toggle("open");

    this.setAttribute(
      "aria-expanded",
      parent.classList.contains("open") ? "true" : "false"
    );
  });
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach((item) => {
      item.classList.remove("open");

      const btn = item.querySelector(".drop-btn");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
});

/* CLOSE MOBILE MENU AFTER LINK CLICK */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navLinks");
    if (nav) {
      nav.classList.remove("active");
    }
  });
});

/* ACTIVE NAV LINK */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

/* HERO CONSULTATION FORM */
const consultationForm = document.querySelector(".hero-consult-form");

if (consultationForm) {
  consultationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      fullName: consultationForm.fullName.value.trim(),
      phone: consultationForm.phone.value.trim(),
      email: consultationForm.email.value.trim(),
      service: consultationForm.service.value
    };

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10 digit phone number.");
      return;
    }

    try {
      const response = await fetch("https://immigration-crm-website-production.up.railway.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("Thank you! Your inquiry has been submitted successfully.");
        consultationForm.reset();
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please check backend is running.");
    }
  });
}

/* APPLY FORM */
const applyForm = document.querySelector(".apply-form");

if (applyForm) {
  applyForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(applyForm);

    try {
      const response = await fetch("https://immigration-crm-website-production.up.railway.app", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      console.log("Apply response:", data);

      if (data.success) {
        alert("Application Submitted Successfully");
        applyForm.reset();
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      console.log("Frontend Apply Error:", error);

      alert("Application submitted.");

      applyForm.reset();
    }
});
}

/* INPUT VALIDATION */
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 10);
  });
});

document.querySelectorAll('input[name="fullName"]').forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-zA-Z ]/g, "").slice(0, 30);
  });
});

/* FAQ */
function toggleFaq(button) {
  const item = button.closest(".faq-item");

  if (item) {
    item.classList.toggle("active");
  }
}

/* CHAT */
function openChat() {
  const widget = document.getElementById("chatWidget");
  const bubble = document.getElementById("chatBubble");

  if (widget) {
    widget.style.display = "block";
  }

  if (bubble) {
    bubble.style.display = "none";
  }
}

function closeChat() {
  const widget = document.getElementById("chatWidget");
  const bubble = document.getElementById("chatBubble");

  if (widget) {
    widget.style.display = "none";
  }

  if (bubble) {
    bubble.style.display = "flex";
  }
}

const questions = [

  "Welcome To True Move Immigration.\n\nOur Team Is Ready To Assist You In Achieving Your Immigration Goals.\n\nPlease provide your name.",

  "What’s Your Dream Destination?",

  "Kindly share your contact number. Our Immigration experts will contact you to discuss further.",

  "What Kind Of Visa Are You Looking For?",

  "Great! Kindly Share Your Email Address.",

  "Are You Willing To Get Paid Services?",

  "May I Know Your Total Work Experience ?",

  "What is your highest qualification?",

  "Do you have IELTS/PTE score?",

  "What is your approximate budget for immigration process?"
];

let currentQuestion = 0;

const chatAnswers = {};

const answerKeys = [
  "name",
  "destination",
  "phone",
  "visaType",
  "email",
  "paidService",
  "experience",
  "education",
  "languageScore",
  "budget"
];

function sendMessage() {

  const input = document.getElementById("chatMessage");
  const chatBody = document.querySelector(".chat-body");

  if (!input || !chatBody) return;

  const message = input.value.trim();

  if (message === "") return;

  /* USER MESSAGE */

  const userMsg = document.createElement("div");

  userMsg.className = "user-msg";

  userMsg.innerText = message;

  chatBody.appendChild(userMsg);

  /* SAVE ANSWER */

  chatAnswers[answerKeys[currentQuestion]] = message;

  input.value = "";

  currentQuestion++;

  setTimeout(async () => {

    const botMsg = document.createElement("div");

    botMsg.className = "bot-msg";

    if (currentQuestion < questions.length) {

      botMsg.innerText = questions[currentQuestion];

      chatBody.appendChild(botMsg);

    } else {

      botMsg.innerText =
        "Thank you for sharing your details.\n\nOur immigration expert will contact you shortly.";

      chatBody.appendChild(botMsg);

      /* SAVE TO DATABASE */

      try {

        await fetch("https://immigration-crm-website-production.up.railway.app", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(chatAnswers)

        });

      } catch (error) {

        console.log(error);

      }

    }

    chatBody.scrollTop = chatBody.scrollHeight;

  }, 700);

}

/* COUNTERS */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {
  if (counterStarted) return;

  const counterSection = document.querySelector(".counter-section");

  if (!counterSection) return;

  if (counterSection.getBoundingClientRect().top < window.innerHeight - 100) {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target")) || 0;
      let count = 0;
      const speed = Math.max(target / 120, 1);

      function updateCounter() {
        count += speed;

        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + "+";
        }
      }

      updateCounter();
    });

    counterStarted = true;
  }
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = {

      fullName: contactForm.fullName.value.trim(),
      email: contactForm.email.value.trim(),
      phone: contactForm.phone.value.trim(),
      message: contactForm.message.value.trim()

    };

    if (formData.phone.length !== 10) {
      alert("Please enter valid 10 digit number");
      return;
    }

    try {

      const response = await fetch("https://immigration-crm-website-production.up.railway.app", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await response.json();

      if (data.success) {

        alert("Message Sent Successfully");

        contactForm.reset();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  });

}

/* ELIGIBILITY FORM */

const eligibilityForm = document.querySelector(".eligibility-form");

if (eligibilityForm) {
  eligibilityForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      fullName: eligibilityForm.fullName.value.trim(),
      phone: eligibilityForm.phone.value.trim(),
      age: eligibilityForm.age.value,
      education: eligibilityForm.education.value,
      experience: eligibilityForm.experience.value,
      purpose: eligibilityForm.purpose.value,
      country: eligibilityForm.country.value
    };

    if (formData.phone.length !== 10) {
      alert("Please enter valid 10 digit phone number");
      return;
    }

    try {
      const response = await fetch("https://immigration-crm-website-production.up.railway.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("Eligibility Submitted Successfully");
        eligibilityForm.reset();
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  });
}