console.log("script.js loaded");

const BASE_URL = "https://immigration-crm-website-production.up.railway.app";
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

/* CLOSE MOBILE MENU */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navLinks");
    if (nav) {
      nav.classList.remove("active");
    }
  });
});

/* ACTIVE NAV */
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
      alert("Please enter valid 10 digit number");
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}/api/inquiries/create`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await response.json();

      if (data.success) {

        alert("Inquiry Submitted Successfully");

        consultationForm.reset();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

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

      const response = await fetch(`${BASE_URL}/api/applications/create`, {

        method: "POST",

        body: formData

      });

      const data = await response.json();

      if (response.ok && data.success) {

        alert("Application Submitted Successfully");

        applyForm.reset();

      } else {

        alert(data.message || "Application submit failed");

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  });

}

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

      const response = await fetch(`${BASE_URL}/api/contact/create`, {

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

      const response = await fetch(`${BASE_URL}/api/eligibility/create`, {

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

  "Welcome To True Move Immigration.\n\nPlease provide your name.",
  "What’s Your Dream Destination?",
  "Kindly share your contact number.",
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

async function sendMessage() {

  const input = document.getElementById("chatMessage");
  const chatBody = document.querySelector(".chat-body");

  if (!input || !chatBody) return;

  const message = input.value.trim();

  if (message === "") return;

  const userMsg = document.createElement("div");

  userMsg.className = "user-msg";

  userMsg.innerText = message;

  chatBody.appendChild(userMsg);

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
        "Thank you for sharing your details. Our immigration expert will contact you shortly.";

      chatBody.appendChild(botMsg);

      try {

        await fetch(`${BASE_URL}/api/chat/create`, {

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

// navbar code
// dropdown code
// chat code
// animations code



/* COUNTER ANIMATION */
const counters = document.querySelectorAll(".counter");

const startCounters = () => {

  counters.forEach(counter => {

    if (counter.classList.contains("started")) return;

    const top = counter.getBoundingClientRect().top;

    if (top < window.innerHeight - 50) {

      counter.classList.add("started");

      const target = Number(counter.getAttribute("data-target"));

      let count = 0;

      const speed = 80;

      const increment = target / speed;

      const updateCounter = () => {

        count += increment;

        if (count < target) {

          counter.innerText = Math.ceil(count);

          requestAnimationFrame(updateCounter);

        } else {

          counter.innerText = target;

        }

      };

      updateCounter();

    }

  });

};

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* ENTER KEY SUPPORT FOR CHAT */
const chatInput = document.getElementById("chatMessage");

if (chatInput) {

  chatInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

      sendMessage();

    }

  });

}