var userModel = require('../model/userModel');
var scoreModel = require('../model/totalScore');
var helper=require("../helper");
var UsernameGenerator = require('../node_modules/username-generator');
module.exports = {
    scoreUpdate: (id,point) => {
        var q = userModel.findOneAndUpdate({
            _id: id
        }, {
            $inc: {
                score: point,
                totalMoney:point
            }
        }, {
            new: true
        }, function(err, doc) {
            if (err) {
                console.log("leaderboard update error->", err);
            }
            
        });

        var q = scoreModel.findOneAndUpdate({
            week: helper.weeks()
        }, {
            $inc: {
                score: point
            }
        }, {
            new: true
        }, function(err, doc) {
            if (err) {
                console.log("leaderboard update error->", err);
            }
            
        });
    },

    setUser: () => {
        var age = Math.floor(Math.random() * 65) + 18;
        var score = Math.floor(Math.random() * 65000);
       var count=0;
        userModel.count({}, function( err, count){

            userModel.create({
                userName: UsernameGenerator.generateUsername(),
                age: age,
                sequence: count,
                score: 0,
                totalMoney: 0
            }, (err, user) => {
                if (err) console.log("hata 2")
            });
        })
        

    },
    leaderboardList: (id,callback) => {
        var gamerList = [];
        userModel.esSearch({
            from: 0,
            size: 10000,
            query: {
                range: {
                    score: {
                        gte: 0

                    }
                }
            },
            sort: {
                score : "desc"
             }
        }, (err, results) => {
       
            person = results.hits.hits;
            var i = 0;
            var index;
            control = false;
            for (var pro in person) {
                var q = userModel.findOneAndUpdate({
                    _id: person[pro]._id
                }, {
                    $set: {
                        sequence: i
                    }
                }, {
                    new: true
                }, function(err, doc) {
                    if (err) {
                        console.log("leaderboard update error->", err);
                    }
                    
                });
              
                var diff=person[pro]._source["sequence"]-(parseInt(pro));
               if(diff!=0 && parseInt( person[pro]._source["score"])!=0 ) person[pro]._source["dif"]=diff;
               else person[pro]._source["dif"]=person[pro]._source["sequence"];

                if (i < 100) {
                    person[pro]._source["sequence"] = parseInt(pro) ;
                    gamerList[i] = person[pro]._source;

                if (id == person[pro]._id) {
                        index = pro;
                        control = true;
                    }
                    i++;
                } else if (control) {
                    console.log("bulundu", index);
                    break;
                } else {
                    if (id == person[pro]._id) {
                        index = i - 3;
                        for (var j = 1; j < 7; j++) {
                            person[(index + j).toString()]._source["sequence"] = index + j;
                            gamerList[(99 + j)] = person[(index + j).toString()]._source;
                        }
                        index = i;
                        control = true;
                    }
                    i++;
                }
        
            }
           callback(JSON.stringify(gamerList))


        });

    }

};