import * as encodeEngine from './encode';
import * as decodeEngine from './decode';

import { Paper } from './paper';

export function encode(input: any): void {
  const encoder: Paper = new Paper();
  encodeEngine.encode(encoder, input);
  return encoder.read();
}

export function decode(input: any): void {
  // implement check for unit8array
  const decoder: Paper = new Paper();
  decoder.setBuffer(input);
  return decodeEngine.decode(decoder);
}
