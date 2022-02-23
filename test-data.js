function convertTypedArray(src, type) {
    var buffer = new ArrayBuffer(src.byteLength);
    new src.constructor(buffer).set(src);
    return new type(buffer);
}

console.log(convertTypedArray(new Float32Array([0.5, 0.3, -0.1]), Uint8Array));