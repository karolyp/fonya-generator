const QUESTIONS=100;

function toggleAnswer(answerId, answerBtn){
    let answer = document.getElementById(answerId);
    if(answer.style.display == "none"){
        answer.style.display = "block";
    }else{
        answer.style.display = "none";
    }

}

function shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
                [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
}

var client = new XMLHttpRequest();
client.open('GET', './questions.json');
client.onreadystatechange = function() {

    if (client.readyState === 4 && client.status === 200) {
        let jsonObj = JSON.parse(client.responseText);
        let i = 0;
        shuffle(jsonObj);

        let questions = jsonObj
        .slice(0, QUESTIONS)
        .sort(function(a, b){
            if(a.id < b.id){
                return -1;
            }
            if(a.id > b.id){
                return 1;
            }
            if(a.id = b.id){
                return 0;
            }
        })
        .forEach((actual) => {
            let questionContainer = document.createElement("div");
            questionContainer.setAttribute("class", "container-fluid")
            document.getElementById("questions").appendChild(questionContainer);

            let q = document.createElement("div");
            q.className = "questionDiv";
            q.appendChild(document.createTextNode(actual.id + ".\t" + actual.text));
            questionContainer.appendChild(q);

            let btn = document.createElement("button");
            btn.className = "btn btn-link btn-sm cursor"
            btn.setAttribute("id","answerBtn" + i);
            btn.setAttribute("onclick", "toggleAnswer(\"answer" + i +"\", this.id)");
            btn.appendChild(document.createTextNode("Válasz"));
            questionContainer.appendChild(btn);
     
            let a = document.createElement("div");
            a.setAttribute("id", "answer" + i);
            a.style.display = "none";
            a.appendChild(document.createTextNode(actual.answer));
            questionContainer.appendChild(a);


            i++;
        });
    }
}

client.send();