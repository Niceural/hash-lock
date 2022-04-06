import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);
const accPayer = await stdlib.newTestAccount(startingBalance);
const accReceiver = await stdlib.newTestAccount(startingBalance);

const getBalance = async (who) =>
  stdlib.formatCurrency(await stdlib.balanceOf(who), 4);
const beforePayer = await getBalance(accPayer);
const beforeReceiver = await getBalance(accReceiver);
console.log(
  `The Payer has been transferred ${beforePayer} and the Receiver have been transferred ${beforeReceiver}.`
);

const ctcPayer = accPayer.contract(backend);
const ctcReceiver = accReceiver.contract(backend, ctcPayer.getInfo());
console.log("The contracts have been deployed.");

const thePassword = stdlib.randomUInt();
console.log(`The generated password is ${thePassword}`);

await Promise.all([
  backend.Payer(ctcPayer, {
    amount: stdlib.parseCurrency(25),
    password: thePassword,
  }),
  backend.Receiver(ctcReceiver, {
    getPassword: () => {
      console.log(`The Receiver asked for the password.`);
      console.log(`Returning: ${thePassword}`);
      return thePassword;
    },
  }),
]);

const afterPayer = await getBalance(accPayer);
const afterReceiver = await getBalance(accReceiver);

console.log(`The Payer went from ${beforePayer} to ${afterPayer}.`);
console.log(`The Receiver went from ${beforeReceiver} to ${afterReceiver}.`);

console.log("Program terminated.");
