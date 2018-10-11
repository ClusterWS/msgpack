export function concat(buffers: Uint8Array[]): Uint8Array {
  let totalLength: number = 0;
  const buffersCount: number = buffers.length;

  for (let i: number = 0; i < buffersCount; ++i) {
    totalLength += buffers[i].byteLength;
  }

  let offset: number = 0;
  const output: Uint8Array = new Uint8Array(totalLength);

  for (let i: number = 0; i < buffersCount; ++i) {
    const buffer: Uint8Array = buffers[i];
    output.set(buffer, offset);
    offset += buffer.byteLength;
  }

  return output;
}

export function subarray(buffer: Uint8Array, start: number, end: number): Uint8Array {
  start = Math.min(Math.max(0, start), buffer.byteLength);
  return new Uint8Array(buffer.buffer,
    buffer.byteOffset + start,
    Math.min(Math.max(start, end), buffer.byteLength) - start
  );
}

// need to add browser support system
export function toString(buffer: Uint8Array, start: number, end: number): string {
  return Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    .toString('utf8', start, end);
}

export function fromString(str: string): Uint8Array {
  const buffer: Buffer = Buffer.from(str);
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
}