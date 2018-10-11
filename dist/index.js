"use strict";

function type(e, t) {
    e.reserve(1), e.buffer[e.offset++] = t;
}

function int8(e, t, n) {
    e.reserve(2), e.buffer[e.offset++] = t, e.buffer[e.offset++] = n;
}

function int16(e, t, n) {
    e.reserve(3), e.buffer[e.offset++] = t, e.buffer[e.offset++] = n >>> 8, e.buffer[e.offset++] = n;
}

function int32(e, t, n) {
    e.reserve(5), e.buffer[e.offset++] = t, e.buffer[e.offset++] = n >>> 24, e.buffer[e.offset++] = n >>> 16, 
    e.buffer[e.offset++] = n >>> 8, e.buffer[e.offset++] = n;
}

function float32(e, t) {
    e.reserve(5), e.buffer[e.offset++] = 202, new DataView(e.buffer.buffer).setFloat32(e.buffer.byteOffset + e.offset, t), 
    e.offset += 4;
}

function float64(e, t) {
    e.reserve(9), e.buffer[e.offset++] = 203, new DataView(e.buffer.buffer).setFloat64(e.buffer.byteOffset + e.offset, t), 
    e.offset += 8;
}

function concat(e) {
    let t = 0;
    const n = e.length;
    for (let f = 0; f < n; ++f) t += e[f].byteLength;
    let f = 0;
    const r = new Uint8Array(t);
    for (let t = 0; t < n; ++t) {
        const n = e[t];
        r.set(n, f), f += n.byteLength;
    }
    return r;
}

function subarray(e, t, n) {
    return t = Math.min(Math.max(0, t), e.byteLength), new Uint8Array(e.buffer, e.byteOffset + t, Math.min(Math.max(t, n), e.byteLength) - t);
}

function toString(e, t, n) {
    return Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("utf8", t, n);
}

