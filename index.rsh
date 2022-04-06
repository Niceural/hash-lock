"reach 0.1";
"use strict";

export const main = Reach.App(
  {},
  [
    Participant("Payer", {
      amount: UInt, // amount to be transferred
      password: UInt, // password to lock the funds
    }),
    Participant("Receiver", {
      getPassword: Fun([], UInt), // function to learn the password
    }),
  ],
  (Payer, Receiver) => {
    // the Payer publishes a digest of the password and pays the amount
    Payer.only(() => {
      const _password = interact.password;
      const [amount, passwordDigest] = declassify([
        interact.amount,
        digest(_password),
      ]);
    });
    Payer.publish(passwordDigest, amount).pay(amount);
    commit();

    unknowable(Receiver, Payer(_password)); // the Receiver doesn't know the password

    // the Receiver publishes the password
    Receiver.only(() => {
      const password = declassify(interact.getPassword());
      assume(passwordDigest == digest(password)); // the Receiver assumes their digest matches the Payer's
    });
    Receiver.publish(password);

    // the consensus ensures it's the right password and pays the Receiver
    require(passwordDigest == digest(password)); // checks if the two passwords match
    transfer(amount).to(Receiver);
    commit();

    exit();
  }
);
