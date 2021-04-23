# Book Store

**_Table of Contents:_**

- [Book Store](#book-store)
- [Live Preview](#live-preview)
- [About](#about)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
- [Setup Guide](#setup-guide)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)

# Live Preview

[Demo](http://ec2-15-223-64-87.ca-central-1.compute.amazonaws.com/)

# About

A mock eCommerce solution

## Features

- **Sign up with email check up front:** The user will be going to input his email to pair with the database first. If the email has not been registered yet, he will be redirect to sign up page without need to input email again. Sign up form is built on **Formik** to handle validation and error messages.
  ![signup](/client/src/utils/images/signup.gif)
  <br>

- **Sign in/sign up smooth switch**
  ![signin](/client/src/utils/images/signin.gif)
  <br>

- **Products search:** All keywords search are handled at server database
  ![search](/client/src/utils/images/search.gif)
  <br>

- **Shopping cart side panel:** Add to cart will update cart global state and localStorage, this will trigger a side Modal with cart summary.
  ![shoppingcart](/client/src/utils/images/shoppingcart.gif)
  <br>

- **Checkout process/change address:** The user will be able to alter the address while viewing the cart. Checkout will create an unfinished order, and payapal sandbox come into play here. Once the payment go through the database, user will be redirect to a confirm page with the choice to view order.
  ![checkout](/client/src/utils/images/checkout.gif)
  <br>

- **Order history and sign out:** Order status will be printed to the right of the order page.
  ![history_signout](/client/src/utils/images/history_signout.gif)
  <br>

## Tech Stack

MERN (Mongo, Express, React, Node)

| Other Highlights  |
| :---------------: |
|  Redux            |
|  React-Bootstrap  |
| styled-components |
|   formik & jwt    |

# Setup Guide

## Prerequisites

In order to run this project locally you **must** have [node.js](https://nodejs.org/en/) installed.

This project was built on the following node version.

```bash
$ node --version
v13.14.0
```

You must also create a `.env` file in with the following

```bash
PORT = 3001

# production or development
NODE_ENV = ""

# randomly generated
JWT_SECRET=" "

# obtained from mongoDB
MONGO_URI=" "

# obtained from paypal
PAYPAL_CLIENT_ID=" "

# name and port of your local server. With out setup, requests to port 3000 are proxied to the backend.
HOST= "0.0.0.0"
```

If any of the above environment variables are missing the project will loose functionality or even fail to run.

## Getting Started

```bash
git clone https://github.com/GuohaoOuyang/ebook-store.git
```

```bash
npm run install
```

```bash
npm run client-install
```

```bash
npm run dev
```
