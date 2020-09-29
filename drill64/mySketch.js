'use strict'

let crawlers = []
let a
import Attractor001 from './Attractor001.js'
import Crawlers from './Crawlers.js'
const preload = () => {

}
function setup() {
  createCanvas(640, 360)
  for (let i = 0; i < 6; i++) {
    crawlers.push(new Crawlers())
  }

  a = new Attractor001(createVector(width / 2, height / 2), 20, 0.4)

  const searchValue = 11
  const values = [0, 2, 5, 6, 10, 13, 19,20, 59,70]
  let middle = 0
  let left = 0
  let right = values.length - 1
  let target = -1

  while(left <= right) {
    middle = Math.floor((right + left) / 2)
    if (values[middle] === searchValue) {
      console.log(middle)
      target = middle
      break
    }

    if (values[middle] < searchValue) {
      left = middle + 1
    }

    if (values[middle] > searchValue) {
      right = middle -1
    }    
  }
  
  console.log('target', target)
}

function dummy (){

  function abc() {
    console.log('abc', this)
  }

  const abc2 = () => {
    console.log('abc2', this)

  }
  abc()
  abc2()

  var o = {
    a: 2,
    m: (b) =>{
      console.log('m',this)
      // console.log('o obje',this.a)
      // return this.a + 1;

  //     setTimeout(() => {
  //       console.log('m趣味は' + this.a);
  // // ここにbind(this)を書いておく必要はない
  //     },1000);

  //     setTimeout(function(){
  //       console.log('m趣味は' + this.a);
  // // ここにbind(this)を書いておく必要はない
  //     },1000);
    },
    s() {
      setTimeout(() => {
        console.log('趣味は' + this.a);
  // ここにbind(this)を書いておく必要はない
      },1000);

      setTimeout(function(){
        console.log('趣味は' + this.a);
  // ここにbind(this)を書いておく必要はない
      },1000);
      console.log('s', this)
    },
    s2: function s2() {
      console.log('s2', this)
    }
  };


  o.m(); // 3
  o.s(); // 3
  o.s2(); // 3

  console.log('dummy', this)


  return this
}

const dummy2 = () => {
  console.log('dummy2', this)
  return this
}

function Person(first, last, age, gender, interests) {
  
  // property and method definitions
  this.first = first;
  this.last = last;

}

function draw() {
  background(255)
  a.setRollover(mouseX, mouseY)
  a.go()

  for(let i = 0; i < crawlers.length; i++){
    const f = a.attract(crawlers[i])
    crawlers[i].applyForce(f)
    crawlers[i].update()
    crawlers[i].display()
  }
}

let fn = function(x) {
  //Function code goes here
  console.log('inside function')
}

fn.name2 = "John";

fn.profile = function(y) {
 //Profile code goes here
 console.log('profile')
}

console.log(fn.profile())

let aaa = 'aaab'
let b = aaa.charAt(0).toUpperCase() + aaa.slice(1)
console.log(b)
// dummy.bind(this)()

window.preload = preload;
window.setup = setup;
window.draw = draw;
