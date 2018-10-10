import { Paper } from './paper';

export function type(encoder: Paper, valueType: any): void {
  encoder.reserve(1);
  encoder.buffer[encoder.offset++] = valueType;
}

export function int8(encoder: Paper, valueType: any, value: any): void {
  encoder.reserve(2);
  encoder.buffer[encoder.offset++] = valueType;
  encoder.buffer[encoder.offset++] = value;
}

export function int16(encoder: Paper, valueType: any, value: any): void {
  encoder.reserve(3);
  encoder.buffer[encoder.offset++] = valueType;
  encoder.buffer[encoder.offset++] = value >>> 8;
  encoder.buffer[encoder.offset++] = value;
}

export function int32(encoder: Paper, valueType: any, value: any): void {
  encoder.reserve(5);
  encoder.buffer[encoder.offset++] = valueType;
  encoder.buffer[encoder.offset++] = value >>> 24;
  encoder.buffer[encoder.offset++] = value >>> 16;
  encoder.buffer[encoder.offset++] = value >>> 8;
  encoder.buffer[encoder.offset++] = value;
}

export function float32(encoder: Paper, value: any): void {
  encoder.reserve(5);
  encoder.buffer[encoder.offset++] = 0xca;
  new DataView(encoder.buffer.buffer).setFloat32(encoder.buffer.byteOffset + encoder.offset, value);
  encoder.offset += 4;
}

export function float64(encoder: Paper, value: any): void {
  encoder.reserve(9);
  encoder.buffer[encoder.offset++] = 0xcb;
  new DataView(encoder.buffer.buffer).setFloat64(encoder.buffer.byteOffset + encoder.offset, value);
  encoder.offset += 8;
}