// src/App.jsx
import { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Results from './components/Results';
import './App.css';

function App() {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('welcome');
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answerFeedback, setAnswerFeedback] = useState(null); // Add feedback state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/quiz-data');
                if (!response.ok) {
                    const errorData = await response.json(); // Try to get error details from server
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData?.message || response.statusText}`);
                }
                const data = await response.json();
                console.log("Data received:", data); // Log the received data
                setQuizData(data.quizzes);
            } catch (err) {
                console.error("Error fetching data:", err); // Log the full error for debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStartQuiz = () => {
        setGameStatus('playing');
        setCurrentQuestion(0); // Reset current question when starting
        setScore(0); // Reset score
        setSelectedAnswers([]); // Reset selected answers
        setAnswerFeedback(null); // Reset feedback
    };

    const handleAnswerSelect = (isCorrect, answerId) => {
        if (selectedAnswers.includes(answerId)) return; // Prevent multiple clicks

        setAnswerFeedback(isCorrect ? 'correct' : 'incorrect'); // Set immediate feedback

        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        setSelectedAnswers(prevAnswers => [...prevAnswers, answerId]);

        setTimeout(() => {
            setAnswerFeedback(null); // Clear feedback after delay
            if (currentQuestion < quizData.length - 1) {
                setCurrentQuestion(prevQuestion => prevQuestion + 1);
            } else {
                setGameStatus('finished');
            }
        }, 1000);
    };


    const handleRestart = () => {
        setGameStatus('welcome');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswers([]);
        setAnswerFeedback(null);
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="container">
            {gameStatus === 'welcome' && <Welcome onStart={handleStartQuiz} />}
            {gameStatus === 'playing' && quizData.length > 0 && ( // Check if quizData is loaded
                <Quiz
                    data={quizData[currentQuestion]}
                    totalQuestions={quizData.length}
                    currentQuestion={currentQuestion}
                    onAnswerSelect={handleAnswerSelect}
                    selectedAnswers={selectedAnswers}
                    answerFeedback={answerFeedback} // Pass feedback to Quiz
                />
            )}
            {gameStatus === 'finished' && (
                <Results score={score} total={quizData.length} onRestart={handleRestart} />
            )}
        </div>
    );
}

export default App;