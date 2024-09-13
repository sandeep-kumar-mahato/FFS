"use strict";

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navLinks = document.querySelectorAll("[data-navbar-link]");

navToggleBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  header.classList.toggle("nav-active");
});

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

/**
 * header scroll active state & go to top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

document.querySelectorAll(".toggleButton").forEach(function (button) {
  button.addEventListener("click", function () {
    var moreText = this.previousElementSibling;
    var isHidden = moreText.style.display === "none";

    moreText.style.display = isHidden ? "inline" : "none";
    this.innerHTML = isHidden
      ? '<span>Show Less</span><ion-icon name="chevron-up-outline"></ion-icon>'
      : '<span>Learn More</span><ion-icon name="chevron-forward-outline"></ion-icon>';
  });
});

/* -------Overlay-------- */

// Show overlay
document.getElementById("getStartedBtn").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "flex";
});

// Hide overlay when clicking outside the form
document.getElementById("overlay").addEventListener("click", function (event) {
  if (event.target === this) {
    document.getElementById("overlay").style.display = "none";
  }
});

// Hide overlay when clicking the cancel button
document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "none";
});

// Handle form submission
document.getElementById("queryForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  // Handle form submission here, e.g., send data to a server
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const query = document.getElementById("query").value;

  const response = await fetch("http://localhost:5000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, location, query }),
  });

  if (response.ok) {
    alert("Data submitted successfully");
  } else {
    alert("Error submitting data");
  }

  // Close the overlay after submission
  document.getElementById("overlay").style.display = "none";
});
