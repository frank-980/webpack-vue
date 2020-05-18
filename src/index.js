require('@babel/polyfill')
require('./index.css')
const arr = [
  new Promise(()=>{}),
  new Promise(()=>{}),
]
arr.map(item=>{
  console.log(item)
})
