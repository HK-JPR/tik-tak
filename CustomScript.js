(function ($) {
    $(function () {
        var Player1Name = "";
        var Player2Name = "";
        var count = 0;

        $("#SetPlayerName").on("click", function () {
            Player1Name = $("#player1").val().trim();
            Player2Name = $("#player2").val().trim();
            SetPlayer();
        });


        $("#RandomName").on("click", function () {
            Player1Name = "Virat";
            Player2Name = "Rohit";
            SetPlayer();
        })



        //For Set Player Name And hide button
        function SetPlayer() {
            Player1Name=!Player1Name?"Virat":Player1Name;
            Player2Name=!Player2Name?"Rohit":Player2Name;
            $("#player1").parent().text("Player 1 :" + Player1Name).addClass("text-danger");
            $("#player2").parent().text("Player 2 :" + Player2Name).addClass("text-info");;
            $("#SetPlayerName").hide();
            $("#RandomName").hide();
            $("#GreetingText").text(Player1Name + "'s Turn (♪)");
        }


        //Click on any cloumn on grid
        $("td").on("click", function () {
            if (Player1Name == "" && Player2Name == "") {
                alert("Please Enter Players Name for Start Game");
            }
            else {
                var TdClass = $(this).prop("class");
                if (TdClass == "") {
                    count += 1;
                    if (count % 2 == 0) {
                        $("#GreetingText").html(Player1Name + "'s Turn (♪)");
                        $(this).addClass("bg-info");
                        $(this).text("♫")
                    }
                    else {
                        $("#GreetingText").html(Player2Name + "'s Turn (♫)");
                        $(this).addClass("bg-danger");
                        $(this).text("♪")
                    }
                    var pattern = $(this).prop("class");
                    var won1 = checkIfPlayerWon(pattern)
                    if (count == 9) {
                        if (won1 != "bg-danger") {
                            won1 = "Tie";
                        }
                    }
                    AlertWon(won1)
                }
            }
        });


        //Check Player Winning
        function checkIfPlayerWon(pattern) {
            var won = 0;
            var table = $('table');
            //Row Wise checking
            if (table.find('#R1C1').hasClass(pattern) && table.find('#R1C2').hasClass(pattern) && table.find('#R1C3').hasClass(pattern)) {
                won = pattern;
            } else if (table.find('#R2C1').hasClass(pattern) && table.find('#R2C2').hasClass(pattern) && table.find('#R2C3').hasClass(pattern)) {
                won = pattern;
            } else if (table.find('#R3C1').hasClass(pattern) && table.find('#R3C2').hasClass(pattern) && table.find('#R3C3').hasClass(pattern)) {
                won = pattern;
            }

            //Cloumn wise checking
            else if (table.find('#R1C1').hasClass(pattern) && table.find('#R2C1').hasClass(pattern) && table.find('#R3C1').hasClass(pattern)) {
                won = pattern;
            } else if (table.find('#R1C2').hasClass(pattern) && table.find('#R2C2').hasClass(pattern) && table.find('#R3C2').hasClass(pattern)) {
                won = pattern;
            } else if (table.find('#R1C3').hasClass(pattern) && table.find('#R2C3').hasClass(pattern) && table.find('#R3C3').hasClass(pattern)) {
                won = pattern;
            }

            //Other
            else if (table.find('#R1C1').hasClass(pattern) && table.find('#R2C2').hasClass(pattern) && table.find('#R3C3').hasClass(pattern)) {
                won = pattern;
            } else if (table.find('#R1C3').hasClass(pattern) && table.find('#R2C2').hasClass(pattern) && table.find('#R3C1').hasClass(pattern)) {
                won = pattern;
            }
            return won;
        }

        //Timer for restart game
        function timer() {
            var time = 5
            var myTime = setInterval(function () {
                $("#Timer").html("Game will restart in <b class=text-info>" + time + "</b> Sec.");
                time--;
                if (time == 0) {
                    clearInterval(myTime);
                    location.reload(true);
                }
            }, 1000);
        }


        //Alert Match Result
        function AlertWon(winner) {
            if (winner == "bg-danger") {
                $("#GreetingText").text(Player1Name + " Won this match ♥");
                $("td").off("click");
                timer();
            }
            else if (winner == "bg-info") {
                $("#GreetingText").text(Player2Name + " Won this match ♥");
                $("td").off("click");
                timer();
            }
            else if (winner == "Tie") {
                $("#GreetingText").text("Match Tie ☺");
                timer();
            }
        }
    });

})(jQuery)
