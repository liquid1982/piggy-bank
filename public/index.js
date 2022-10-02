import PiggyBank from "./piggy-bank.js";

let piggy;

function render(what) {
  console.log(`Rendering ${what}...`);

  if (!document.querySelector(`template#${what}`)) {
    console.error(`Cannot find template with id "${what}"`);
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

document.addEventListener("start", () => render("start"));

document.addEventListener("create", () => {
  const user = document.querySelector(".user-name").value;
  piggy = new PiggyBank(user);
  render("whole");
});

document.addEventListener("deposit", () => render("deposit"));

document.addEventListener("confirmDeposit", () => {
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

document.addEventListener("smash", () => render("smash"));

document.addEventListener("confirmSmash", () => {
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

render("start");
