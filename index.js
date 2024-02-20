const express = require('express');
const axios = require('axios');

const app = express();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get('/kshitiz', async (req, res) => {
  try {
    const triviaResponse = await axios.get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean');
    const { question, correct_answer, incorrect_answers } = triviaResponse.data.results[0];

  
    const isOptionA = Math.random() < 0.5;
    const correctOption = isOptionA ? "A" : "B";
    const incorrectOption = isOptionA ? "B" : "A";

   
    const responseObj = {
      question,
      correct_answer: `${correctOption}, "${correct_answer}"`,
      incorrect_answers: `${incorrectOption} ["${incorrect_answers[0]}"]`
    };

    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
