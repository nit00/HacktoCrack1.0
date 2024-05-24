AI-Chat Application
This repository contains a React frontend and a Flask backend for the AI-Chat application. The frontend handles user authentication via Google Sign-In and communicates with the Flask backend, which interacts with Google Generative AI for generating chatbot responses. The purpose of this application is to bridge the communication gap between people in a country like India where we speak multiple languages.

Prerequisites
Ensure you have the following installed:

Node.js
npm
Python
pip
Firebase account

Getting Started
Clone the Repository

git clone https://github.com/nit00/HacktoCrack1.0.git

cd HacktoCrack1.0

Frontend (React)

Configuration

Navigate to the ui directory:

cd ui

Install Dependencies

npm install


Run the React App

npm start

Note:
Login on the frontend is only available through Google Sign-In.
The React app will be available at http://localhost:3000.

Backend (Flask)
Configuration

Navigate to the backend-api directory:
cd backend-api

Create a Virtual Environment
bash
Copy code
python -m venv venv

Install Dependencies
pip install -r requirements.txt

Run the Flask App
flask run

Note
The Flask app will be available at http://127.0.0.1:5000.
Usage
Open the React app in your browser (http://localhost:3000).
Sign in using Google Sign-In.
Interact with the chatbot. The backend will process your messages and return responses.

