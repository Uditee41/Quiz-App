import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // If you're using node-fetch v3, this is necessary

const app = express();
const port = 4000;

// Enable CORS to allow requests from the frontend
app.use(cors());

// Route to get quiz data from external API
app.get('/quiz-data', async (req, res) => {
  try {
    // Fetch quiz data from the external API
    const response = await fetch('https://api.jsonserve.com/Uw5CrX');

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = await response.json();

    // Transforming the data into the expected format
    const formattedQuizData = {
      quizzes: data.questions.map((question) => ({
        question: question.description,  // Correctly map question description
        options: question.options.map((option) => ({
          id: option.id,
          text: option.description,  // Mapping 'description' to 'text'
          isCorrect: option.is_correct // Correcting is_correct to isCorrect
        }))
      }))
    };

    // Send the transformed data to the frontend
    res.json(formattedQuizData);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Quiz backend server is running at http://localhost:${port}`);
});
