// solutions here

const { asyncOp } = require("./lib/lib")

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
