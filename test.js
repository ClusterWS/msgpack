const msgPack = require('./dist/index');

let buffer = msgPack.encode({
  hello: 1234213,
  test: ['hello', 1234, { a: "str" }],
  type: true
});

console.log(buffer.byteLength);
console.log(msgPack.decode(buffer));


let a = [
  {
    "_id": "5bc05e2409864feff74fc6c6",
    "index": 0,
    "guid": "a64f823b-ba97-41e7-ac37-e37f61d23fa6",
    "isActive": false,
    "balance": "$1,961.44",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "brown",
    "name": "Bryan Hanson",
    "gender": "male",
    "company": "SCENTY",
    "email": "bryanhanson@scenty.com",
    "phone": "+1 (945) 583-2055",
    "address": "664 Pooles Lane, Libertytown, Oregon, 860",
    "about": "Et aute ullamco eiusmod officia incididunt ex cupidatat Lorem fugiat. Cupidatat sunt dolor cillum do adipisicing laboris. Culpa cupidatat nisi in non. Velit fugiat culpa aliquip culpa irure esse aliquip proident in do tempor ad do anim. Cupidatat proident occaecat deserunt nostrud id occaecat minim ad occaecat Lorem. Excepteur in exercitation mollit aliquip.\r\n",
    "registered": "2014-05-22T06:03:13 -12:00",
    "latitude": -2.056106,
    "longitude": -53.281587,
    "tags": [
      "non",
      "deserunt",
      "quis",
      "proident",
      "anim",
      "ipsum",
      "aliquip"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lowe Wilder"
      },
      {
        "id": 1,
        "name": "Lynch Espinoza"
      },
      {
        "id": 2,
        "name": "Lakeisha Kirk"
      }
    ],
    "greeting": "Hello, Bryan Hanson! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bc05e24018d233b8d0dbce9",
    "index": 1,
    "guid": "33fdf1f0-3481-4a61-89bd-7a137771874f",
    "isActive": false,
    "balance": "$3,726.59",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Dillard Beard",
    "gender": "male",
    "company": "HOMELUX",
    "email": "dillardbeard@homelux.com",
    "phone": "+1 (803) 596-2858",
    "address": "945 Hampton Avenue, Albany, North Carolina, 3277",
    "about": "Quis velit do ex deserunt. Anim elit aute fugiat culpa velit ex proident exercitation aliquip. Exercitation ullamco ea eiusmod sint voluptate eiusmod ullamco non. Reprehenderit ex enim sunt dolore in eiusmod anim amet. Reprehenderit dolor magna eiusmod duis deserunt voluptate labore ad quis sunt.\r\n",
    "registered": "2016-06-03T12:10:51 -12:00",
    "latitude": 80.730279,
    "longitude": -30.46019,
    "tags": [
      "labore",
      "ut",
      "culpa",
      "non",
      "magna",
      "labore",
      "aliqua"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bradley Spence"
      },
      {
        "id": 1,
        "name": "Margie Cooke"
      },
      {
        "id": 2,
        "name": "Maryann Irwin"
      }
    ],
    "greeting": "Hello, Dillard Beard! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bc05e2492f596657f15e398",
    "index": 2,
    "guid": "7daf45ec-6e4f-42ae-b8e5-326bb75cee29",
    "isActive": true,
    "balance": "$2,789.36",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "blue",
    "name": "Lily Dunlap",
    "gender": "female",
    "company": "ZAPPIX",
    "email": "lilydunlap@zappix.com",
    "phone": "+1 (871) 418-3708",
    "address": "946 Tiffany Place, Richford, Oklahoma, 496",
    "about": "Eiusmod nulla labore proident ipsum. Culpa ad est voluptate amet in. Enim occaecat esse sint ea consectetur aliquip sunt. Adipisicing deserunt culpa voluptate culpa cillum ullamco ex enim pariatur enim ea amet id ut. Ut adipisicing sint consectetur eiusmod mollit et amet ullamco proident velit. Consectetur eu nostrud sunt nulla voluptate ut. Aliquip dolore minim enim commodo adipisicing amet do aute non veniam ex aliqua.\r\n",
    "registered": "2015-01-28T07:49:30 -13:00",
    "latitude": -26.822407,
    "longitude": -167.960744,
    "tags": [
      "anim",
      "esse",
      "exercitation",
      "id",
      "ad",
      "aliqua",
      "ea"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hartman Mcclure"
      },
      {
        "id": 1,
        "name": "Christy Monroe"
      },
      {
        "id": 2,
        "name": "Vincent Odonnell"
      }
    ],
    "greeting": "Hello, Lily Dunlap! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bc05e24ed85f83ed853b5df",
    "index": 3,
    "guid": "2938f67f-e3cd-40c8-a3e7-8eebe6150dec",
    "isActive": true,
    "balance": "$1,362.21",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "brown",
    "name": "Annie Whitney",
    "gender": "female",
    "company": "PHARMEX",
    "email": "anniewhitney@pharmex.com",
    "phone": "+1 (803) 503-3142",
    "address": "814 Herkimer Place, Lindcove, Maine, 5048",
    "about": "Et veniam reprehenderit do nostrud ullamco excepteur qui. Dolor non voluptate qui reprehenderit mollit. Ut Lorem reprehenderit tempor nostrud laboris amet. Commodo Lorem laborum nisi magna nostrud eiusmod. Qui nisi voluptate officia duis est veniam ex do cupidatat commodo exercitation.\r\n",
    "registered": "2017-05-31T11:14:29 -12:00",
    "latitude": -62.526329,
    "longitude": 142.473336,
    "tags": [
      "velit",
      "dolore",
      "nulla",
      "consectetur",
      "eiusmod",
      "aute",
      "ut"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Moore Page"
      },
      {
        "id": 1,
        "name": "Moses Payne"
      },
      {
        "id": 2,
        "name": "Tanisha Pratt"
      }
    ],
    "greeting": "Hello, Annie Whitney! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bc05e2449b6e209dcf7c971",
    "index": 4,
    "guid": "39d2c65c-aec7-4b3b-ada0-8f6465852d27",
    "isActive": false,
    "balance": "$1,209.76",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "brown",
    "name": "Noel Drake",
    "gender": "male",
    "company": "GLEAMINK",
    "email": "noeldrake@gleamink.com",
    "phone": "+1 (893) 577-2895",
    "address": "368 Howard Avenue, Eureka, Wyoming, 2306",
    "about": "Ipsum minim culpa nostrud fugiat culpa irure dolor nisi exercitation sint quis dolore cupidatat deserunt. Pariatur ad deserunt velit voluptate aliquip duis. Eiusmod do voluptate sit laborum elit occaecat dolore velit. Do id esse et id ut in. Exercitation aliqua ea aute excepteur cupidatat eu nulla. Esse pariatur eu consectetur sunt ipsum. Sint deserunt sunt ipsum labore voluptate deserunt laboris elit cupidatat ipsum exercitation proident cupidatat consectetur.\r\n",
    "registered": "2017-01-01T12:01:32 -13:00",
    "latitude": 27.111448,
    "longitude": 67.086367,
    "tags": [
      "cillum",
      "laborum",
      "voluptate",
      "ea",
      "aliquip",
      "aliquip",
      "duis"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Huber Richardson"
      },
      {
        "id": 1,
        "name": "Stephanie Stewart"
      },
      {
        "id": 2,
        "name": "Maxwell Vaughan"
      }
    ],
    "greeting": "Hello, Noel Drake! You have 9 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bc05e240d3026746b30ccde",
    "index": 5,
    "guid": "9ad9fd5f-2e04-4cc5-a778-ec7972c16b9e",
    "isActive": false,
    "balance": "$2,141.03",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "green",
    "name": "Pauline Shields",
    "gender": "female",
    "company": "KINETICUT",
    "email": "paulineshields@kineticut.com",
    "phone": "+1 (964) 577-3980",
    "address": "885 Turner Place, Bannock, American Samoa, 7453",
    "about": "Anim eu aute Lorem enim non. Et laboris dolore deserunt nulla nulla ad ad Lorem non sit sunt. Reprehenderit reprehenderit reprehenderit ad eiusmod sint. Aliqua mollit tempor magna Lorem qui. Irure nisi fugiat incididunt id pariatur eu. Anim ad veniam proident laboris Lorem ut sit commodo.\r\n",
    "registered": "2018-04-26T11:47:56 -12:00",
    "latitude": 16.423505,
    "longitude": -76.431345,
    "tags": [
      "aute",
      "labore",
      "ex",
      "minim",
      "aliquip",
      "exercitation",
      "aliquip"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Sheree Owen"
      },
      {
        "id": 1,
        "name": "Gonzales Simpson"
      },
      {
        "id": 2,
        "name": "Beck Nunez"
      }
    ],
    "greeting": "Hello, Pauline Shields! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bc05e24dec6e788232a296a",
    "index": 6,
    "guid": "fb62ed19-2c60-47b7-8be9-f056a920d35a",
    "isActive": false,
    "balance": "$1,167.65",
    "picture": "http://placehold.it/32x32",
    "age": 24,
    "eyeColor": "brown",
    "name": "Pansy Weber",
    "gender": "female",
    "company": "QUANTASIS",
    "email": "pansyweber@quantasis.com",
    "phone": "+1 (918) 525-3917",
    "address": "345 Harwood Place, Greensburg, Vermont, 8263",
    "about": "Nostrud velit ad consectetur mollit in exercitation ullamco commodo voluptate ut tempor excepteur duis officia. Veniam ad pariatur qui non ea. Ullamco dolor culpa sunt enim minim irure eu sint proident reprehenderit.\r\n",
    "registered": "2018-02-18T12:04:47 -13:00",
    "latitude": 83.850683,
    "longitude": 172.621699,
    "tags": [
      "et",
      "ut",
      "nisi",
      "pariatur",
      "eu",
      "elit",
      "mollit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Morse Hunt"
      },
      {
        "id": 1,
        "name": "Dona Chan"
      },
      {
        "id": 2,
        "name": "Slater Patel"
      }
    ],
    "greeting": "Hello, Pansy Weber! You have 4 unread messages.",
    "favoriteFruit": "banana"
  }
]


var msgpack = require("msgpack-lite");
var anotherMsgpack = require('tiny-msgpack');


// console.time('MSGPack 0')
// // let b = msgpack.encode(a);

// for (let i = 0; i < 1000000; i++) {
//   let b = anotherMsgpack.encode(a);
//   let m = anotherMsgpack.decode(b);
// }
// console.timeEnd('MSGPack 0')

console.time('MSGPack 1')
// let b = msgpack.encode(a);

for (let i = 0; i < 100000; i++) {
  let b = msgpack.encode(a);
  let m = msgpack.decode(b);
}
console.timeEnd('MSGPack 1')

console.time('MSGPack 2')
// let x = msgPack.encode(a);
for (let i = 0; i < 100000; i++) {
  let x = msgPack.encode(a);
  let m = msgPack.decode(x);
}
console.timeEnd('MSGPack 2')

console.time('JSON fn')
// let k = Buffer.from(JSON.stringify(a));
for (let i = 0; i < 100000; i++) {
  let k = Buffer.from(JSON.stringify(a));
  let m = JSON.parse(k);
}
console.timeEnd('JSON fn')


