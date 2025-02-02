// src/components/Results.jsx
export default function Results({ score, total, onRestart }) {
    return (
      <div className="results-screen">
        <h1>Quiz Complete!</h1>
        <div className="score-container">
          <div className="score-card">
            <h2>Your Score</h2>
            <p className="score">{score}/{total}</p>
            <p className="percentage">{(score/total * 100).toFixed(0)}%</p>
          </div>
        </div>
        <button onClick={onRestart} className="restart-button">
          Try Again
        </button>
      </div>
    );
  }