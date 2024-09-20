let statesData;
let numberedStates = {};
let currentQuestion = 0;
let score = 0;
let usData;
let currentStateNumber;
let quizResults = [];

// Load the US map and initialize the game
d3.json("https://d3js.org/us-10m.v1.json").then(function(us) {
    usData = us;
    const svg = d3.select("#map-container").append("svg")
        .attr("viewBox", "0 0 960 600");

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", d3.geoPath())
        .attr("class", "state")
        .attr("id", d => `state-${d.id}`);

    // Load states data and start the game
    d3.json("states.json").then(function(data) {
        statesData = data;
        assignRandomNumbers(svg);
        startQuiz();
    });
});

function assignRandomNumbers(svg) {
    const numbers = Array.from({length: 50}, (_, i) => i + 1);
    const path = d3.geoPath();
    
    statesData.forEach(state => {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const number = numbers.splice(randomIndex, 1)[0];
        numberedStates[number] = state;
        
        const centroid = path.centroid(topojson.feature(usData, usData.objects.states).features.find(f => f.id == state.id));
        
        svg.append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1])
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("class", "state-number")
            .text(number);
    });
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizResults = [];
    askQuestion();
    document.getElementById("submit").addEventListener("click", checkAnswer);
}

function askQuestion() {
    if (currentQuestion < 10) {
        currentStateNumber = Math.floor(Math.random() * 50) + 1;
        const state = numberedStates[currentStateNumber];
        document.getElementById("question").textContent = `What is the name and postal code of state number ${currentStateNumber}?`;
        document.getElementById("answer-name").value = "";
        document.getElementById("answer-code").value = "";
        document.getElementById("result").textContent = "";
        document.getElementById("answer-name").style.display = "block";
        document.getElementById("answer-code").style.display = "block";
        document.getElementById("submit").style.display = "block";
        document.getElementById("submit").setAttribute("aria-disabled", "false");
        currentQuestion++;
    } else {
        endQuiz();
    }
}

function checkAnswer() {
    const userAnswerName = document.getElementById("answer-name").value.trim().toUpperCase();
    const userAnswerCode = document.getElementById("answer-code").value.trim().toUpperCase();
    const correctState = numberedStates[currentStateNumber];

    const isNameCorrect = correctState.name.toUpperCase() === userAnswerName;
    const isCodeCorrect = correctState.abbr === userAnswerCode;
    const askQuestionTime = isNameCorrect && isCodeCorrect? 2500 : 5000

    document.getElementById("submit").setAttribute("aria-disabled", "true");

    if (isNameCorrect && isCodeCorrect) {
        score++;
        document.getElementById("result").textContent = "Correct!";
        quizResults.push({number: currentStateNumber, correct: true, userAnswer: `${userAnswerName} (${userAnswerCode})`, correctAnswer: `${correctState.name} (${correctState.abbr})`});
    } else {
        document.getElementById("result").textContent = `Incorrect. The correct answer was ${correctState.name} (${correctState.abbr}).`;
        quizResults.push({number: currentStateNumber, correct: false, userAnswer: `${userAnswerName} (${userAnswerCode})`, correctAnswer: `${correctState.name} (${correctState.abbr})`});
    }

    document.getElementById("score").textContent = `Score: ${score}/${currentQuestion}`;
    setTimeout(askQuestion, askQuestionTime);
}

function endQuiz() {
    document.getElementById("question").textContent = `Quiz complete! Your final score is ${score}/10.`;
    document.getElementById("answer-name").style.display = "none";
    document.getElementById("answer-code").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("result").textContent = "";

    const resultsContainer = document.getElementById("quiz-results");
    resultsContainer.innerHTML = "<h2>Quiz Results</h2>";

    const correctList = document.createElement("ul");
    correctList.innerHTML = "<h3>Correct Answers:</h3>";

    const incorrectList = document.createElement("ul");
    incorrectList.innerHTML = "<h3>Incorrect Answers:</h3>";

    quizResults.forEach(result => {
        const listItem = document.createElement("li");
        listItem.textContent = `State ${result.number}: You answered ${result.userAnswer}, Correct answer: ${result.correctAnswer}`;
        if (result.correct) {
            correctList.appendChild(listItem);
        } else {
            incorrectList.appendChild(listItem);
        }
    });

    resultsContainer.appendChild(correctList);
    resultsContainer.appendChild(incorrectList);
}