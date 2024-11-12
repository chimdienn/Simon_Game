function nextSequence(){
    level++;
    $("h1").html("level " + level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);
    setTimeout(function(){
        flashAnimation(randomChosenColor);
        playSound(randomChosenColor);
    }, 200);
    console.log(gamePattern);
}

function flashAnimation(id){
    $("#"+id).animate({opacity: 0.4}, 70).animate({opacity: 1}, 70);
}

function playSound(id){
    var sound = new Audio(id + ".mp3");
    sound.volume = 0.5;
    sound.play();
}

function animatePress(id){
    $("#"+id).addClass("pressed");
    setTimeout(function(){
        $("#"+id).removeClass("pressed")
    }, 100);
}

function restartGame(){
    playSound("wrong");
    $("h1").html("Game Over, Press Any Key or This Line to Restart");
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    levelWon = true;
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
}

var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;
var levelWon = true;


$(document).on("keypress", function(){
    if (!gameStarted){
        nextSequence();
    }
    gameStarted = true;
});

$("h1").on("click", function(){
    if (!gameStarted){
        nextSequence();
    }
    gameStarted = true;
});
    

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    
    if(gamePattern.length === 0){
        restartGame();
    }
    else {
        for (var i=0; i<userClickedPattern.length; i++){
            if (userClickedPattern[i] != gamePattern[i]){
                levelWon = false;
                break;
            }
        }
        if (!levelWon){
            restartGame();
        }
        else if (userClickedPattern.length === level && levelWon){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 200); 
        }
    }
})
