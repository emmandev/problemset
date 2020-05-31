// solutions here

const { asyncOp, RandStream } = require("./lib/lib")
const events = require("events")
const { prompter } = require("./lib/prompter")

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
const problem1 = () => doAsync(input)
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

const problem2 = () => {
  const source = new RandStringSource(new RandStream())

  source.on("data", (data) => {
    console.log(data)
  })
}
//endregion 2. Streams

//region 3. Resource Pooling
class Resource extends events.EventEmitter {
  isWorking = false

  release() {
    this.isWorking = false
    this.emit("released")
  }

  use() {
    this.isWorking = true
  }
}
class ResourceManager {
  resources = []
  queue = []

  constructor(count) {
    this.addResources(count)
  }

  addResources(number) {
    for (let i = 0; i < number; i++) {
      const resource = new Resource()

      resource.on("released", () => {
        if (this.queue.length) {
          this.useResource(this.queue.shift(), resource)
        }
      })

      this.resources.push(resource)
    }
  }

  getVacantResource() {
    return this.resources.find((resource) => !resource.isWorking)
  }

  useResource(callback, resource) {
    resource.use()
    callback(resource)
  }

  async borrow(callback) {
    const resource = this.getVacantResource()

    if (!resource) {
      this.queue.push(callback)
      console.log("NO RESOURCES AVAILABLE")
    } else {
      this.useResource(callback, resource)
    }
  }

  async wait() {
    for await (const q of this.queue) {
      q.on("released", () => {
        console.log("KKKK")
      })
    }
  }
}

const problem3 = () => {
  let pool = new ResourceManager(2)
  console.log("START")

  let timestamp = Date.now()

  pool.borrow((res) => {
    console.log("RES: 1")

    setTimeout(() => {
      res.release()
    }, 500)
  })

  pool.borrow((res) => {
    console.log("RES: 2")
  })

  pool.borrow((res) => {
    console.log("RES: 3")
    console.log("DURATION: " + (Date.now() - timestamp))
  })
}
//endregion 3. Resource Pooling

prompter([
  { name: 1, value: problem1 },
  { name: 2, value: problem2 },
  { name: 3, value: problem3 },
])
