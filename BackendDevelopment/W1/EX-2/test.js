import Duration from "./Duration.js";

// Test 1: Constructor with seconds
const d1 = new Duration(125);
console.log("Duration(125):", d1.toString());
console.log("  Total seconds:", d1.getTotalSeconds());
console.log("  Minutes:", d1.getMinutes());
console.log("  Seconds:", d1.getSeconds());

// Test 2: Constructor with default (0)
const d2 = new Duration();
console.log("\nDuration():", d2.toString());

// Test 3: Static fromMinutesAndSeconds method
const d3 = Duration.fromMinutesAndSeconds(2, 30);
console.log("\nfromMinutesAndSeconds(2, 30):", d3.toString());
console.log("  Total seconds:", d3.getTotalSeconds());

// Test 4: Static with default parameters
const d4 = Duration.fromMinutesAndSeconds(1);
console.log("\nfromMinutesAndSeconds(1):", d4.toString());

// Test 5: Static with all defaults
const d5 = Duration.fromMinutesAndSeconds();
console.log("\nfromMinutesAndSeconds():", d5.toString());

// Test 6: plus method
const d6 = d3.plus(Duration.fromMinutesAndSeconds(1, 15));
console.log("\nd3 + 1m 15s:", d6.toString());
console.log("  Total seconds:", d6.getTotalSeconds());

// Test 7: minus method
const d7 = d6.minus(Duration.fromMinutesAndSeconds(0, 45));
console.log("\nd6 - 45s:", d7.toString());
console.log("  Total seconds:", d7.getTotalSeconds());

// Test 8: immutability check
console.log("\nOriginal d3 is still:", d3.toString());
