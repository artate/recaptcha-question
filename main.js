function hideThis(divId) {
    for (let i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).style.display = "none";
    }
}

function showThis(divId) {
    for (let i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).style.display = "block";
    }
}

function countdowntimer() {
    let timeleft = 10;

    downloadTimer = setInterval(function () {
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;

        if (timeleft == 0) {
            setTimeout(function () {
                puzzleFailed();
            }, 1000); //Delay so that the user can see it reached 0
        }

        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        }
    }, 700); //0.7 seconds to each second

    getQuestion();
}

function getQuestion() {
    let num1 = Math.floor(Math.random() * 1000);
    let num2 = Math.floor(Math.random() * 1000);
    let answer = num1 * num2;

    document.getElementById('puzzle').innerHTML = "<p>What is " + num1 + " x " + num2 + "</p>"; // + answer + "</p>";

    validateAnswer(answer);
}

function validateAnswer(answer) {
    const puzzleBox = document.getElementById('puzzle-answer');

    puzzleBox.addEventListener('keyup', function (event) {
        let puzzleAnswer = document.getElementById('puzzle-input').value;

        if (puzzleAnswer == answer) {
            clearInterval(downloadTimer);
            hideThis('countdowntimer', 'puzzle-answer');
            document.getElementById('puzzle').innerHTML = '<p>I appreciate your honesty but robots cannot answer this form.<p><a href="javscript:void(0);" onClick="showThis(\'recaptcha\');hideThis(\'puzzle-container\')" class="btn">Show recaptcha anyway</a>';
        }
    });
}

function puzzleFailed() {
    document.getElementById("countdowntimer").innerHTML = "<p>Looks like you\'re not a robot afterall. Please fill in the Captcha so we can be sure.</p>";
    hideThis('puzzle-container');
    showThis('recaptcha');
}
