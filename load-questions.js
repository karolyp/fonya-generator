const QUESTIONS = 5;

function toggleAnswer(answerId, answerBtn) {
    var answer = document.getElementById(answerId);
    if (answer.style.display == "none") {
        answer.style.display = "block";
    } else {
        answer.style.display = "none";
    }

}

function shuffle(a) {
    for (var i = a.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

var questionsClient = new XMLHttpRequest();
questionsClient.open('GET', './questions.json');
questionsClient.onreadystatechange = function () {
    if (questionsClient.readyState === 4 && questionsClient.status === 200) {
        var jsonObj = JSON.parse(questionsClient.responseText);
        var i = 0;
        shuffle(jsonObj);

        var questions = jsonObj
            .slice(0, QUESTIONS)
            .sort(function (a, b) {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id = b.id) {
                    return 0;
                }
            })
            .forEach((actual) => {
            var questionContainer = document.createElement("div");
        questionContainer.setAttribute("class", "container-fluid")
        document.getElementById("questions").appendChild(questionContainer);

        var q = document.createElement("div");
        q.className = "questionDiv";
        q.appendChild(document.createTextNode(actual.id + ".\t" + actual.question));
        questionContainer.appendChild(q);

        var btn = document.createElement("button");
        btn.className = "btn btn-link btn-sm cursor"
        btn.setAttribute("id", "answerBtn" + i);
        btn.setAttribute("onclick", "toggleAnswer(\"answer" + i + "\", this.id)");
        btn.appendChild(document.createTextNode("Válasz"));
        questionContainer.appendChild(btn);

        var a = document.createElement("div");
        a.setAttribute("id", "answer" + i);
        a.style.display = "none";
        a.appendChild(document.createTextNode(actual.answer));
        questionContainer.appendChild(a);


        i++;
    })
        ;
    }
}

questionsClient.send();

var longQuestionsClient = new XMLHttpRequest();
longQuestionsClient.open('GET', './long_questions.json');

longQuestionsClient.onreadystatechange = function () {
    if (longQuestionsClient.readyState === 4 && longQuestionsClient.status === 200) {
        var parsedQuestions = JSON.parse(longQuestionsClient.responseText);

        var longQuestionContainer = document.createElement("div");
        longQuestionContainer.setAttribute("class", "container-fluid")
        document.getElementById("longQuestion").appendChild(longQuestionContainer);

        var q = document.createElement("div");
        q.className = "questionDiv";
        randomQuestion = parsedQuestions[Math.round(Math.random() * parsedQuestions.length)];
        q.appendChild(document.createTextNode(randomQuestion.id + ".\t" + randomQuestion.question));
        longQuestionContainer.appendChild(q);

    }
}

longQuestionsClient.send();
