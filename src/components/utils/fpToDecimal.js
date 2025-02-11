const fpToDecimal = (binary) => {
    if (binary.length != 32) return NaN
    const sign = binary[0] == 0 ? 1 : -1;
    const exponent = parseInt(binary.slice(1, 9), 2) - 127;
    let mantissa = 1.0;

    for (let i = 0; i < 23; i++) {
        if (binary[9 + i] === '1') {
            mantissa += Math.pow(2, -(i + 1));
        }
    }

    return sign * mantissa * Math.pow(2, exponent);
}

export default fpToDecimal