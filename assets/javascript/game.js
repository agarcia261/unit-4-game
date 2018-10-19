$(document).ready(function() {

    var game = {
        players:[
            obi = {
                firstName:"Obi-Wan",
                lastName:"Kenobi",
                healhPoint:120,
                attackPower:8,
                counterAttack:10
            },
            luke = {
                firstName:"Luke",
                lastName:"Skywalker",
                healhPoint:100,
                attackPower:6,
                counterAttack:5
            },
            maul = {
                firstName:"Darth",
                lastName:"Maul",
                healhPoint:180,
                attackPower:6,
                counterAttack:25
            },
            sidious = {
                firstName:"Darth",
                lastName:"Sidious",
                healhPoint:150,
                attackPower:6,
                counterAttack:20
            }

        ],
        playersKeys:["Kenobi", "Skywalker", "Maul", "Sidious"],
        enemies:[],
        character:{},
        characterAttackPowerInc:0,
        defender:{},
        characterChosen:false,
        defenderChosen:false,
        playerMgt: function(id){
            console.log("getting here")
                
            var playerId=this.playersKeys.indexOf(id)



            if (this.characterChosen){
                if(this.defenderChosen){
                    return
                }
                else{
                   //"need to select defender" 
                   console.log(playerId)                    

                        this.defender=this.players[playerId];
                        $("."+this.players[playerId].lastName+"-enemy").fadeOut("slow");
                        $("."+this.players[playerId].lastName+"-defender").fadeIn("slow");

                }
            }
            else{
                /*need to select character
                im going to create an array with the remainder of players as enemies*/

                for (var i=0; i<this.players.length; i++){
                    
                    if(i==playerId){
                        this.character=this.players[playerId];

                    }
                    else{
                        $("."+this.players[i].lastName+"-player").fadeOut("slow");
                        $("."+this.players[i].lastName+"-enemy").fadeIn("slow");
                        this.enemies.push(this.players[i])
                    }
                }
                this.characterChosen=true;
                


            }
        },

    }  
    


    $(".clicked").click(function(){
        console.log(this.id)
        game.playerMgt(this.id)   

    });

});