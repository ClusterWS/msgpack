import { decodeFn } from './decode';
import { BufferHolder } from './buffer.holder';
import { toString, subarray } from './buffer.util';

export function map(decoder: BufferHolder, len: number): any {
  const value: any = {};
  for (let i: number = 0; i < len; ++i) {
    // this decodeFn should be called twice !!! to parse stuff properly
    value[decodeFn(decoder)] = decodeFn(decoder);
  }
  return value;
}

export function array(decoder: BufferHolder, len: number): any {
  const value: any[] = new Array(len);
  for (let i: number = 0; i < len; ++i) {
    value[i] = decodeFn(decoder);
  }
  return value;
}

export function str(decoder: BufferHolder, len: number): string {
  const start: number = decoder.offset;
  const end: number = decoder.offset = start + len;
  return toString(decoder.buffer, start, end);
}

export function bin(decoder: BufferHolder, len: number): Uint8Array {
  const start: number = decoder.offset;
  const end: number = decoder.offset = start + len;
  return subarray(decoder.buffer, start, end);
}

export function uint8(decoder: BufferHolder): number {
  return decoder.buffer[decoder.offset++];
}

export function uint16(decoder: BufferHolder): number {
  const buffer: Uint8Array = decoder.buffer;
  return (buffer[decoder.offset++] << 8) | buffer[decoder.offset++];
}

export function uint32(decoder: BufferHolder): number {
  const buffer: Uint8Array = decoder.buffer;
  return (buffer[decoder.offset++] * 0x1000000) +
    ((buffer[decoder.offset++] << 16) | (buffer[decoder.offset++] << 8) | buffer[decoder.offset++]);
}

export function int8(decoder: BufferHolder): number {
  const val: number = uint8(decoder);
  return !(val & 0x80) ? val : (0xff - val + 1) * -1;
}

export function int16(decoder: BufferHolder): number {
  const val: number = uint16(decoder);
  return (val & 0x8000) ? val | 0xFFFF0000 : val;
}

export function int32(decoder: BufferHolder): number {
  const buffer: Uint8Array = decoder.buffer;
  return (buffer[decoder.offset++] << 24) |
    (buffer[decoder.offset++] << 16) | (buffer[decoder.offset++] << 8) | buffer[decoder.offset++];
}

export function float32(decoder: BufferHolder): number {
  const buffer: Uint8Array = decoder.buffer;
  const offset: number = decoder.offset;
  decoder.offset += 4;
  return new DataView(buffer.buffer).getFloat32(buffer.byteOffset + offset);
}

export function float64(decoder: BufferHolder): number {
  const buffer: Uint8Array = decoder.buffer;
  const offset: number = decoder.offset;
  decoder.offset += 8;
  return new DataView(buffer.buffer).getFloat64(buffer.byteOffset + offset);
}