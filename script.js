const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");
const requestForm = document.getElementById("requestForm");
const message = document.getElementById("message");
const requestTable = document.getElementById("requestTable");
const serviceCards = document.getElementById("serviceCards");

let requests = [];

// SPA Navigation
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.section;

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// Hero Button
document.getElementById("scrollBtn").addEventListener("click", () => {
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById("request").classList.add("active");
});

// Fetch API
const loadServices = async () => {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    data.forEach(({ name, description }) => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card p-3 m-2">
          <h5>${name}</h5>
          <p>${description}</p>
          <button class="btn btn-primary">Request</button>
        </div>
      `;
      serviceCards.appendChild(card);
    });

  } catch (error) {
    serviceCards.innerHTML = "<p>Error loading services</p>";
  }
};

loadServices();

// Form Validation & Dynamic UI
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const serviceType = document.getElementById("serviceType").value;
  const description = document.getElementById("description").value;

  if (!name || !email || !serviceType || !description) {
    message.textContent = "All fields are required!";
    message.style.color = "red";
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    message.textContent = "Invalid email format!";
    message.style.color = "red";
    return;
  }

  const newRequest = { name, serviceType, description };

  requests = [...requests, newRequest]; // spread operator

  updateTable();

  message.textContent = "Request submitted successfully!";
  message.style.color = "green";

  requestForm.reset();
});

// Dynamic Table Update
const updateTable = () => {
  requestTable.innerHTML = "";

  requests.forEach(({ name, serviceType, description }) => {
    const row = `
      <tr>
        <td>${name}</td>
        <td>${serviceType}</td>
        <td>${description}</td>
      </tr>
    `;
    requestTable.innerHTML += row;
  });
};
