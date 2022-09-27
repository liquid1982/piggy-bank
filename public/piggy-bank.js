/**
 * Piggy Bank Exercise
 * ---
 * Create a piggy bank, and add tests to ensure it works as intended.
 *
 * Acceptance Criteria
 * - The piggy bank has one owner.
 * - Anyone can deposit coins in the piggy bank.
 * - Only the owner can smash the piggy bank.
 * - When smashing the piggy bank, we want to return the stored coins.
 * - After a piggy bank has been smashed, it is impossible to deposit more coins.
 */

class PiggyBank {
  amount = 0;
  owner;
  smashed;

  constructor(owner) {
    this.owner = owner;
  }

  deposit(howMuch) {
    if (this.smashed) {
      throw new Error("Cannot deposit coins into a smashed piggy bank");
    }

    const amount = parseInt(howMuch);

    if (isNaN(amount)) {
      throw new Error("Please enter a valid number!");
    }

    this.amount = this.amount + amount;
    return this.amount;
  }

  smash(user) {
    if (user !== this.owner) {
      throw new Error(`This is not your piggy bank, ${user}!`);
    }

    const finalAmount = this.amount;
    this.smashed = true;
    this.amount = 0;

    return finalAmount;
  }
}

globalThis.PiggyBank = PiggyBank;

export default PiggyBank;
