import { useState } from 'react';
import decimalToFP from '../utils/decimalTofp';
import fpToDecimal from '../utils/fpToDecimal'

function Single() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');
  const [fpvalue, setfpValue] = useState({
    sign: '0',
    exponent: '00000000',
    mantissa: '00000000000000000000000',
  });

  const updateFieldsFromFP = (newFp) => {
    const binaryString = newFp.sign + newFp.exponent + newFp.mantissa;
    const decimalValue = fpToDecimal(binaryString);
    setBinary(binaryString);
    setDecimal(decimalValue);
    setHex(parseInt(binaryString, 2).toString(16).toUpperCase());
  };


  const handleDecimalChange = (e) => {
    const dec = e.target.value;
    if (dec !== '' && !isNaN(dec)) {
      const fp = decimalToFP(parseFloat(dec), true);
      setfpValue({ sign: fp.sign, exponent: fp.exponent, mantissa: fp.mantissa });
      updateFieldsFromFP(fp);
    } else {
      resetValues();
    }
    setDecimal(e.target.value);
  };

  const handleBinaryChange = (e) => {
    const bin = e.target.value;
    if (/^[01]{0,32}$/.test(bin)) {
      setBinary(bin);
      if (bin.length === 32) {
        const sn = bin[0];
        const exp = bin.slice(1, 9);
        const man = bin.slice(9);
        setfpValue({ sign: sn, exponent: exp, mantissa: man });
        setDecimal(fpToDecimal(bin).toString());
      } else return;
    }
  };

  const resetValues = () => {
    setfpValue({
      sign: '0',
      exponent: '00000000',
      mantissa: '00000000000000000000000',
    });
    setBinary('');
    setHex('');
    setDecimal('');
  };

  const handleCheckBoxChange = (type, index) => {
    setfpValue((prev) => {
      const updatedValue = prev[type].split('');
      updatedValue[index] = updatedValue[index] === '0' ? '1' : '0';
      const newFp = { ...prev, [type]: updatedValue.join('') }
      updateFieldsFromFP(newFp);
      return newFp;
    })
  }

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value).then(() => { alert('Copied to clipboard') });
  };

  return (
    <div className="bg-transparent h-[65vh] justify-center m-4 shadow-2xl flex-col">
      <div className='flex justify-between text-white'>
        {/* SIGN*/}
        <div className='flex flex-col m-2 items-center'>
          <h4 className='font-bold'>Sign</h4>
          <p>{parseInt(fpvalue.sign, 2)}</p>
          <div className="flex flex-wrap justify-center space-x-2 my-2">
            <input type="checkbox" checked={fpvalue.sign === '1'} onChange={() => handleCheckBoxChange('sign', 0)} />
          </div>
        </div>

        {/* EXPONENT */}
        <div className='flex flex-col items-center m-2'>
          <h4 className='font-bold'>Exponent</h4>
          <p>{parseInt(fpvalue.exponent, 2)}</p>
          <div className="flex flex-wrap justify-center space-x-2 my-2">
            {fpvalue.exponent.split('').map((bit, index) => (
              <input key={index} type="checkbox" checked={bit === '1'} onChange={() => handleCheckBoxChange('exponent', index)} />
            ))}
          </div>
        </div>

        {/* MANTISSA */}
        <div className='flex flex-col m-2 items-center'>
          <h4 className='font-bold'>Mantissa</h4>
          <p>{parseInt(fpvalue.mantissa, 2)}</p>
          <div className="flex flex-wrap justify-center space-x-2 my-2">
            {fpvalue.mantissa.split('').map((bit, index) => (
              <input key={index} type="checkbox" checked={bit === '1'} onChange={() => handleCheckBoxChange('mantissa', index)} />
            ))}
          </div>
        </div>
      </div>

      {/* the value output part */}
      <div className=" m-4 flex-col">
        <div className="flex items-center justify-between my-3">
          <div className="w-[30%] text-white">
            <p className="ml-4">Decimal Number</p>
          </div>
          <div className="flex items-center w-[60%]">
            <input
              type="text"
              className="bg-white rounded-sm flex-1 mr-2 outline-none px-1 shadow-md"
              placeholder="Enter a decimal number"
              value={decimal}
              onChange={handleDecimalChange}
            />
            <button className="bg-white rounded-sm px-2" onClick={() => handleCopy(decimal)}>Copy</button>
          </div>
        </div>

        <div className="flex items-center justify-between my-3">
          <div className="w-[30%] text-white">
            <p className="ml-4">Value </p>
          </div>
          <div className="flex items-center w-[60%]">
            <input
              type="text"
              className="bg-white rounded-sm flex-1 mr-2 outline-none px-1"
              value={decimal}
              readOnly
            />
            <button className="bg-white rounded-sm px-2" onClick={() => handleCopy(decimal)}>Copy</button>
          </div>
        </div>

        <div className="flex items-center justify-between my-3">
          <div className="w-[30%] text-white">
            <p className="ml-4">Binary Representation</p>
          </div>
          <div className="flex items-center w-[60%]">
            <input
              type="text"
              className="bg-white rounded-sm flex-1 mr-2 outline-none px-1"
              value={binary}
              onChange={handleBinaryChange}
              placeholder="Enter a binary number"
            />
            <button className="bg-white rounded-sm px-2" onClick={() => handleCopy(binary)}>Copy</button>
          </div>
        </div>

        <div className="flex items-center justify-between my-3">
          <div className="w-[30%] text-white">
            <p className="ml-4">Hexadecimal Representation</p>
          </div>
          <div className="flex items-center w-[60%]">
            0x<input
              type="text"
              className="bg-white rounded-sm flex-1 mr-2 outline-none px-1"
              value={hex}
              readOnly
            />
            <button className="bg-white rounded-sm px-2" onClick={() => handleCopy(hex)}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;