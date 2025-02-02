// src/components/Welcome.jsx
export default function Welcome({ onStart }) {
    return (
      <div className="welcome-screen">
        <h1>Welcome to the Quiz!</h1>
        <p>Test your knowledge and earn points!</p>
        <button onClick={onStart} className="start-button">
          Start Quiz
        </button>
      </div>
    );
  }