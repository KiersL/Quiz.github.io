// fischer-yates shuffle algorithm
function shuffle(anylist)
{
    for(let i = anylist.length - 1; i > 0; i--)
    {
        // pick a random index for the 2nd last element
        const randomno = Math.floor(Math.random() * (i + 1));
        [anylist[i], anylist[randomno]] = [anylist[randomno], anylist[i]];
    
    }
    return anylist;
}

const quizData = [
    {
        
    question : "What is the capital of Japan?",
    options : ["Kyushu", "Hokkaido", "Tokyo", "Kanto"],
    answer : "Tokyo"

    },

    {
        
        question : "How many bones are there in an adult human body?",
        options : ["198", "206", "220", "304"],
        answer : "206"
    
    },

    {
        
        question : "What colour is a black box?",
        options : ["Black", "Grey", "Yellow", "Orange"],
        answer : "Orange"
    
    },

    {
        
        question : "Which Ocean is the largest?",
        options : ["Arctic Ocean", "Indian Ocean", "Atlantic Ocean", "Southern Ocean"],
        answer : "Atlantic Ocean"
    
    },

    {
        
        question : "What is the national animal of Scotland?",
        options : ["A unicorn", "A leopard", "A Jaguar", "A swan"],
        answer : "A unicorn"
    
    },

    {
        
        question : "What is the fear of flowers called?",
        options : ["Arachnaphobia", "Anthophobia", "Achluophobia", "Acrophobia"],
        answer : "Anthophobia"
    
    },

    {
        
        question : "What is the fear of flowers called?",
        options : ["Arachnaphobia", "Anthophobia", "Achluophobia", "Acrophobia"],
        answer : "Anthophobia"
    
    },

];

// variables
const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('timertext');
const progressBar = document.getElementById('progressbar');
const progressBarContainer = document.getElementById('progressbarcontainer');
const optionscontainer = document.getElementById('option-container');
const resultelement = document.getElementById('result');

const timerSettings = document.getElementById('timer-settings');
const timerSettingsLabel = document.getElementById('timer-settings-label');
const fblabel = document.getElementById('fb');


// initialise progress bar to 0 before quiz starts
progressBar.style.width = '0%';


startButton.addEventListener('click', startQuiz);

// let when intend to change variable value in the future
let current_index = 0;
let score = 0;
let countdowntime = parseInt(timerSettings.value);

// update countdown time when dropdown value changes
timerSettings.addEventListener('change', () => {
    countdowntime = parseInt(timerSettings.value);
    timerText.textContent = countdowntime;
})



function startQuiz()
{
    shuffle(quizData);
    startButton.style.display = 'none'; // hide the start button
    timerSettings.style.display = 'none';
    timerSettingsLabel.style.display = 'none';
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);
     
    if(current_index < quizData.length)
    {


        timerText.textContent = countdowntime; //reset the timer

        progressBar.style.width = `${((current_index + 1) / quizData.length) * 100}%`


        const currentQuestionSet = quizData[current_index];
        questionElement.textContent = currentQuestionSet.question;

        // remove previous button clones
        optionscontainer.innerHTML = '';

        // clone a button for each option
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn'); // to attach a class tag to a html component
            optionscontainer.appendChild(button);

            // for each button clicked
            button.addEventListener('click', () => {
                checkAnswer(option);

            });
        })



        // create a timer with a setInterval() function (built in timer)
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0) // if time is up
            {
                clearInterval(timer); // reset timer
                showfb(null);
                
            }
        }, 1000);
    } else
    {
        endquiz();
    }
}

function checkAnswer(option)
{
    const correctanswer = quizData[current_index].answer;
    if(option === correctanswer)
    {
        score += 1;
    }
    resultelement.textContent = `Point(s): ${score}`;

    // current_index += 1;

    // loadQuestion();

    clearInterval(timer);
    showfb(option);

}

function showfb(option)
{
    const currentQuizData = quizData[current_index];
    let fb = "";  // fb variable
    if(option === currentQuizData.answer)
    {
        fb = "Correct!"
    } else if (option === null)
    {
        fb = `Time's up! The correct answer was ${currentQuizData.answer}`;
    } else
    {
        fb = `Incorrect. The correct answer was ${currentQuizData.answer}`;
    }

    fblabel.textContent = fb;
    setTimeout(() => {
        current_index += 1
        loadQuestion();
        fblabel.textContent = "";
    }, 3000); 
        
}

function endquiz()
{
    clearInterval(timer);
    progressBarContainer.style.display = 'none';
    optionscontainer.style.display = 'none';
    timerElement.style.display = 'none';
    fblabel.textContent = "none";
    questionElement.textContent = "Quiz has ended."

}