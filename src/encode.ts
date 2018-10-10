import * as write from './write-header';

import { Paper } from './paper';
import { fromString } from './buf-utils';

const float32Buffer: Float32Array = new Float32Array(1);

function nil(encoder: any): void {
  write.type(encoder, 0xc0);
}

function map(encoder: Paper, value: any): void {
  const keys: any[] = Object.keys(value);
  const length: number = keys.length;

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  length < 16 ? write.type(encoder, 0x80 + length) :
    length <= 0xffff ? write.int16(encoder, 0xde, length) :
      write.int32(encoder, 0xdf, length);

  for (let i: number = 0; i < length; ++i) {
    const key: any = keys[i];
    (key >>> 0) + '' === key ?
      encode(encoder, key >>> 0) :
      encode(encoder, key);
    encode(encoder, value[key]);
  }
}

function isFloat32(num: number): boolean {
  float32Buffer[0] = num;
  return float32Buffer[0] === num;
}

function bin(encoder: Paper, value: any): void {
  const byteLength: number = value.byteLength;

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  byteLength <= 0xff ? write.int8(encoder, 0xc4, byteLength) :
    byteLength <= 0xffff ? write.int16(encoder, 0xc5, byteLength) :
      write.int32(encoder, 0xc6, byteLength);

  encoder.send(value);
}

function array(encoder: Paper, value: any): void {
  const length: number = value.length;

  // fixarray -- 0x90 - 0x9f
  // array 16 -- 0xdc
  // array 32 -- 0xdd
  length < 16 ? write.type(encoder, 0x90 + length) :
    length <= 0xffff ? write.int16(encoder, 0xdc, length) :
      write.int32(encoder, 0xdd, length);

  for (let i: number = 0; i < length; ++i) {
    encode(encoder, value[i]);
  }

}

const encodingFunctions: { [key: string]: any } = {
  symbol: nil,
  function: nil,
  undefined: nil,
  number: (encoder: Paper, value: any): void => {
    const uivalue: number = value >>> 0;
    if (value === uivalue) {
      // positive fixint -- 0x00 - 0x7f
      // uint 8 -- 0xcc
      // uint 16 -- 0xcd
      // uint 32 -- 0xce
      uivalue <= 0x7f ? write.type(encoder, uivalue) :
        uivalue <= 0xff ? write.int8(encoder, 0xcc, uivalue) :
          uivalue <= 0xffff ? write.int16(encoder, 0xcd, uivalue) :
            write.int32(encoder, 0xce, uivalue);
    } else {
      const ivalue: number = value | 0;

      if (value === ivalue) {
        // negative fixint -- 0xe0 - 0xff
        // int 8 -- 0xd0
        // int 16 -- 0xd1
        // int 32 -- 0xd2
        ivalue >= -0x20 ? write.type(encoder, ivalue & 0xff) :
          ivalue >= -0x80 ? write.int8(encoder, 0xd0, ivalue) :
            ivalue >= -0x8000 ? write.int16(encoder, 0xd1, ivalue) :
              write.int32(encoder, 0xd2, ivalue);
      } else {
        isFloat32(value)
          ? write.float32(encoder, value)  // float 32 -- 0xca
          : write.float64(encoder, value); // float 64 -- 0xcb
      }
    }
  },
  string: (encoder: Paper, value: any): void => {
    const utf8: Uint8Array = fromString(value);
    const byteLength: number = utf8.byteLength;

    // fixstr -- 0xa0 - 0xbf
    // str 8 -- 0xd9
    // str 16 -- 0xda
    // str 32 -- 0xdb

    byteLength < 32 ? write.type(encoder, 0xa0 + byteLength) :
      byteLength <= 0xff ? write.int8(encoder, 0xd9, byteLength) :
        byteLength <= 0xffff ? write.int16(encoder, 0xda, byteLength) :
          write.int32(encoder, 0xdb, byteLength);

    encoder.send(utf8);
  },
  object: (encoder: Paper, value: any): void => {
    if (value === null) {
      return nil(encoder);
    }

    if (Array.isArray(value)) {
      return array(encoder, value);
    }

    if (value instanceof Uint8Array) {
      return bin(encoder, value);
    }
    map(encoder, value);
  },
  boolean: (encoder: Paper, value: any): void => {
    // true -- 0xc3
    // false -- 0xc2
    write.type(encoder, value ? 0xc3 : 0xc2);
  }
};

export function encode(encoder: Paper, value: any): void {
  encodingFunctions[typeof value](encoder, value);
}