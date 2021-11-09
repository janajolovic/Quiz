const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("most recent score");

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})

saveHighscore = e => {
    e.preventDefault()
    console.log("clicked")
}