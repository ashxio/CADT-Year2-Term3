/**
 * Represents a duration of time in seconds.
 * The Duration class is immutable.
 */
class Duration {
  /**
   * Total duration in seconds.
   * @type {number}
   * @private
   */
  _totalSeconds;

  /**
   * Creates a new Duration object.
   * @param {number} [seconds=0] - The number of seconds.
   */
  constructor(seconds = 0) {
    this._totalSeconds = seconds;
    Object.freeze(this);
  }

  /**
   * Creates a new Duration from a number of minutes and seconds.
   * @param {number} [minutes=0] - The number of minutes.
   * @param {number} [seconds=0] - The number of seconds.
   * @returns {Duration} A new Duration instance.
   */
  static fromMinutesAndSeconds(minutes = 0, seconds = 0) {
    const totalSeconds = minutes * 60 + seconds;
    return new Duration(totalSeconds);
  }

  /**
   * Gets the total number of seconds in this duration.
   * @returns {number} The total seconds.
   */
  getTotalSeconds() {
    return this._totalSeconds;
  }

  /**
   * Gets the minutes component of this duration.
   * @returns {number} The number of whole minutes.
   */
  getMinutes() {
    return Math.floor(this._totalSeconds / 60);
  }

  /**
   * Gets the seconds component of this duration (0-59).
   * @returns {number} The remaining seconds after minutes.
   */
  getSeconds() {
    return this._totalSeconds % 60;
  }

  /**
   * Returns a string representation of the duration.
   * @returns {string} Duration formatted as "Xm Ys"
   */
  toString() {
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();
    return `${minutes}m ${seconds}s`;
  }

  /**
   * Returns a new Duration by adding another duration.
   * @param {Duration} other - Another duration to add.
   * @returns {Duration} A new Duration representing the sum.
   */
  plus(other) {
    return new Duration(this._totalSeconds + other.getTotalSeconds());
  }

  /**
   * Returns a new Duration by subtracting another duration.
   * @param {Duration} other - Another duration to subtract.
   * @returns {Duration} A new Duration representing the difference.
   */
  minus(other) {
    return new Duration(this._totalSeconds - other.getTotalSeconds());
  }

  /**
   * Converts the duration to a plain JSON-safe object.
   * @returns {{totalSeconds: number}} JSON representation of the duration.
   */
  toJSON() {
    return {
      totalSeconds: this._totalSeconds,
    };
  }
}

export { Duration };
export default Duration;
