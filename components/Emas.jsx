import React, { useCallback, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { numberToString } from '../helpers';

const Emas = ({ hargaEmas, loading, loader, persenZakat, nishabGram }) => {
  const [simpananEmas, setSimpananEmas] = useState(0);
  const [showNote, setShowNote] = useState(true);
  const [totalZakat, setTotalZakat] = useState(0);
  const nishab = hargaEmas * nishabGram;
  const [info, setInfo] = useState('');
  const [color, setColor] = useState('text-red-500');

  const countTotalZakat = useCallback(() => {
    let totalCount = 0;
    totalCount = simpananEmas * hargaEmas;
    let totalSetelahPersen = totalCount * persenZakat;
    totalSetelahPersen = parseInt(totalSetelahPersen, 10);
    if (totalSetelahPersen > 0) {
      setTotalZakat(totalSetelahPersen);
      if (totalCount < nishab) {
        setInfo('Tidak Wajib Membayar Zakat, Tapi Bisa Berinfak');
        setColor('text-red-500');
      } else {
        setInfo('Wajib Membayar Zakat');
        setColor('text-gray-800');
      }
    } else {
      setTotalZakat(0);
      setInfo('');
    }
  }, [hargaEmas, nishab, persenZakat, simpananEmas]);

  useEffect(() => {
    countTotalZakat();
  }, [countTotalZakat]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <div className="border-t border-gray-300">
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="penghasilan"
              className="text-sm font-medium text-gray-800"
            >
              Jumlah Emas
            </label>
            <small className="text-xs text-gray-400">(per gram)</small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="simpananEmas"
              name="simpananEmas"
              // suffix=" gram"
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={simpananEmas}
              onValueChange={(value, name) =>
                value === undefined
                  ? setSimpananEmas(0)
                  : setSimpananEmas(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-gray-100 px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <label
            htmlFor="pendapatan-lain"
            className="text-sm font-bold text-gray-800"
          >
            Total
          </label>
          <h3 className="font-medium text-gray-800">
            Rp {numberToString(totalZakat)}
          </h3>
        </div>
        <div className="bg-white px-4 py-4 items-start text-xs text-gray-800">
          <h2
            className={
              'text-lg font-medium mb-2 transition duration-700 ease-in-out ' +
              color
            }
          >
            {info}
          </h2>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowNote(!showNote)}
          >
            <span>Note:</span>
            {showNote ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {showNote && (
            <ul className="px-4 mt-2 list-circle sm:col-span-2 text-gray-500">
              <li>
                Perhitungan zakat diupdate otomatis berdasarkan update harga
                emas
              </li>
              <li>
                Harga emas per gram saat ini Rp {numberToString(hargaEmas)}{' '}
                (www.logammulia.com)
              </li>
              <li>
                Nishab {nishabGram} gram per Tahun Rp {numberToString(nishab)}
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emas;
