// Set of questions for the survey
const allQuestions = [
  { question: "What is your favorite color?", type: "radio", options: ["Red", "Blue", "Green", "Yellow"] },
  { question: "How often do you exercise?", type: "radio", options: ["Every day", "Few times a week", "Rarely", "Never"] },
  { question: "What is your favorite programming language?", type: "checkbox", options: ["JavaScript", "Python", "Java", "C++"] },
  { question: "Do you enjoy traveling?", type: "radio", options: ["Yes", "No"] },
  { question: "What is your preferred mode of transport?", type: "radio", options: ["Car", "Bike", "Public Transport", "Walking"] },
  { question: "What kind of movies do you like?", type: "radio", options: ["Action", "Comedy", "Drama", "Horror"] },
  { question: "How often do you read books?", type: "radio", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
  { question: "What is your favorite season?", type: "radio", options: ["Spring", "Summer", "Autumn", "Winter"] },
  { question: "Do you prefer cats or dogs?", type: "radio", options: ["Cats", "Dogs"] },
  { question: "What type of music do you enjoy?", type: "radio", options: ["Pop", "Rock", "Classical", "Jazz"] }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;

// Function to shuffle and select 5 questions
function selectRandomQuestions() {
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  selectedQuestions = shuffled.slice(0, 5);
}

// Populate the form with the current question
function displayQuestion(index) {
  const surveyForm = document.getElementById("surveyForm");
  surveyForm.innerHTML = "";

  const questionObj = selectedQuestions[index];
  const questionElement = document.createElement("div");
  questionElement.className = "question";

  const questionText = document.createElement("h3");
  questionText.innerText = questionObj.question;
  questionElement.appendChild(questionText);

  questionObj.options.forEach(option => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = questionObj.type;
    input.name = `question${index}`;
    input.value = option;
    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    questionElement.appendChild(label);
    questionElement.appendChild(document.createElement("br"));
  });

  surveyForm.appendChild(questionElement);
}

// Handle the previous question
function previousQuestion() {
  const progressBar = document.getElementById("progressBar");
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    progressBar.style.width = `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%`;

    // Show the Next button if it was hidden
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";

    // Hide the Back button on the first question
    if (currentQuestionIndex === 0) {
      document.getElementById("backBtn").style.display = "none";
    }
  }
}

// Handle the next question
function nextQuestion() {
  const progressBar = document.getElementById("progressBar");
  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    progressBar.style.width = `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%`;

    // Show the Back button if it was hidden
    if (currentQuestionIndex > 0) {
      document.getElementById("backBtn").style.display = "block";
    }

    // Show the Submit button and hide the Next button on the last question
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("submitBtn").style.display = "block";
    }
  }
}

// Handle the survey submission
function submitSurvey() {
  // Display thank-you message in a prompt
  alert("Thank you for completing the survey!");

  // Show the thank-you section with the Close Survey button
  document.getElementById("surveyForm").style.display = "none";
  document.getElementById("thankYouMessage").style.display = "block";
}

// Handle closing the survey
function closeSurvey() {
  // Hide the thank-you message
  document.getElementById("thankYouMessage").style.display = "none";

  // Show the success message with the Back to Survey button
  document.getElementById("successMessage").style.display = "block";
}

// Handle returning to the survey
function backToSurvey() {
  // Reset the survey form for a new attempt
  currentQuestionIndex = 0;
  selectRandomQuestions();
  displayQuestion(currentQuestionIndex);

  // Reset progress bar
  document.getElementById("progressBar").style.width = "0%";

  // Show the survey form
  document.getElementById("surveyForm").style.display = "block";

  // Hide the success message
  document.getElementById("successMessage").style.display = "none";

  // Hide submit button and back button initially
  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("backBtn").style.display = "none";

  // Show next button
  document.getElementById("nextBtn").style.display = "block";
}

// Initialize the survey form
document.addEventListener("DOMContentLoaded", () => {
  selectRandomQuestions();
  displayQuestion(currentQuestionIndex);

  // Initially hide the Back button
  document.getElementById("backBtn").style.display = "none";
});
