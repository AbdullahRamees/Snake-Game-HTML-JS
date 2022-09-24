(function(){
    //canvas
    var canvas;
    var context;

    //snake
    var snake;
    var snake_diraction;
    var snake_next_diraction;
    var snake_speed;

    //frog
    var frog = {x:0,y:0};

    //score
    var score;

    //wall
    var wall;

    //screens
    var screen_game;
    var screen_menu;
    var screen_settings;
    var screen_gameover;

    //buttons and ratio
    var button_menu_newgame;
    var button_menu_setting;
    var button_setting_newgame;
    var setting_speed;
    var setting_wall;
    var button_gameover_newgame;
    var button_gameover_settings;
    var Header_score;
    var endgame_score;

    //count down 
    var Counter_value;
    var cooldown_value;

    var counter = 0;
    var cooldownTime =0;


    //draw snake
    /* ###################################################*/
    var drawSnake = function(x, y){
        context.fillStyle = "#0aff01";
        context.fillRect(x * 10, y * 10, 10, 10);
    }

    //darw Frog
    /* ###################################################*/
    var DrawFrog = function(x, y){
        context.fillStyle = "#ca3030";
        context.fillRect(x * 10, y * 10, 10, 10);
    }

    // change snake diraction with key board key
    /* ###################################################*/
    var changeDir = function(key){
        
        if(key == 38 && snake_diraction != 2){
            snake_next_diraction = 0;
        }else{
        if (key == 39 && snake_diraction != 3){
            snake_next_diraction = 1;
        }else{
        if (key == 40 && snake_diraction != 0){
            snake_next_diraction = 2;
        }else{  
        if(key == 37 && snake_diraction != 1){
            snake_next_diraction = 3;
        } } } }
        
    }

    //rendomly add frog into canvas
    /* ###################################################*/
    var addFrog = function(){
        frog.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        frog.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        for(var i = 0; i < snake.length; i++){
            if(checkBlock(frog.x, frog.y, snake[i].x, snake[i].y)){
                addFrog();
            }
        }
    }

    var checkBlock = function(x, y, _x, _y){
        return (x == _x && y == _y) ? true : false;
    }

    //showing score
    /* ###################################################*/
    var altScore = function(score_val){
        Header_score.innerHTML = String(score_val);
        endgame_score.innerHTML = String(score_val);
    }


    //Main Game loop
    /* ###################################################*/
    var mainLoop = function(){
        
        var _x = snake[0].x;
        var _y = snake[0].y;
        snake_diraction = snake_next_diraction;

        // 0 - Up, 1 - Right, 2 - Down, 3 - Left
        switch(snake_diraction){
            case 0: _y--; break;
            case 1: _x++; break;
            case 2: _y++; break;
            case 3: _x--; break;
        }
        snake.pop();
        snake.unshift({x: _x, y: _y});

        // Wall death
            if(wall == 1){
                if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10){
                    showScreen(3);
                    counter = 0;
                    Counter_value.innerHTML = String(counter);
                    return;
                }
            }else{
                for(var i = 0, x = snake.length; i < x; i++){
                    if(snake[i].x < 0){
                        snake[i].x = snake[i].x + (canvas.width / 10);
                    }
                    if(snake[i].x == canvas.width / 10){
                        snake[i].x = snake[i].x - (canvas.width / 10);
                    }
                    if(snake[i].y < 0){
                        snake[i].y = snake[i].y + (canvas.height / 10);
                    }
                    if(snake[i].y == canvas.height / 10){
                        snake[i].y = snake[i].y - (canvas.height / 10);
                    }
                }
            }

        // Own body death
            for(var i = 1; i < snake.length; i++){
                if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                    showScreen(3);
                    counter = 0;
                    Counter_value.innerHTML = String(counter);
                    return;
                }
            }
      
        // Eat Frog
            if(checkBlock(snake[0].x, snake[0].y, frog.x, frog.y)){
                snake[snake.length] = {x: snake[0].x, y: snake[0].y};
                score += 1;
                altScore(score);
                addFrog();
                DrawFrog(frog.x, frog.y);
                counter = 0; 
                Counter_value.innerHTML = String(counter);
            }
        
        // rendom spawn frog after timer
        counter++;
        Counter_value.innerHTML = String(counter);
        if (counter >= cooldownTime) {
            addFrog();
            DrawFrog(frog.x, frog.y);
            counter=0;
            Counter_value.innerHTML = String(counter);
        }
        
            context.beginPath();
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);
        

            //drawing snake
            for(var i = 0; i < snake.length; i++){
                drawSnake(snake[i].x, snake[i].y);
            }
            //draw frog
            DrawFrog(frog.x, frog.y);
            setTimeout(mainLoop, snake_speed);
    }

    // New Game function
    /* ###################################################*/
    var newGame = function(){

        showScreen(0);
        counter =0;
        screen_game.focus();
        snake =[];
        for(var i=4;i>=0;i--){
            snake.push({x:i,y:15});
        }

        snake_next_diraction = 1;
        score =0;
        addFrog();
        altScore(score);
        canvas.onkeydown = function(evt) {
            evt = evt || window.event;
            changeDir(evt.keyCode);
        }
        mainLoop();
    }

   
    //wall on off show
    /* ###################################################*/
    var setWall = function(wall_value){
        wall = wall_value;
        if(wall == 0){screen_game.style.borderColor = "#000000";}
        if(wall == 1){screen_game.style.borderColor = "#474747";}
    }

 
    //set snake speed and cooldown time
    /* ###################################################*/
    var setSnakeSpeed = function(speed_value){
        snake_speed = speed_value;
         if(speed_value == 120){
            cooldownTime = 35;
         }else{
            if(speed_value == 75){
                cooldownTime = 50;
             }else{
                if(speed_value == 35){
                    cooldownTime = 75;
                 }
             }
         }
         cooldown_value.innerHTML = String(cooldownTime);
    }

    //screen changer
    /* ###################################################*/
    var showScreen = function(screen_options){
        switch(screen_options){
            case 0 : screen_game.style.display = "block";
                     screen_menu.style.display = "none";
                     screen_settings.style.display = "none";
                     screen_gameover.style.display = "none";
                     break;

            case 1 : screen_game.style.display = "none";
                     screen_menu.style.display = "block";
                     screen_settings.style.display = "none";
                     screen_gameover.style.display = "none";
                     break;
                     
            case 2 : screen_game.style.display = "none";
                     screen_menu.style.display = "none";
                     screen_settings.style.display = "block";
                     screen_gameover.style.display = "none";
                     break;
            
            case 3 : screen_game.style.display = "none";
                     screen_menu.style.display = "none";
                     screen_settings.style.display = "none";
                     screen_gameover.style.display = "block";
                     break;
        }
    }

    //onload function
    /* ###################################################*/
    window.onload = function(){
        canvas = document.getElementById("snake");
        context = canvas.getContext("2d");

        //screens
        screen_game = document.getElementById("snake");
        screen_menu = document.getElementById("menu");
        screen_settings = document.getElementById("setting");
        screen_gameover = document.getElementById("gameover");
        //buttons
        button_menu_newgame = document.getElementById("newgame_menu");
        button_menu_setting = document.getElementById("setting_menu");
        button_gameover_newgame = document.getElementById("newgame_gameover");
        button_gameover_settings = document.getElementById("setting_gameover");
        button_setting_newgame = document.getElementById("newgame_setting");
        

        Header_score = document.getElementById("score_value");
        endgame_score = document.getElementById("score_value_2")
        setting_speed = document.getElementsByName("speed");
        setting_wall = document.getElementsByName("wall");

        cooldown_value = document.getElementById("cooldowntimer");
        Counter_value = document.getElementById("Counter");

        button_menu_newgame.onclick = function(){newGame();};
        button_gameover_newgame.onclick = function(){newGame();}; 
        button_setting_newgame.onclick = function(){newGame();}; 
        button_menu_setting.onclick = function(){showScreen(2);};
        button_gameover_settings.onclick = function(){showScreen(2)};


        setSnakeSpeed(120);
        setWall(1);
        showScreen(1);

        for(var i = 0; i < setting_speed.length; i++){
            setting_speed[i].addEventListener("click", function(){
                for(var i = 0; i < setting_speed.length; i++){
                    if(setting_speed[i].checked){
                        setSnakeSpeed(setting_speed[i].value);
                    }
                }
            });
        }

        for(var i = 0; i < setting_wall.length; i++){
            setting_wall[i].addEventListener("click", function(){
                for(var i = 0; i < setting_wall.length; i++){
                    if(setting_wall[i].checked){
                        setWall(setting_wall[i].value);
                    }
                }
            });
        }

        document.onkeydown = function(evt){
            if(screen_gameover.style.display == "block"){
                evt = evt || window.event;
                if(evt.keyCode == 32){
                    newGame();
                }
            }
        }
    }
})();