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
    var element_score;



    window.onload = function(){
        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");

        //screens
        screen_game = document.getElementById("snake");
        screen_menu = document.getElementById("menu");
        screen_settings = document.getElementById("settings");
        screen_gameover = document.getElementById("gameover");

        //buttons
        button_menu_newgame = document.getElementById("newgame_menu");
        button_menu_setting = document.getElementById("setting_menu");
        button_gameover_newgame = document.getElementById("newgame_gameover");
        button_gameover_settings = document.getElementById("setting_gameover");
        button_setting_newgame = document.getElementById("newgame_setting");
        
        element_score = document.getElementById("score_value");
        setting_speed = document.getElementsByName("speed");
        setting_wall = document.getElementsByName("wall");

    }

})();