var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gameRunning = false;
var userClickedPattern = [];
var level = 0;

$(document).keydown(function() {
    if (! gameRunning) {
        gameRunning = true;
        $("h1").text("Niveau 0");
        prochaineSequence();
    }
})

$("#btnRejouer").click(function() {
    if (! gameRunning) {
        gameRunning = true;
        $("h1").text("Niveau 0");
        prochaineSequence();
    }
})

function prochaineSequence() {
    userClickedPattern = [];

    level ++;
    $("h1").text("Niveau " + level);
    var nbrAleatoire = Math.floor(Math.random() * 4);
    var couleurAleatoire = buttonColours[nbrAleatoire];
    gamePattern.push(couleurAleatoire);

    $("#" + couleurAleatoire).fadeOut(100).fadeIn(100);
    playSound(couleurAleatoire);
}

function playSound(nom) {
    var sonBouton = new Audio("./sounds/" + nom + ".mp3")
    sonBouton.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                prochaineSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("h1").text("Perdu, appuyer sur une touche pour recommencer");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        rejouer();
    }
}

function rejouer() {
    level = 0;
    gamePattern = [];
    gameRunning = false;
}

$(".btn").click(function (event) {
    if (!gameRunning) {
        return null;
    }
    var couleurChoisiUser = event.target.id;
    userClickedPattern.push(couleurChoisiUser);

    playSound(couleurChoisiUser);
    animatePress(couleurChoisiUser);

    checkAnswer(userClickedPattern.length-1);
});
