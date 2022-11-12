import PiggyBank from "./piggy-bank.js";

let piggy;

/**
 * `p:start` event
 * ---
 * First screen of the app. Renders a form where the user can
 * enter their name.
 */
document.addEventListener("p:start", () => render("start"));

/**
 * `p:create` event
 * ---
 * Creates a new piggy bank and shows the balance.
 */
document.addEventListener("p:create", () => {
  const user = document.querySelector(".user-name")?.value;
  piggy = new PiggyBank(user);
  render("whole");
});

/**
 * `p:deposit` event
 * ---
 * Renders the deposit screen.
 */
document.addEventListener("p:deposit", () => render("deposit"));

/**
 * `p:confirm-deposit` event
 * ---
 * Confirms the deposit and displays the balance. If an error occurs,
 * displays the error.
 */
document.addEventListener("p:confirm-deposit", () => {
  const amount = document.querySelector(".deposit-amount")?.value;
  let success = false;

  try {
    piggy.deposit(amount);
    success = true;
  } catch (error) {
    alert(error.message);
  }

  render(success ? "whole" : "deposit");
});

/**
 * `p:smash` event
 * ---
 * Renders a form that asks the user to confirm their name.
 */
document.addEventListener("p:smash", () => render("smash"));

/**
 * `p:confirm-smash` event
 * ---
 * Tries to smash the piggy bank. If the user is different from
 * the piggy bank owner, it shows an error.
 */
document.addEventListener("p:confirm-smash", () => {
  const user = document.querySelector(".user-name")?.value;
  let success = false;
  let finalAmount;

  try {
    finalAmount = piggy.smash(user);
    success = true;
    alert(`Here's your ${finalAmount} coins, ${user}!`);
  } catch (error) {
    alert(error.message);
  }

  render(success ? "smashed" : "whole");
});

/**
 * Bootstrap the app.
 */
document.dispatchEvent(new Event("p:start"));

function render(what) {
  const template = document
    .querySelector(`template#${what}`)
    ?.content.cloneNode(true);

  if (!template) {
    console.error(`Template "${what}" not found`);
    return;
  }

  updatePlaceholders(template);

  document.querySelector("#app").innerHTML = "";
  document.querySelector("#app").appendChild(template);
  document.querySelector("input")?.focus();
}

function updatePlaceholders(template) {
  [
    ["p-owner", piggy?.owner],
    ["p-amount", piggy?.amount],
  ].forEach(([selector, value]) => {
    template.querySelectorAll(selector).forEach((el) => (el.innerText = value));
  });
}
