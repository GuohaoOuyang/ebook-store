# Book Store

**_Table of Contents:_**

- [Book Store](#book-store)
- [Live Preview](#live-preview)
- [About](#about)
- [Setup Guide](#setup-guide)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)

# Live Preview

[Demo](http://ec2-15-223-64-87.ca-central-1.compute.amazonaws.com/)
![Home page preview](/client/src/utils/images/homepage.png?raw=true "Optional Title")

# About

A mock eCommerce solution

**Tech Stack**

MERN (Mongo, Express, React, Node)

| Other Highlights  |
| :---------------: |
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

PAYPAL_CLIENT_ID =

```bash
PORT = 3001

# randomly generated
JWT_SECRET=" "

# obtained from mongoDB
MONGO_URI=" "

# obtained from paypal
PAYPAL_CLIENT_ID=" "

# name and port of your local server. With out setup, requests to port 3000 are proxied to the backend.
HOST_NAME= "http://localhost:3000"
```

If any of the above environment variables are missing the project will loose functionality or even fail to run.

## Getting Started

```bash
git clone https://github.com/GuohaoOuyang/ebook-store.git
```

```bash
npm run installation
```

```bash
npm run dev
```
