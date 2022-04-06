# Hash Lock

## Abstract

This application allows a payer to lock funds with a secret password. These funds can be withdrawn by anyone possessing the secret password, and are independent from the payer's consensus network identity.

# Table of Contents

- [Hash Lock](#hash-lock)
  - [Abstract](#abstract)
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [<a href="https://github.com/Niceural/hash-lock/blob/b9baf3e39ef52429fc8799a59e710698143be51c/index.rsh">Backend</a>](#backend)
  - [Problem Analysis](#problem-analysis)
  - [Data Definition](#data-definition)
  - [Communication Construction](#communication-construction)
  - [Assertion Insertion](#assertion-insertion)
- [<a href="https://github.com/Niceural/hash-lock/blob/b9baf3e39ef52429fc8799a59e710698143be51c/index.mjs">Frontend</a>](#frontend)
- [Discussions](#discussions)
  - [Vulnerabilities](#vulnerabilities)
  - [Limitations](#limitations)
- [Bibliography](#bibliography)

# Introduction

# <a href="https://github.com/Niceural/hash-lock/blob/b9baf3e39ef52429fc8799a59e710698143be51c/index.rsh">Backend</a>

## Problem Analysis

This application involves two parties: the payer sending the funds (called _Payer_) and the receiver of those funds (called _Receiver_).

The Payer knows the value of the funds being transferred and the secret password. It transfers and locks the funds with the password at the beginning of the program. The Payer doesn't learn anything throughout the execution of the application.

The Receiver starts off by knowing nothing. After learning the password, it receives the funds.

## Data Definition

Data has to be stored using the appropriate variables to prevent unexpected behavior from occurring. We have chosen to store the amount transferred as a variable of type _Uint_, as issues can occur while comparing two variables of type _FixedPoint_. For the sake of simplicity, we have decided to store the password in a variable of type _UInt_.

## Communication Construction

As the data stored on the blockchain is shared among all the participants, the Payer cannot publish the password without everyone on the network being able to read it. We chose to use cryptography to solve this problem where the Payer would publish a digest of the password which could be checked against the password provided by the Receiver.

The communication pattern for this application is stated below:

1. the Payer publishes a digest of the password and pays the amount;
2. the Receiver publishes the password;
3. the consensus verifies the password and transfers the funds to the Receiver.

## Assertion Insertion

The following three assertions can be added to the application to verify the logic:

1. Before the Receiver publishes the password, it is unknowable by him or everyone else except the Payer (using `unknowable()`);
2. the Receiver assumes that the password provided by Alice is correct (using `assume()`);
3. the consensus requires that the Payer's digest and the Receiver's password match (using `require()`).

The implementation of the above steps can be found in [`index.rsh`](https://github.com/Niceural/hash-lock/blob/b9baf3e39ef52429fc8799a59e710698143be51c/index.rsh).

# <a href="https://github.com/Niceural/hash-lock/blob/b9baf3e39ef52429fc8799a59e710698143be51c/index.mjs">Frontend</a>

A simple frontend implementation is proposed in [`index.mjs`](https://github.com/Niceural/hash-lock/blob/b9baf3e39ef52429fc8799a59e710698143be51c/index.mjs)
Two accounts are created, one for the Payer and one for the Receiver, starting with a balance of 100 test tokens. The contracts are deployed and the password is randomly generated. Finally, the attributes and methods are implemented.

# Discussions

## Vulnerabilities

This application could not be safely used on the mainnet of Ethereum's or Algorand's network. Once the password published by the Receiver is verified with a certain gas fee amount, a corrupted miner on the network could send a transaction with the same password but a lower gas fee. The transaction of the miner would then be added to the block before the Receiver and therefore the funds would transferred to the miner and not to the Receiver. A solution to this problem is proposed in [Relay Account](https://github.com/Niceural/relay-account).

## Limitations

A better implementation would include a time limit past which the remaining funds would be transferred back to the payer. We could also think of a functionality to retrieve part of the locked funds. In addition, a function could be implemented to allow the Receiver to check the amount locked in the application.

# Bibliography

- [Reach](https://docs.reach.sh/#reach-top) programming language
- [Hash Lock](https://docs.reach.sh/workshop/hash-lock/#workshop-hash-lock) workshop
- [_Security By Design & Smart Contract Audits | Shayan Eskandari_, CryptoCurrency Certification Consortium
  ](https://youtu.be/gfD1KBtLWZI)