function fromString(e) {
    const t = Buffer.from(e);
    return new Uint8Array(t.buffer, t.byteOffset, t.length);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

const float32Buffer = new Float32Array(1);

function nil(e) {
    type(e, 192);
}

function isFloat32(e) {
    return float32Buffer[0] = e, float32Buffer[0] === e;
}

function bin(e, t) {
    const n = t.byteLength;
    n <= 255 ? int8(e, 196, n) : n <= 65535 ? int16(e, 197, n) : int32(e, 198, n), e.send(t);
}

function array(e, t) {
    const n = t.length;
    n < 16 ? type(e, 144 + n) : n <= 65535 ? int16(e, 220, n) : int32(e, 221, n);
    for (let f = 0; f < n; ++f) encodeFn(e, t[f]);
}

function map(e, t) {
    const n = Object.keys(t), f = n.length;
    f < 16 ? type(e, 128 + f) : f <= 65535 ? int16(e, 222, f) : int32(e, 223, f);
    for (let r = 0; r < f; ++r) {
        const f = n[r], o = f >>> 0;
        encodeFn(e, o + "" === f ? o : f), encodeFn(e, t[f]);
    }
}

function number(e, t) {
    const n = t >>> 0;
    if (t === n) n <= 127 ? type(e, n) : n <= 255 ? int8(e, 204, n) : n <= 65535 ? int16(e, 205, n) : int32(e, 206, n); else {
        const n = 0 | t;
        t === n ? n >= -32 ? type(e, 255 & n) : n >= -128 ? int8(e, 208, n) : n >= -32768 ? int16(e, 209, n) : int32(e, 210, n) : isFloat32(t) ? float32(e, t) : float64(e, t);
    }
}

function string(e, t) {
    const n = fromString(t), f = n.byteLength;
    f < 32 ? type(e, 160 + f) : f <= 255 ? int8(e, 217, f) : f <= 65535 ? int16(e, 218, f) : int32(e, 219, f), 
    e.send(n);
}

function object(e, t) {
    return null === t ? nil(e) : Array.isArray(t) ? array(e, t) : t instanceof Uint8Array ? bin(e, t) : void map(e, t);
}

function boolean(e, t) {
    type(e, t ? 195 : 194);
}

const encodingFunctions = {
    number: number,
    object: object,
    string: string,
    boolean: boolean,
    symbol: nil,
    function: nil,
    undefined: nil
};

function encodeFn(e, t) {
    encodingFunctions[typeof t](e, t);
}

function map$1(e, t) {
    const n = {};
    for (let f = 0; f < t; ++f) n[decodeFn(e)] = decodeFn(e);
    return n;
}

function array$1(e, t) {
    const n = new Array(t);
    for (let f = 0; f < t; ++f) n[f] = decodeFn(e);
    return n;
}

function str(e, t) {
    const n = e.offset, f = e.offset = n + t;
    return toString(e.buffer, n, f);
}

function bin$1(e, t) {
    const n = e.offset, f = e.offset = n + t;
    return subarray(e.buffer, n, f);
}

function uint8(e) {
    return e.buffer[e.offset++];
}

function uint16(e) {
    const t = e.buffer;
    return t[e.offset++] << 8 | t[e.offset++];
}

function uint32(e) {
    const t = e.buffer;
    return 16777216 * t[e.offset++] + (t[e.offset++] << 16 | t[e.offset++] << 8 | t[e.offset++]);
}

function int8$1(e) {
    const t = uint8(e);
    return 128 & t ? -1 * (255 - t + 1) : t;
}

function int16$1(e) {
    const t = uint16(e);
    return 32768 & t ? 4294901760 | t : t;
}

function int32$1(e) {
    const t = e.buffer;
    return t[e.offset++] << 24 | t[e.offset++] << 16 | t[e.offset++] << 8 | t[e.offset++];
}

function float32$1(e) {
    const t = e.buffer, n = e.offset;
    return e.offset += 4, new DataView(t.buffer).getFloat32(t.byteOffset + n);
}

function float64$1(e) {
    const t = e.buffer, n = e.offset;
    return e.offset += 8, new DataView(t.buffer).getFloat64(t.byteOffset + n);
}

const readToken = new Array(256);

function fix(e, t) {
    return n => t(n, e);
}

function flex(e, t) {
    return n => t(n, e(n));
}

function constant(e) {
    return () => e;
}

let i;

for (i = 0; i <= 127; ++i) readToken[i] = constant(i);

for (i = 128; i <= 143; ++i) readToken[i] = fix(i - 128, map$1);

for (i = 144; i <= 159; ++i) readToken[i] = fix(i - 144, array$1);

for (i = 160; i <= 191; ++i) readToken[i] = fix(i - 160, str);

for (readToken[192] = constant(null), readToken[193] = null, readToken[194] = constant(!1), 
readToken[195] = constant(!0), readToken[196] = flex(uint8, bin$1), readToken[197] = flex(uint16, bin$1), 
readToken[198] = flex(uint32, bin$1), readToken[202] = float32$1, readToken[203] = float64$1, 
readToken[204] = uint8, readToken[205] = uint16, readToken[206] = uint32, readToken[207] = null, 
readToken[208] = int8$1, readToken[209] = int16$1, readToken[210] = int32$1, readToken[211] = null, 
readToken[217] = flex(uint8, str), readToken[218] = flex(uint16, str), readToken[219] = flex(uint32, str), 
readToken[220] = flex(uint16, array$1), readToken[221] = flex(uint32, array$1), 
readToken[222] = flex(uint16, map$1), readToken[223] = flex(uint32, map$1), i = 224; i <= 255; ++i) readToken[i] = constant(i - 256);

function decodeFn(e) {
    return readToken[uint8(e)](e);
}

const MIN_BUFFER_SIZE = 2048, MAX_BUFFER_SIZE = 65536;

class BufferHolder {
    constructor() {
        this.start = 0, this.offset = 0, this.buffers = [];
    }
    setBuffer(e) {
        this.start = 0, this.offset = 0, this.buffer = e;
    }
    alloc(e) {
        this.setBuffer(new Uint8Array(Math.max(e, MIN_BUFFER_SIZE)));
    }
    push(e) {
        this.buffers.push(e);
    }
    reserve(e) {
        if (!this.buffer) return this.alloc(e);
        const t = this.buffer.byteLength;
        this.offset + e > t && (this.offset && this.flush(), this.alloc(Math.max(e, Math.min(2 * t, MAX_BUFFER_SIZE))));
    }
    read() {
        this.flush();
        const e = this.buffers.length;
        if (e) {
            const t = e > 1 ? concat(this.buffers) : this.buffers[0];
            return this.buffers.length = 0, t;
        }
    }
    flush() {
        this.start < this.offset && (this.push(subarray(this.buffer, this.start, this.offset)), 
        this.start = this.offset);
    }
    send(e) {
        const t = this.offset + e.byteLength;
        this.buffer && t <= this.buffer.byteLength ? (this.buffer.set(e, this.offset), this.offset = t) : (this.flush(), 
        this.push(e));
    }
}

const encoder = new BufferHolder(), decoder = new BufferHolder();

function encode(e) {
    return encodeFn(encoder, e), encoder.read();
}

function decode(e) {
    return decoder.setBuffer(e), decodeFn(decoder);
}

exports.encode = encode, exports.decode = decode;
