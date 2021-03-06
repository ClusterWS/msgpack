import * as read from './read.format';
import { BufferHolder } from './buffer.holder';

const readToken: any[] = new Array(256);

function fix(len: number, method: any): any {
  return (decoder: BufferHolder): void => {
    return method(decoder, len);
  };
}

function flex(lenFunc: any, method: any): any {
  return (decoder: BufferHolder): any => {
    return method(decoder, lenFunc(decoder));
  };
}

function constant(value: any): any {
  return (): any => {
    return value;
  };
}

let i: number;

// positive fixint -- 0x00 - 0x7f
for (i = 0x00; i <= 0x7f; ++i) {
  readToken[i] = constant(i);
}

// fixmap -- 0x80 - 0x8f
for (i = 0x80; i <= 0x8f; ++i) {
  readToken[i] = fix(i - 0x80, read.map);
}

// fixarray -- 0x90 - 0x9f
for (i = 0x90; i <= 0x9f; ++i) {
  readToken[i] = fix(i - 0x90, read.array);
}

// fixstr -- 0xa0 - 0xbf
for (i = 0xa0; i <= 0xbf; ++i) {
  readToken[i] = fix(i - 0xa0, read.str);
}

// nil -- 0xc0
readToken[0xc0] = constant(null);

// (never used) -- 0xc1
readToken[0xc1] = null;

// false -- 0xc2
// true -- 0xc3
readToken[0xc2] = constant(false);
readToken[0xc3] = constant(true);

// bin 8 -- 0xc4
// bin 16 -- 0xc5
// bin 32 -- 0xc6
readToken[0xc4] = flex(read.uint8, read.bin);
readToken[0xc5] = flex(read.uint16, read.bin);
readToken[0xc6] = flex(read.uint32, read.bin);

// float 32 -- 0xca
// float 64 -- 0xcb
readToken[0xca] = read.float32;
readToken[0xcb] = read.float64;

// uint 8 -- 0xcc
// uint 16 -- 0xcd
// uint 32 -- 0xce
// uint 64 -- 0xcf
readToken[0xcc] = read.uint8;
readToken[0xcd] = read.uint16;
readToken[0xce] = read.uint32;
readToken[0xcf] = null;

// int 8 -- 0xd0
// int 16 -- 0xd1
// int 32 -- 0xd2
// int 64 -- 0xd3
readToken[0xd0] = read.int8;
readToken[0xd1] = read.int16;
readToken[0xd2] = read.int32;
readToken[0xd3] = null;

// str 8 -- 0xd9
// str 16 -- 0xda
// str 32 -- 0xdb
readToken[0xd9] = flex(read.uint8, read.str);
readToken[0xda] = flex(read.uint16, read.str);
readToken[0xdb] = flex(read.uint32, read.str);

// array 16 -- 0xdc
// array 32 -- 0xdd
readToken[0xdc] = flex(read.uint16, read.array);
readToken[0xdd] = flex(read.uint32, read.array);

// map 16 -- 0xde
// map 32 -- 0xdf
readToken[0xde] = flex(read.uint16, read.map);
readToken[0xdf] = flex(read.uint32, read.map);

// negative fixint -- 0xe0 - 0xff
for (i = 0xe0; i <= 0xff; ++i) {
  readToken[i] = constant(i - 0x100);
}

export function decodeFn(decoder: BufferHolder): any {
  return readToken[read.uint8(decoder)](decoder);
}