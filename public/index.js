import PiggyBank from "./piggy-bank.js";

let piggy;

globalThis.document.addEventListener("create", (event) => {
  const user = document.querySelector(".user-name").value;
  piggy = new PiggyBank(user);
  render("whole");
});

globalThis.document.addEventListener("deposit", () => render("deposit"));

globalThis.document.addEventListener("confirmDeposit", () => {
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

globalThis.document.addEventListener("smash", () => render("smash"));

globalThis.document.addEventListener("confirmSmash", () => {
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

function render(what) {
  if (!document.querySelector(`template#${what}`)) {
    alert(`Cannot find template with id "${what}"`);
    return;
  }

  const template = document.querySelector(`#${what}`).content.cloneNode(true);

  template
    .querySelectorAll(".amount")
    .forEach((el) => (el.innerText = piggy?.amount));

  template
    .querySelectorAll(".owner")
    .forEach((el) => (el.innerText = piggy?.owner));

  document.querySelector("#app").innerHTML = "";
  document.querySelector("#app").appendChild(template);
  document.querySelector("input")?.focus();
}

render("start");
