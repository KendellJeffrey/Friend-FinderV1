var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var personalDifference = 0;

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    console.log("User Name: " + userName);
    console.log("Users Score " + userScores);

    var mathSum = b.reduce((a, b) => a + b, 0);


    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      personalDifference = 0;
      console.log("Total Diff " + personalDifference);
      console.log("Best match friend diff " + bestMatch.friendDifference);

      var bestFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      
      personalDifference = (mathSum - bestFriendScore);
      console.log("-------------------------> " + personalDifference);

      if (personalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = personalDifference;
      }
      console.log(personalDifference + " Total Difference");
    }
    console.log(bestMatch);

    friends.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(bestMatch);
  });
};
