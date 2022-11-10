import PiggyBank from "./piggy-bank.js";

let piggy;

/**
 * `piggy:start` event
 * ---
 * First screen of the app. It renders a form where the user can provide their name.
 */
document.addEventListener("piggy:start", () => render("start"));

/**
 * `piggy:create` event
 * ---
 * Creates a new piggy bank and shows the balance to the user.
 */
document.addEventListener("piggy:create", () => {
  const user = document.querySelector(".user-name").value;
  piggy = new PiggyBank(user);
  render("whole");
});

/**
 * `piggy:deposit` event
 * ---
 * Renders the deposit screen.
 */
document.addEventListener("piggy:deposit", () => render("deposit"));

/**
 * `piggy:confirmDeposit` event
 * ---
 * Confirms the deposit and displays the balance. If an error occurs, displays
 * the error to the user.
 */
document.addEventListener("piggy:confirmDeposit", () => {
  const amount = document.querySelector(".deposit-amount").value;

  try {
    piggy.deposit(amount);
    render("whole");
    return;
  } catch (error) {
    alert(error.message);
  }

  render("deposit");
});

/**
 * `piggy:smash` event
 * ---
 * Renders a form that asks the user to provide their name.
 */
document.addEventListener("piggy:smash", () => render("smash"));

/**
 * `piggy:confirmSmash` event
 * ---
 * Tries to smash the piggy bank. If the user is different from
 * the piggy bank owner, it shows an error.
 */
document.addEventListener("piggy:confirmSmash", () => {
  let finalAmount;
  const user = document.querySelector(".user-name").value;

  try {
    finalAmount = piggy.smash(user);
    alert(`Here's your ${finalAmount} coins, ${user}!`);
    render("smashed");
    return;
  } catch (error) {
    alert(error.message);
  }

  render("whole");
});

/**
 * Render the "start" template and bootstrap the app.
 */
render("start");

function render(what) {
  if (!document.querySelector(`template#${what}`)) {
    console.error(`Template "${what}" not found`);
    return;
  }

  const template = document.querySelector(`#${what}`).content.cloneNode(true);
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
