import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);

const [accPayer, accReceiver] = await stdlib.newTestAccounts(
  2,
  startingBalance
);
console.log("The Payer and the Receiver have been given some test tokens.");

console.log("Launching...");
const ctcPayer = accAlice.contract(backend);
const ctcReceiver = accBob.contract(backend, ctcAlice.getInfo());

console.log("Starting backends...");
await Promise.all([
  backend.Alice(ctcAlice, {
    ...stdlib.hasRandom,
    // implement Alice's interact object here
  }),
  backend.Bob(ctcBob, {
    ...stdlib.hasRandom,
    // implement Bob's interact object here
  }),
]);

console.log("Goodbye, Alice and Bob!");
