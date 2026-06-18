import fs from "fs";
import Duration from "../Model/Duration.js";
import RaceResult from "../Model/RaceResult.js";

/**
 * Handles storage and queries for race results.
 */
class RaceScoresService {
  /**
   * List of stored race results.
   * @type {RaceResult[]}
   * @private
   */
  _raceResults;

  /**
   * Creates an empty race results service.
   */
  constructor() {
    this._raceResults = [];
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The race result to add.
   */
  addRaceResult(result) {
    this._raceResults.push(result);
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - The path to the file data should be saved.
   */
  saveToFile(filePath) {
    const data = JSON.stringify(this._raceResults, null, 2);
    fs.writeFileSync(filePath, data, "utf8");
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - The path to the file to load data from.
   * @returns {boolean} True if loading was successful, false otherwise.
   */
  loadFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const parsedResults = JSON.parse(data);
      this._raceResults = parsedResults.map((result) =>
        RaceResult.fromObject(result),
      );
      return true;
    } catch (error) {
      console.error("Error loading race results:", error.message);
      return false;
    }
  }

  /**
   * Retrieves the race time for a given participant and sport.
   * @param {string} participantId - Participant ID.
   * @param {string} sport - Sport name.
   * @returns {Duration|null} Duration if found, else null.
   */
  getTimeForParticipant(participantId, sport) {
    const result = this._raceResults.find(
      (raceResult) =>
        raceResult.getParticipantId() === participantId &&
        raceResult.getSport() === sport,
    );

    return result ? result.getDuration() : null;
  }

  /**
   * Computes total time for a given participant by summing their race times.
   * @param {string} participantId - The ID of the participant.
   * @returns {Duration} The total Duration object.
   */
  getTotalTimeForParticipant(participantId) {
    return this._raceResults
      .filter((raceResult) => raceResult.getParticipantId() === participantId)
      .reduce(
        (totalDuration, raceResult) =>
          totalDuration.plus(raceResult.getDuration()),
        new Duration(0),
      );
  }
}

export { RaceScoresService, RaceScoresService as RaceResults };
export default RaceScoresService;
