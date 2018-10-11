const msgPack = require('./dist/index');

let buffer = msgPack.encode({
  hello: 1234213,
  test: ['hello', 1234, { a: "str" }],
  type: true
});

console.log(buffer.byteLength);
console.log(msgPack.decode(buffer));


let a = {
  hello: 1234213,
  test: ['hello', 1234, { a: "str" }],
  type: true,
  hello: 1234213,
  test: ['hello', 1234, { a: "str" }],
  hello: 1234213,
  test: ['hello', 1234, { a: "str" }],
  hello: 1234213,
  test: ['hello', 1234, { a: "str" }],
  hello: 1234213,
  test: ['hello', 1234, {
    a: {
      hello: 1234213,
      test: ['hello', 1234, { a: "str" }],
      hello: 1234213,
      test: ['hello', 1234, { a: "str" }],
      hello: 1234213,
      test: ['hello', 1234, { a: "str" }],
      hello: 1234213,
      test: ['hello', 1234, { a: "str" }],
    }
  }],
};


var msgpack = require("msgpack-lite");
var anotherMsgpack = require('tiny-msgpack');


// console.time('MSGPack 0')
// // let b = msgpack.encode(a);

// for (let i = 0; i < 10000000; i++) {
//   let b = anotherMsgpack.encode(a);
//   let m = anotherMsgpack.decode(b);
// }
// console.timeEnd('MSGPack 0')

console.time('MSGPack 1')
// let b = msgpack.encode(a);

for (let i = 0; i < 5000000; i++) {
  let b = msgpack.encode(a);
  let m = msgpack.decode(b);
}
console.timeEnd('MSGPack 1')

console.time('MSGPack 2')
// let x = msgPack.encode(a);
for (let i = 0; i < 5000000; i++) {
  let x = msgPack.encode(a);
  let m = msgPack.decode(x);
}
console.timeEnd('MSGPack 2')

console.time('JSON fn')
// let k = Buffer.from(JSON.stringify(a));
for (let i = 0; i < 5000000; i++) {
  let k = Buffer.from(JSON.stringify(a));
  let m = JSON.parse(k);
}
console.timeEnd('JSON fn');
