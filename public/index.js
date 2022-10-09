import PiggyBank from "./piggy-bank.js";

let piggy;

render("start");

document.addEventListener("piggy:start", () => render("start"));
document.addEventListener("piggy:create", createHandler);
document.addEventListener("piggy:deposit", () => render("deposit"));
document.addEventListener("piggy:confirmDeposit", confirmDepositHandler);
document.addEventListener("piggy:smash", () => render("smash"));
document.addEventListener("piggy:confirmSmash", confirmSmashHandler);

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

function createHandler() {
  const user = document.querySelector(".user-name").value;
  piggy = new PiggyBank(user);
  render("whole");
}

function confirmDepositHandler() {
  const amount = document.querySelector(".deposit-amount").value;

  try {
    piggy.deposit(amount);
    render("whole");
    return;
  } catch (error) {
    alert(error.message);
  }

  render("deposit");
}

function confirmSmashHandler() {
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
}
