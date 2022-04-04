# Reach Workshop - Hash Lock

## Abstract

This repository contains the implementation of the [Hash Lock](https://docs.reach.sh/workshop/hash-lock/#workshop-hash-lock) [Reach](https://docs.reach.sh/#reach-top) workshop. This application allows a payer to lock funds with a secret password. These funds can be withdrawn by anyone possessing the secret password, and are independent from the payer's consensus network identity.

# Table of Contents

- [Reach Workshop - Hash Lock](#reach-workshop---hash-lock)
  - [Abstract](#abstract)
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Problem Analysis](#problem-analysis)
  - [Protagonists](#protagonists)
  - [Data Definition](#data-definition)

# Introduction

# Problem Analysis

## Protagonists

This application involves two parties: the payer sending the funds (called "Payer") and the receiver of those funds (called "Receiver").

The Payer knows the value of the funds being transferred and the secret password. It transfers and locks the funds with the password at the beginning of the program. The Payer doesn't learn anything throughout the execution of the application.

The Receiver starts off by knowing nothing. After learning the password, it receives the funds.

## Data Definition
