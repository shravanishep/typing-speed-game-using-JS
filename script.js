const sentences = [
    "Why do JavaScript developers wear glasses? Because they don't C#.",
    "I told my code a joke — it didn’t react.",
    "I put my phone on airplane mode but it didn’t fly.",
    "Running code is cool until it runs away.",
    "I tried to debug, but the bug debugged me first.",
    "Typing fast doesn't delete the bugs, sadly.",
    "My keyboard is tired from all the drama.",
    "If coffee disappears, so does the developer.",
    "Life's too short to write clean code... just kidding. Please do.",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "The expert in anything was once a beginner.",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "Dream big. Start small. Act now.",
    "Success is the sum of small efforts repeated daily. – R. Collier",
    "Practice like you’ve never won, perform like you’ve never lost.",
    "Every great developer you know started by typing 'hello world'."
  ];
  
  // DOM elements
  const display = document.getElementById("displaytext");
  const inputField = document.getElementById("takinginput");
  const timerElement = document.getElementById("timer");
  const wpmElement = document.getElementById("wpm");
  const accuracyElement = document.getElementById("accuracy");
  const restartBtn = document.getElementById("restartbtn");
  
  // Sentence & timer variables
  let sentence = sentences[Math.floor(Math.random() * sentences.length)];
  display.innerText = sentence;
  
  let timeLeft = 60;
  let timerStarted = false;
  let interval;
  
  // Event listener for typing
  inputField.addEventListener("input", () => {
    if (!timerStarted) {
      startTimer();
      timerStarted = true;
    }
  
    checkTyping();
  });
  
  // Start countdown timer
  function startTimer() {
    interval = setInterval(() => {
      timeLeft--;
      timerElement.innerText = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(interval);
        inputField.disabled = true;
        calculateResults();
      }
    }, 1000);
  }
  
  // Check typing result
  function checkTyping() {
    // We can add live feedback here if needed later
  }
  
  // Calculate WPM and accuracy
  function calculateResults() {
    const originalText = sentence.trim();
    const userInput = inputField.value.trim();
  
    let correct = 0;
    let totalTyped = userInput.length;
  
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === originalText[i]) {
        correct++;
      }
    }
  
    let accuracy = totalTyped === 0 ? 0 : Math.round((correct / totalTyped) * 100);
    accuracyElement.innerText = accuracy;
  
    let wordCount = userInput.split(/\s+/).filter(word => word).length;
    let timeTaken = (60 - timeLeft) / 60;
    let wpm = Math.round(wordCount / timeTaken);
    wpmElement.innerText = isNaN(wpm) ? 0 : wpm;
  }
  
  // Restart button functionality
  function restartGame() {
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    display.innerText = sentence;
  
    clearInterval(interval);
    timeLeft = 60;
    timerStarted = false;
    timerElement.innerText = 60;
  
    inputField.value = "";
    inputField.disabled = false;
    wpmElement.innerText = "0";
    accuracyElement.innerText = "100";
  }
  
  restartBtn.addEventListener("click", restartGame);
  