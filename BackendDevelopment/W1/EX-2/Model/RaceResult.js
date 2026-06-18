import Duration from "./Duration.js";

/**
 * Represents the result of one participant in one sport.
 */
class RaceResult {
  /**
   * Participant identifier.
   * @type {string}
   * @private
   */
  _participantId;

  /**
   * Sport name.
   * @type {string}
   * @private
   */
  _sport;

  /**
   * Recorded duration.
   * @type {Duration}
   * @private
   */
  _duration;

  /**
   * Creates a new race result.
   * @param {string} participantId - The participant identifier.
   * @param {string} sport - The sport name.
   * @param {Duration} duration - The time recorded for this result.
   */
  constructor(participantId, sport, duration) {
    this._participantId = participantId;
    this._sport = sport;
    this._duration = duration;
  }

  /**
   * Gets the participant identifier.
   * @returns {string} The participant identifier.
   */
  getParticipantId() {
    return this._participantId;
  }

  /**
   * Gets the sport name.
   * @returns {string} The sport name.
   */
  getSport() {
    return this._sport;
  }

  /**
   * Gets the recorded duration.
   * @returns {Duration} The recorded duration.
   */
  getDuration() {
    return this._duration;
  }

  /**
   * Converts a plain object loaded from JSON into a RaceResult instance.
   * @param {object} rawResult - The plain object from JSON.
   * @returns {RaceResult} The restored race result.
   */
  static fromObject(rawResult) {
    const participantId = rawResult.participantId ?? rawResult._participantId;
    const sport = rawResult.sport ?? rawResult._sport;
    const rawDuration = rawResult.duration ?? rawResult._duration ?? {};
    const totalSeconds =
      rawDuration.totalSeconds ?? rawDuration._totalSeconds ?? 0;

    return new RaceResult(participantId, sport, new Duration(totalSeconds));
  }

  /**
   * Converts the race result to a plain JSON-safe object.
   * @returns {{participantId: string, sport: string, duration: {totalSeconds: number}}}
   * JSON representation of the race result.
   */
  toJSON() {
    return {
      participantId: this._participantId,
      sport: this._sport,
      duration: this._duration.toJSON(),
    };
  }
}

export { RaceResult };
export default RaceResult;
