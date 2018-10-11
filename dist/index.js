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
    const t = e.length;
    let n = 0;
    for (let f = 0; f < t; ++f) n += e[f].byteLength;
    const f = new Uint8Array(n);
    let r = 0;
    for (let n = 0; n < t; ++n) {
        const t = e[n];
        f.set(t, r), r += t.byteLength;
    }
    return f;
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

function map(e, t) {
    const n = Object.keys(t), f = n.length;
    f < 16 ? type(e, 128 + f) : f <= 65535 ? int16(e, 222, f) : int32(e, 223, f);
    for (let r = 0; r < f; ++r) {
        const f = n[r];
        encode(e, (f >>> 0) + "" === f ? f >>> 0 : f), encode(e, t[f]);
    }
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
    for (let f = 0; f < n; ++f) encode(e, t[f]);
}

const encodingFunctions = {
    symbol: nil,
    function: nil,
    undefined: nil,
    number: (e, t) => {
        const n = t >>> 0;
        if (t === n) n <= 127 ? type(e, n) : n <= 255 ? int8(e, 204, n) : n <= 65535 ? int16(e, 205, n) : int32(e, 206, n); else {
            const n = 0 | t;
            t === n ? n >= -32 ? type(e, 255 & n) : n >= -128 ? int8(e, 208, n) : n >= -32768 ? int16(e, 209, n) : int32(e, 210, n) : isFloat32(t) ? float32(e, t) : float64(e, t);
        }
    },
    string: (e, t) => {
        const n = fromString(t), f = n.byteLength;
        f < 32 ? type(e, 160 + f) : f <= 255 ? int8(e, 217, f) : f <= 65535 ? int16(e, 218, f) : int32(e, 219, f), 
        e.send(n);
    },
    object: (e, t) => null === t ? nil(e) : Array.isArray(t) ? array(e, t) : t instanceof Uint8Array ? bin(e, t) : void map(e, t),
    boolean: (e, t) => {
        type(e, t ? 195 : 194);
    }
};

function encode(e, t) {
    encodingFunctions[typeof t](e, t);
}

function map$1(e, t) {
    const n = {};
    for (let f = 0; f < t; ++f) n[decode(e)] = decode(e);
    return n;
}

function array$1(e, t) {
    const n = new Array(t);
    for (let f = 0; f < t; ++f) n[f] = decode(e);
    return n;
}

function str(e, t) {
    const n = e.offset, f = e.offset = n + t;
    if (f > e.buffer.byteLength) throw new RangeError("BUFFER_SHORTAGE");
    return toString(e.buffer, n, f);
}

function bin$1(e, t) {
    const n = e.offset, f = e.offset = n + t;
    if (f > e.buffer.byteLength) throw new RangeError("BUFFER_SHORTAGE");
    return subarray(e.buffer, n, f);
}

function ext(e, t) {
    const n = e.offset;
    if ((e.offset = n + t + 1) > e.buffer.byteLength) throw new RangeError("BUFFER_SHORTAGE");
    e.buffer[n];
}

function uint8(e) {
    const t = e.buffer;
    if (e.offset >= t.byteLength) throw new RangeError("BUFFER_SHORTAGE");
    return t[e.offset++];
}

function uint16(e) {
    const t = e.buffer;
    if (e.offset + 2 > t.byteLength) throw new RangeError("BUFFER_SHORTAGE");
    return t[e.offset++] << 8 | t[e.offset++];
}

function uint32(e) {
    const t = e.buffer;
    if (e.offset + 4 > t.byteLength) throw new RangeError("BUFFER_SHORTAGE");
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
    if (e.offset + 4 > t.byteLength) throw new RangeError("BUFFER_SHORTAGE");
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

function constant(e) {
    return () => e;
}

function fix(e, t) {
    return n => t(n, e);
}

function flex(e, t) {
    return n => t(n, e(n));
}

function assignValues() {
    let e;
    for (e = 0; e <= 127; ++e) readToken[e] = constant(e);
    for (e = 128; e <= 143; ++e) readToken[e] = fix(e - 128, map$1);
    for (e = 144; e <= 159; ++e) readToken[e] = fix(e - 144, array$1);
    for (e = 160; e <= 191; ++e) readToken[e] = fix(e - 160, str);
    for (readToken[192] = constant(null), readToken[193] = null, readToken[194] = constant(!1), 
    readToken[195] = constant(!0), readToken[196] = flex(uint8, bin$1), readToken[197] = flex(uint16, bin$1), 
    readToken[198] = flex(uint32, bin$1), readToken[199] = flex(uint8, ext), readToken[200] = flex(uint16, ext), 
    readToken[201] = flex(uint32, ext), readToken[202] = float32$1, readToken[203] = float64$1, 
    readToken[204] = uint8, readToken[205] = uint16, readToken[206] = uint32, readToken[207] = null, 
    readToken[208] = int8$1, readToken[209] = int16$1, readToken[210] = int32$1, readToken[211] = null, 
    readToken[212] = fix(1, ext), readToken[213] = fix(2, ext), readToken[214] = fix(4, ext), 
    readToken[215] = fix(8, ext), readToken[216] = fix(16, ext), readToken[217] = flex(uint8, str), 
    readToken[218] = flex(uint16, str), readToken[219] = flex(uint32, str), readToken[220] = flex(uint16, array$1), 
    readToken[221] = flex(uint32, array$1), readToken[222] = flex(uint16, map$1), readToken[223] = flex(uint32, map$1), 
    e = 224; e <= 255; ++e) readToken[e] = constant(e - 256);
}

function decode(e) {
    const t = uint8(e), n = readToken[t];
    if (!n) throw new Error("Invalid type: " + (t ? "0x" + t.toString(16) : t));
    return n(e);
}

assignValues();

const MIN_BUFFER_SIZE = 2048, MAX_BUFFER_SIZE = 65536;

class Paper {
    constructor() {
        this.buffers = [], this.start = 0, this.offset = 0;
    }
    setBuffer(e) {
        this.buffer = e, this.start = 0, this.offset = 0;
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

const encoder = new Paper(), decoder = new Paper();

function encode$1(e) {
    return encode(encoder, e), encoder.read();
}

function decode$1(e) {
    return decoder.setBuffer(e), decode(decoder);
}

exports.encode = encode$1, exports.decode = decode$1;
