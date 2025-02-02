# Quiz App

## Overview
This is a simple interactive quiz application built using **React.js**. The app allows users to answer multiple-choice questions, track progress, and view their final score.

## Features
- Welcome screen with a **Start Quiz** button.
- Dynamic progress bar to show quiz progression.
- Interactive multiple-choice questions with instant feedback.
- Final results screen with a score display.
- Ability to restart the quiz.

## Technologies Used
- **React.js** for the frontend.
- **CSS** for styling and layout.
- **Fetch API** to retrieve quiz data from a local backend.

## Folder Structure
```
quiz-app/
│-- src/
│   ├── components/
│   │   ├── ProgressBar.jsx
│   │   ├── Quiz.jsx
│   │   ├── Results.jsx
│   │   ├── Welcome.jsx
│   ├── App.jsx
│   ├── App.css
│-- public/
│-- package.json
│-- README.md
```

## Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Start the development server**:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## Backend Setup
Ensure you have a backend running that serves quiz data. Example JSON response structure:
```json
{
  "quizzes": [
    {
      "question": "What is the capital of France?",
      "options": [
        { "id": 1, "text": "Paris", "isCorrect": true },
        { "id": 2, "text": "London", "isCorrect": false },
        { "id": 3, "text": "Berlin", "isCorrect": false },
        { "id": 4, "text": "Madrid", "isCorrect": false }
      ]
    }
  ]
}
```
Make sure your backend is running at `http://localhost:4000/quiz-data` or update the fetch URL in `App.jsx` accordingly.

## Usage
1. Click **Start Quiz** to begin.
2. Select an answer for each question.
3. The progress bar updates dynamically.
4. At the end, see your final score and percentage.
5. Click **Try Again** to restart.

## Customization
- Modify `App.css` to change the UI styles.
- Edit `Quiz.jsx` to change how questions are displayed.
- Update the backend API to add more quiz questions.

## License
This project is licensed under the **MIT License**.

## Author
Developed by **Your Name**

