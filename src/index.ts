import { encodeFn } from './encode';
import { decodeFn } from './decode';
import { BufferHolder } from './buffer.holder';

const encoder: BufferHolder = new BufferHolder();
const decoder: BufferHolder = new BufferHolder();

export function encode(input: any): Uint8Array | null {
  encodeFn(encoder, input);
  return encoder.read();
}

export function decode(input: Buffer | Uint8Array): any {
  decoder.setBuffer(input);
  return decodeFn(decoder);
}