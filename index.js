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
class RandStringSource extends events.EventEmitter {
  regex = /[\w]+\./g
  text = ""

  constructor(stream) {
    super()
    stream.on("data", (data) => this.check(data))
  }

  check(text) {
    this.text += text
    this.text = this.text.replace(this.regex, (match) => {
      // remove period
      this.emit("data", match.slice(0, -1))

      // replace match with empty string
      return ""
    })
  }
}

let source = new RandStringSource(new RandStream())

source.on("data", (data) => {
  console.log(data)
})
//endregion 2. Streams
