$(document).ready(function() {

    var game = {
        players:[
            obi = {
                firstName:"Obi-Wan",
                lastName:"Kenobi",
                healhPoint:120,
                attackPower:8,
                counterAttack:10,
                src:"assets/images/obi.png",
                defeated:false
            },
            luke = {
                firstName:"Luke",
                lastName:"Skywalker",
                healhPoint:100,
                attackPower:10,
                counterAttack:5,
                src:"assets/images/skywalker.png",
                defeated:false
            },
            maul = {
                firstName:"Darth",
                lastName:"Maul",
                healhPoint:180,
                attackPower:6,
                counterAttack:25,
                src:"assets/images/maul.png",
                defeated:false
            },
            sidious = {
                firstName:"Darth",
                lastName:"Sidious",
                healhPoint:150,
                attackPower:7,
                counterAttack:20,
                src:"assets/images/sidious.png",
                defeated:false
            }

        ],
        playersKeys:["Kenobi", "Skywalker", "Maul", "Sidious"],
        enemies:[],
        wins:0,
        wongame:false,
        vs:"assets/images/vs.png",
        character:{},
        characterAttackPowerInc:0,
        defender:{},
        characterChosen:false,
        defenderChosen:false,
        playerMgt: function(id){                
            var playerId=this.playersKeys.indexOf(id)
            if (this.characterChosen){
                if(this.defenderChosen){
                    return
                }
                else if (!this.defenderChosen){

                   //"need to select defender but first i will make sure it is not the same as the 
                   //current character" 
                    if (this.character.lastName!=this.players[playerId].lastName){

                        this.defender=this.players[playerId];
                        //will hide it in enemy list
                        $("."+this.players[playerId].lastName+"-enemy").fadeOut("slow");
                        //then will recreate the html in the game session so character and defender are
                        //next to each other:
                        var card="<div class='card black'><div class='card-body'><h4 class='card-title'>Defender</h4><p class='card-text defender-p'>Health: "+this.defender.healhPoint+"</p></div></div>"

                        $(".battle-space").append("<div class='col-sm-2 col-md-2 battle-vs '></div>")
                        $(".battle-vs").html("<img src="+this.vs+">")
                        $(".battle-space").append("<div class='col-sm-6 col-md-3 defender zindex'></div>")
                        $(".defender").html("<div class='col-sm-6 col-md-3'> <img src="+this.defender.src+"> </div>")
                        $(".battle-space").append(
                            "<div class='col-sm-2 col-md-2 defender-stats'>"+card+"</div>")

                        
                        //  $("."+this.players[playerId].lastName+"-defender").fadeIn("slow");
                        this.defenderChosen=true
                    }

                }
            }
            else{
                /*need to select character
                im going to create an array with the remainder of players as enemies*/

                for (var i=0; i<this.players.length; i++){
                    
                    if(i==playerId){
                        this.character=this.players[playerId];
                        this.characterAttackPowerInc=this.players[playerId].attackPower

                    }
                    else{
                        $("."+this.players[i].lastName+"-player").fadeOut("slow");
                        $("."+this.players[i].lastName+"-player").remove()
                        $("."+this.players[i].lastName+"-enemy").fadeIn("slow");
                        this.enemies.push(this.players[i])
                    }
                }
                $(".player-p").text("Health: "+this.character.healhPoint)

                $(".player-stats").attr("class","col-sm-2 col-md-2 player-stats");
                $("."+this.players[playerId].lastName+"-vs").fadeIn("slow");


                this.characterChosen=true;
            }
        },
        attack:function(){
            if (this.defenderChosen && !this.character.defeated){
                this.character.healhPoint=this.character.healhPoint-this.defender.counterAttack;
                this.character.attackPower=this.character.attackPower+this.characterAttackPowerInc
                this.defender.healhPoint=this.defender.healhPoint-this.character.attackPower;
                $(".player-p").text("Health: "+this.character.healhPoint)
                $(".defender-p").text("Health: "+this.defender.healhPoint)


                if (this.character.healhPoint<=0){
                    this.character.defeated=true;
                    console.log("You Lost the game !")
                }
                else if (this.defender.healhPoint<=0){
                    this.defender.defeated=true;
                    $(".battle-vs").remove()
                    $(".padding").remove()
                    $(".defender").remove()
                    $(".defender-stats").remove()



                  //  $("."+this.defender.lastName+"-defender").fadeOut("slow");
                    this.defenderChosen=false;
                    this.wins++
                    if(this.wins==this.enemies.length){
                        this.wongame=true;
                    }
                }
            }
            else if (this.character.defeated){
                alert("You Lost the game. Please restart to play again")
            }
            else if (this.wongame){
                alert("You won already. Relax and Enjoy!")
            }
            else {
                alert("Please select a defender")
            }
        }

    }  
    


    $(".clicked").click(function(){
        game.playerMgt(this.id)   

    });

    $(".attack").click(function(){
  
            game.attack()  
        

    });

});