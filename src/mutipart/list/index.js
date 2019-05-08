import './index.css'

const arr = [1, 2, 3]

const format = {
  log(arr) {
    console.log(arguments)
  }
}

format.log(...arr)
