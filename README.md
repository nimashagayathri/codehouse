# CodeHouse - AI-Powered Recruitment Platform (Frontend)

CodeHouse is a modern, AI-powered recruitment and talent management platform frontend built with React. It provides specialized dashboards for Candidates, Recruiters, Hiring Managers, and Admins to streamline the hiring process with AI-driven insights.

## Features

- **Role-Based Dashboards**: Tailored user experiences for Job Seekers, Recruiters, Hiring Managers, and Admins.
- **AI Resume Parsing & Ranking**: Uses Groq (Llama-3) API to analyze resumes and rank candidates based on match percentages.
- **AI Chatbot Assistant**: A floating interactive assistant to guide candidates through the platform.
- **Job Search & Applications**: seamless job exploring and matching for candidates.
- **Analytics & User Management**: Admin controls and analytics over the entire platform.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository** (if not already done).
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (where `package.json` is located) and add your Groq API key (used for AI features):
   ```env
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm start
   ```
   This runs the app in development mode.
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Built With

- **React** - Frontend library for building UI
- **Tailwind CSS** - Styling and layout
- **Lucide React** - UI Icons
- **Groq API** - LLM inference for AI Chatbot and AI Resume Parsing integrations
