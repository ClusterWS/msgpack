import { subarray, concat } from './buf-utils';

const MIN_BUFFER_SIZE: number = 2048;
const MAX_BUFFER_SIZE: number = 65536;

export class Paper {
  public buffers: Uint8Array[] = [];
  public buffer: Uint8Array;
  public start: number = 0;
  public offset: number = 0;

  public setBuffer(buffer: Uint8Array): void {
    this.buffer = buffer;
    this.start = 0;
    this.offset = 0;
  }

  public alloc(length: number): void {
    this.setBuffer(new Uint8Array(Math.max(length, MIN_BUFFER_SIZE)));
  }

  public push(chunk: any): void {
    this.buffers.push(chunk);
  }

  public reserve(length: number): void {
    if (!this.buffer) {
      return this.alloc(length);
    }

    const size: number = this.buffer.byteLength;

    if (this.offset + length > size) {
      this.offset && this.flush();
      this.alloc(Math.max(length, Math.min(size * 2, MAX_BUFFER_SIZE)));
    }
  }

  public read(): void {
    this.flush();
    const len: number = this.buffers.length;
    if (len) {
      // add Buffer work
      const chunk: any = len > 1 ? concat(this.buffers) : this.buffers[0];
      this.buffers.length = 0;
      return chunk;
    }
  }

  public flush(): void {
    if (this.start < this.offset) {
      // add Buffer work
      this.push(subarray(this.buffer, this.start, this.offset));
      this.start = this.offset;
    }
  }

  public send(buffer: Uint8Array): void {
    const end: number = this.offset + buffer.byteLength;

    if (this.buffer && end <= this.buffer.byteLength) {
      this.buffer.set(buffer, this.offset);
      this.offset = end;
    } else {
      this.flush();
      this.push(buffer);
    }
  }
}