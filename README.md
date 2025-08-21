Invoice Generator - Complete Setup and Run Instructions
===========================================================
Project Description
-------------------
This is a web application for generating invoices. Users can add products, calculate totals, and download invoices as PDFs. The frontend is built with React (Vite + Tailwind), and the backend is built with Node.js (Express + MongoDB). This project was developed as a task for Levitation Infotech.

Installation Steps
------------------

Step 1: Clone the repository
----------------------------
git clone https://github.com/AbhangPaturkar0709/Invoice-Generator
cd Invoice-Generator

Step 2: Install Frontend Dependencies
-------------------------------------
- cd client
- npm install

Step 3: Install Backend Dependencies
------------------------------------
- cd ../server
- npm install

Step 4: Set up Environment Variables
------------------------------------
1. Create a `.env` file inside the `server` folder.
2. Add the following variables:
- PORT=5000
- MONGO_URL=<your_mongodb_connection_string>
- JWT_SECRET=<your_jwt_secret>

> Replace `<your_mongodb_connection_string>` and `<your_jwt_secret>` with your actual values.

Running the Application
-----------------------

Development Mode
----------------
1. Start the backend server
cd server
npm run dev

2. Start the frontend client
cd ../client
npm run dev


3. Open your browser at:
http://localhost:5173

Usage
-----
Features:

- Add products with name, price, and quantity
- Automatically calculate totals
- Generate and preview invoices
- Download invoices as PDF
- Backend stores invoice data in MongoDB
