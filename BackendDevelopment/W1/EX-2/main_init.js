import Duration from "./Model/Duration.js";
import RaceResult from "./Model/RaceResult.js";
import RaceScoresService from "./Service/RaceScoresService.js";

const raceManager = new RaceScoresService();

raceManager.addRaceResult(
  new RaceResult(
    "participant1",
    "swim",
    Duration.fromMinutesAndSeconds(2, 30),
  ),
);
raceManager.addRaceResult(
  new RaceResult(
    "participant1",
    "run",
    Duration.fromMinutesAndSeconds(1, 45),
  ),
);
raceManager.addRaceResult(
  new RaceResult(
    "participant2",
    "swim",
    Duration.fromMinutesAndSeconds(3, 15),
  ),
);

raceManager.saveToFile("./Data/raceScores.json");
console.log("Race results saved to ./Data/raceScores.json");
