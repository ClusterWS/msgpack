const msgPack = require('./dist/index');

let buffer = msgPack.encode({
  hello: 1234213
});

console.log(buffer.byteLength);
console.log(msgPack.decode(buffer));


let a = {
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: 'dsa',
  hello: 1234213,
  test: {
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: {
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
    }
  }, test: {
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: {
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: {
        test: {
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: {
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
          }
        },
      },
    }
  }, test: {
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: 'dsa',
    hello: 1234213,
    test: {
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: 'dsa',
      hello: 1234213,
      test: {
        test: {
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: 'dsa',
          hello: 1234213,
          test: {
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
            hello: 1234213,
            test: 'dsa',
          }
        },
      },
    }
  },
};


var msgpack = require("msgpack-lite");

console.time('MSGPack 1')
for (let i = 0; i < 1000000; i++) {
  a = msgpack.encode(a);
  a = msgpack.decode(a);
}
console.timeEnd('MSGPack 1')

console.time('MSGPack 2')
for (let i = 0; i < 1000000; i++) {
  a = msgPack.encode(a);
  a = msgPack.decode(a);
}
console.timeEnd('MSGPack 2')

console.time('JSON fn')
for (let i = 0; i < 1000000; i++) {
  a = Buffer.from(JSON.stringify(a));
  a = JSON.parse(a);
}
console.timeEnd('JSON fn')








// var msgpack = require('tiny-msgpack');
// var uint8array = msgpack.encode("hello world");
// console.log(uint8array);
// console.log("got", new TextDecoder("utf-8").decode(buffer));
