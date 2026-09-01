import "./styles/main.css";
import "./styles/components.css";
import "./styles/responsive.css";

import { auth } from "./firebase.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="muzammil-app">

    <header class="navbar">

      <div class="brand">
        <div class="brand-logo">M</div>
        <span>Muzammil AI</span>
      </div>

      <nav class="navigation">

        <button data-page="home">
          Home
        </button>

        <button data-page="blog">
          Blog
        </button>

        <button data-page="dashboard">
          Dashboard
        </button>

      </nav>

      <button id="authButton" class="primary-btn">
        Sign In
      </button>

    </header>

    <main id="pageContent">

      <section class="hero">

        <div class="hero-content">

          <span class="badge">
            PERSONAL AI WORKSPACE
          </span>

          <h1>
            Think.
            <span>Create.</span>
            Build.
          </h1>

          <p>
            Welcome to Muzammil AI — your professional
            AI workspace for chat, coding, writing,
            study, translation and creative work.
          </p>

          <div class="hero-actions">

            <button
              id="startAI"
              class="primary-btn"
            >
              Start Muzammil AI
            </button>

            <button
              data-page="blog"
              class="secondary-btn"
            >
              Explore Blog
            </button>

          </div>

        </div>

        <div class="ai-preview">

          <div class="preview-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="preview-chat">

            <div class="ai-message">
              👋 Hello! I'm Muzammil AI.
            </div>

            <div class="user-message">
              Help me build my website.
            </div>

            <div class="ai-message">
              Absolutely. Let's build it
              professionally.
            </div>

          </div>

        </div>

      </section>

    </main>

    <footer class="footer">
      © 2026 Muzammil AI
    </footer>

  </div>
`;

console.log("Muzammil AI frontend loaded");

auth.onAuthStateChanged((user) => {

  const button = document.querySelector("#authButton");

  if (!button) return;

  if (user) {
    button.textContent = "Dashboard";
  } else {
    button.textContent = "Sign In";
  }

});
