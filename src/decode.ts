import * as reader from './read-format';

const readToken: any[] = new Array(256);

function constant(value: any): any {
  return (): any => {
    return value;
  };
}

function fix(len: number, method: any): any {
  return (decoder: any): void => {
    return method(decoder, len);
  };
}

function flex(lenFunc: any, method: any): any {
  return (decoder: any): any => {
    return method(decoder, lenFunc(decoder));
  };
}

function assignValues(): void {
  let i: number;

  // positive fixint -- 0x00 - 0x7f
  for (i = 0x00; i <= 0x7f; ++i) {
    readToken[i] = constant(i);
  }

  // fixmap -- 0x80 - 0x8f
  for (i = 0x80; i <= 0x8f; ++i) {
    readToken[i] = fix(i - 0x80, reader.map);
  }

  // fixarray -- 0x90 - 0x9f
  for (i = 0x90; i <= 0x9f; ++i) {
    readToken[i] = fix(i - 0x90, reader.array);
  }

  // fixstr -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; ++i) {
    readToken[i] = fix(i - 0xa0, reader.str);
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
  readToken[0xc4] = flex(reader.uint8, reader.bin);
  readToken[0xc5] = flex(reader.uint16, reader.bin);
  readToken[0xc6] = flex(reader.uint32, reader.bin);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  readToken[0xc7] = flex(reader.uint8, reader.ext);
  readToken[0xc8] = flex(reader.uint16, reader.ext);
  readToken[0xc9] = flex(reader.uint32, reader.ext);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  readToken[0xca] = reader.float32;
  readToken[0xcb] = reader.float64;

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  readToken[0xcc] = reader.uint8;
  readToken[0xcd] = reader.uint16;
  readToken[0xce] = reader.uint32;
  readToken[0xcf] = null;

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  readToken[0xd0] = reader.int8;
  readToken[0xd1] = reader.int16;
  readToken[0xd2] = reader.int32;
  readToken[0xd3] = null;

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  readToken[0xd4] = fix(1, reader.ext);
  readToken[0xd5] = fix(2, reader.ext);
  readToken[0xd6] = fix(4, reader.ext);
  readToken[0xd7] = fix(8, reader.ext);
  readToken[0xd8] = fix(16, reader.ext);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  readToken[0xd9] = flex(reader.uint8, reader.str);
  readToken[0xda] = flex(reader.uint16, reader.str);
  readToken[0xdb] = flex(reader.uint32, reader.str);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  readToken[0xdc] = flex(reader.uint16, reader.array);
  readToken[0xdd] = flex(reader.uint32, reader.array);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  readToken[0xde] = flex(reader.uint16, reader.map);
  readToken[0xdf] = flex(reader.uint32, reader.map);

  // negative fixint -- 0xe0 - 0xff
  for (i = 0xe0; i <= 0xff; ++i) {
    readToken[i] = constant(i - 0x100);
  }
}

assignValues();

export function decode(decoder: any): any {
  const type: any = reader.uint8(decoder);
  const func: any = readToken[type];
  if (!func) {
    throw new Error('Invalid type: ' + (type ? ('0x' + type.toString(16)) : type));
  }

  return func(decoder);
}