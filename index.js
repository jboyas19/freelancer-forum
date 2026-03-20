// ==============================
// Freelancer Forum - index.js
// ==============================

// Constants (like the FSA example)
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Teacher", "Programmer", "Designer", "Engineer", "Writer"];

const MIN_RATE = 20;
const MAX_RATE = 200;
const NUM_FREELANCERS = 15;

// Helpers
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomRate(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1) function that returns a freelancer object (random)
function createFreelancer() {
  return {
    name: getRandomItem(NAMES),
    occupation: getRandomItem(OCCUPATIONS),
    rate: getRandomRate(MIN_RATE, MAX_RATE),
  };
}

// 2) state freelancers array
const state = {
  freelancers: Array.from({ length: NUM_FREELANCERS }, () => createFreelancer()),
  averageRate: 0,
};

// 3) function to return average rate
function getAverageRate() {
  if (state.freelancers.length === 0) return 0;

  const total = state.freelancers.reduce((sum, freelancer) => {
    return sum + freelancer.rate;
  }, 0);

  return total / state.freelancers.length;
}

// 4) initialize averageRate in state
state.averageRate = getAverageRate();

// 5) component for single freelancer (row)
function FreelancerRow(f) {
  return `
    <tr>
      <td>${f.name}</td>
      <td>${f.occupation}</td>
      <td class="rate">$${f.rate}</td>
    </tr>
  `;
}

// 6) component for array of freelancers (table)
function FreelancerTable(freelancers) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>OCCUPATION</th>
            <th>RATE</th>
          </tr>
        </thead>
        <tbody>
          ${freelancers.map(FreelancerRow).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// 7) component for average rate
function AverageRate(avg) {
  return `<div class="subtitle">The average rate is $${avg.toFixed(2)}.</div>`;
}

// 8) render function mounts app
function render() {
  state.averageRate = getAverageRate();

  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1>Freelancer Forum</h1>
    ${AverageRate(state.averageRate)}
    ${FreelancerTable(state.freelancers)}
  `;
}

render();

// Optional (common in this lab): add a freelancer every 2 seconds
setInterval(() => {
  state.freelancers.push(createFreelancer());
  render();
}, 20);