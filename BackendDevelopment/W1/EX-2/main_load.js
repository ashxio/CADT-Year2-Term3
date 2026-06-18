import RaceScoresService from "./Service/RaceScoresService.js";

const raceManager = new RaceScoresService();
const isLoaded = raceManager.loadFromFile("./Data/raceScores.json");

if (isLoaded) {
  const swimTime = raceManager.getTimeForParticipant("participant1", "swim");
  const totalTime = raceManager.getTotalTimeForParticipant("participant1");

  console.log("participant1 swim:", swimTime ? swimTime.toString() : "Not found");
  console.log("participant1 total:", totalTime.toString());
}
