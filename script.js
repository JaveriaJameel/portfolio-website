document.addEventListener("DOMContentLoaded", () => {

  // ===== Typing Effect =====
  const typingElement = document.getElementById("typing");
  const words = ["Data Scientist", "Machine Learning Enthusiast", "Analytics Expert"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex++);
      if (charIndex > currentWord.length) {
        isDeleting = true;
      }
    }
    setTimeout(type, isDeleting ? 100 : 150);
  }
  type();

  // ===== Mobile Menu Toggle =====
  const menuBtn = document.querySelector(".menu-btn");
  const navList = document.getElementById("nav-list");

  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", navList.classList.contains("show"));
  });

  // ===== Smooth Scroll =====
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (navList.classList.contains("show")) {
        navList.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", false);
      }
    });
  });

  // ===== Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // reveal on page load

  // ===== Animate Skill Progress Bars =====
  const progressBars = document.querySelectorAll(".bar span");

  function fillProgressBars() {
    progressBars.forEach(bar => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });
  }

  window.addEventListener("scroll", () => {
    const skillsSection = document.getElementById("skills");
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      fillProgressBars();
    }
  });

  // ===== Footer Year =====
  const yearSpan = document.getElementById("year");
  yearSpan.textContent = new Date().getFullYear();

});
// ================= Profile Data =================
const profile = {
  Education: {
    Matric: { Year: "2020", Marks: "767/1100", Subjects: ["Math", "Physics", "Chemistry", "Computer Science"] },
    Intermediate: { Year: "2023", Marks: "571/1100", Subjects: ["Math", "Physics", "Computer Science"] },
    Bachelor: { Year: "2028", CGPA: "2.48/4.0", Subjects: ["Computer Science"] }
  },
  ProfessionalSkills: ["Python", "SQL", "Machine Learning", "Deep Learning", "Data Science", "Power BI", "Tableau"],
  SoftSkills: ["Problem Solving", "Critical Thinking", "Communication", "Anger Management"],
  Hobbies: ["Reading Books"]
};

// ================= Chatbot Elements =================
const personalChat = document.getElementById("personal-chatbot");
const chatCloseBtn = document.getElementById("chat-close");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Close chatbot
chatCloseBtn.addEventListener("click", () => personalChat.classList.add("closed"));

// Send message
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Display user message
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-message");
  userDiv.textContent = message;
  chatBody.appendChild(userDiv);
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Bot response
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    const query = message.toLowerCase();

    if (query.includes("education")) {
      botDiv.textContent = `Education summary: ${Object.entries(profile.Education).map(([lvl,d]) => `${lvl} (${d.Year}, ${d.Marks || d.CGPA})`).join("; ")}`;
    } else if (query.includes("matric")) {
      const d = profile.Education.Matric;
      botDiv.textContent = `Matric (${d.Year}): ${d.Marks} - Subjects: ${d.Subjects.join(", ")}`;
    } else if (query.includes("intermediate")) {
      const d = profile.Education.Intermediate;
      botDiv.textContent = `Intermediate (${d.Year}): ${d.Marks} - Subjects: ${d.Subjects.join(", ")}`;
    } else if (query.includes("bachelor")) {
      const d = profile.Education.Bachelor;
      botDiv.textContent = `Bachelor (${d.Year}): CGPA ${d.CGPA} - Subjects: ${d.Subjects.join(", ")}`;
    } else if (query.includes("professional skill") || query.includes("technical skill")) {
      botDiv.textContent = `Professional Skills: ${profile.ProfessionalSkills.join(", ")}`;
    } else if (query.includes("soft skill")) {
      botDiv.textContent = `Soft Skills: ${profile.SoftSkills.join(", ")}`;
    } else if (query.includes("hobby") || query.includes("hobbies")) {
      botDiv.textContent = `Hobbies: ${profile.Hobbies.join(", ")}`;
    } else {
      botDiv.textContent = "I'm Jiya 👩! Ask me about your education, skills, or hobbies.";
    }

    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);
}

// Send message on button click or enter key
chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

