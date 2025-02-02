// src/components/Quiz.jsx
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

export default function Quiz({ data, currentQuestion, totalQuestions, onAnswerSelect, selectedAnswers, answerFeedback }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null); // Reset selectedAnswer when currentQuestion changes
    }, [currentQuestion]);

    const handleSelect = (isCorrect, answerId) => {
        if (selectedAnswer !== null) return; // Prevent multiple submissions
        setSelectedAnswer(answerId);
        onAnswerSelect(isCorrect, answerId);
    };

    if (!data || !data.options || !Array.isArray(data.options)) {
        return <div>Loading question or invalid data!</div>; // Handle invalid data
    }

    return (
        <div className="quiz-container">
            <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
            <h2 className="question-number">Question {currentQuestion + 1} of {totalQuestions}</h2>
            <h3 className="question-text">{data.question}</h3>
            <div className="answers-grid">
                {data.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.isCorrect, option.id)}
                        className={`answer-button ${
                            selectedAnswer === option.id ? (option.isCorrect ? 'correct' : 'incorrect') : ''
                        } ${selectedAnswers.includes(option.id) ? 'disabled' : ''}`}
                        disabled={selectedAnswers.includes(option.id)}
                        role="radio"
                        aria-checked={selectedAnswer === option.id}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            {/* Immediate feedback (hidden span) */}
            <span aria-live="polite" className="answer-feedback" style={{ visibility: answerFeedback ? 'visible' : 'hidden', color: answerFeedback === 'correct' ? 'green' : 'red' }}>
                {answerFeedback && (answerFeedback === 'correct' ? 'Correct!' : 'Incorrect.')}
            </span>
        </div>
    );
}