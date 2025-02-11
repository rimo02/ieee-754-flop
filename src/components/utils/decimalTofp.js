const decimalToFP = (num, flag) => {
    const buffer = new ArrayBuffer(flag ? 4 : 8);
    const view = new DataView(buffer);
    
    if (flag) view.setFloat32(0, num); // Single Precision
    else view.setFloat64(0, num);      // Double Precision

    const binaryStr = Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(2).padStart(8, '0'))
        .join('');

    const sign = binaryStr[0];
    const exponent = flag ? binaryStr.slice(1, 9) : binaryStr.slice(1, 12);
    const mantissa = flag ? binaryStr.slice(9) : binaryStr.slice(12);

    const hex = `0x${parseInt(binaryStr, 2).toString(16).padStart(flag ? 8 : 16, '0')}`;

    return {
        "binary": binaryStr,
        "sign": sign,
        "exponent": exponent,
        "mantissa": mantissa,
        "hexadecimal": hex
    };
};
export default decimalToFP;
