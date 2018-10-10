export function concat(buffers: Uint8Array[]): Uint8Array {
  const bufferCount: number = buffers.length;
  let totalLength: number = 0;

  for (let i: number = 0; i < bufferCount; ++i) {
    totalLength += buffers[i].byteLength;
  }

  const output: Uint8Array = new Uint8Array(totalLength);
  let offset: number = 0;

  for (let i: number = 0; i < bufferCount; ++i) {
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

export function toString(buffer: Uint8Array, start: number, end: number): string {
  return Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    .toString('utf8', start, end);
}

export function fromString(str: string): Uint8Array {
  const buffer: Buffer = Buffer.from(str);
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
}