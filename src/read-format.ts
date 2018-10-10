import { decode } from './decode';
import { subarray, toString } from './buf-utils';

export function map(decoder: any, len: number): any {
  const value: any = {};
  for (let i: number = 0; i < len; ++i) {
    value[decode(decoder)] = decode(decoder);
  }
  return value;
}

export function array(decoder: any, len: number): any {
  const value: any = new Array(len);
  for (let i: number = 0; i < len; ++i) {
    value[i] = decode(decoder);
  }
  return value;
}

export function str(decoder: any, len: number): any {
  const start: number = decoder.offset;
  const end: number = decoder.offset = start + len;
  if (end > decoder.buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  return toString(decoder.buffer, start, end);
}

export function bin(decoder: any, len: number): any {
  const start: number = decoder.offset;
  const end: number = decoder.offset = start + len;
  if (end > decoder.buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  return subarray(decoder.buffer, start, end);
}

export function ext(decoder: any, len: number): any {
  const start: number = decoder.offset;
  const end: number = decoder.offset = start + len + 1;
  if (end > decoder.buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  const etype: any = decoder.buffer[start];
  // need to remove this may be
  // var unpacker;
  // if (decoder.codec && (unpacker = decoder.codec._unpackerFor(etype))) {
  //   return unpacker(BufferUtil.subarray(decoder.buffer, start + 1, end));
  // }
  // throw new Error('Unrecognized extension type: ' + (etype ? ('0x' + etype.toString(16)) : etype));
}

export function uint8(decoder: any): any {
  const buffer: any = decoder.buffer;
  if (decoder.offset >= buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  return buffer[decoder.offset++];
}

export function uint16(decoder: any): any {
  const buffer: any = decoder.buffer;
  if (decoder.offset + 2 > buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  return (buffer[decoder.offset++] << 8) | buffer[decoder.offset++];
}

export function uint32(decoder: any): any {
  const buffer: any = decoder.buffer;
  if (decoder.offset + 4 > buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  return (buffer[decoder.offset++] * 0x1000000) +
    ((buffer[decoder.offset++] << 16) |
      (buffer[decoder.offset++] << 8) |
      buffer[decoder.offset++]);
}

export function int8(decoder: any): any {
  const val: any = uint8(decoder);
  return !(val & 0x80) ? val : (0xff - val + 1) * -1;
}

export function int16(decoder: any): any {
  const val: any = uint16(decoder);
  return (val & 0x8000) ? val | 0xFFFF0000 : val;
}

export function int32(decoder: any): any {
  const buffer: any = decoder.buffer;
  if (decoder.offset + 4 > buffer.byteLength) {
    throw new RangeError('BUFFER_SHORTAGE');
  }
  return (buffer[decoder.offset++] << 24) |
    (buffer[decoder.offset++] << 16) |
    (buffer[decoder.offset++] << 8) |
    buffer[decoder.offset++];
}

export function float32(decoder: any): any {
  const buffer: any = decoder.buffer;
  const offset: number = decoder.offset;
  decoder.offset += 4;
  return new DataView(buffer.buffer).getFloat32(buffer.byteOffset + offset);
}

export function float64(decoder: any): any {
  const buffer: any = decoder.buffer;
  const offset: number = decoder.offset;
  decoder.offset += 8;
  return new DataView(buffer.buffer).getFloat64(buffer.byteOffset + offset);
}