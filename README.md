# WealthUp - Full-Stack Trading Platform

WealthUp is a comprehensive clone of the Zerodha trading platform, developed as a collaborative group project. The platform is designed to handle high-frequency interactions, secure user authentication, and real-time portfolio management.

## Team Contributions
- **Backend Architecture (Aman Ahmad)**: Developed the core API using Node.js/Express, designed the MongoDB schema, implemented JWT-based authentication, and managed complex transaction logic for buying/selling stocks.
- **Frontend & Landing Page (Manish Kushvaha)**: Built the responsive landing pages and user onboarding flows using React and Bootstrap.
- **Trading Dashboard (Mayank)**: Developed the data-rich dashboard for portfolio tracking and real-time analytics.

## Core Features
- **Secure Authentication**: JWT-based user sessions and demo account access.
- **Portfolio Management**: Real-time tracking of Holdings, Positions, and Orders.
- **Transaction Engine**: Robust logic for simulated stock trading (Buy/Sell) with automatic portfolio updates.
- **Cross-Origin Integration**: Seamless communication between the landing page, dashboard, and backend services.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT.
- **Frontend**: React, Bootstrap, Axios.
- **Deployment**: Vercel (Dashboard/Frontend), Render (Backend).

## Setup & Installation
1. Clone the repository.
2. Install dependencies in each directory (`backend`, `frontend`, `dashboard`).
3. Set up your `.env` file in the `backend` folder with your `MONGO_URL` and `PORT`.
4. Run `npm start` (or `npm run dev`) in each directory.
