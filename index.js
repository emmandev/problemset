// solutions here

const { asyncOp, RandStream } = require("./lib/lib")
const events = require("events")

//region 1. Asynchronous Operations
/**
 * Accepts an array arr as input.
 * Each element in the array can be either of type String or [String].
 * @param {array} arr
 */
const doAsync = async (arr = []) => {
  for (element of arr) {
    if (Array.isArray(element)) {
      await Promise.all(element.map((item) => asyncOp(item)))
    } else {
      await asyncOp(element)
    }
  }
}

const input = ["A", ["B", "C", "D", "E"], "F", "G", ["H", "I"]]
doAsync(input)
//endregion 1. Asynchronous Operations

//region 2. Streams
class RandStringSource extends events.EventEmitter {}

let source = new RandStringSource(new RandStream())

source.on("data", (data) => {
  console.log(data)
})
//endregion 2. Streams
