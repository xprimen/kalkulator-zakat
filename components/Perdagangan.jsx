import React, { useCallback, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { numberToString } from '../helpers';

const Perdagangan = ({
  hargaEmas,
  loading,
  loader,
  persenZakat,
  nishabGram,
}) => {
  const [modal, setModal] = useState(0);
  const [untung, setUntung] = useState(0);
  const [piutang, setPiutang] = useState(0);
  const [utang, setUtang] = useState(0);
  const [kerugian, setKerugian] = useState(0);
  const [showNote, setShowNote] = useState(true);
  const nishab = hargaEmas * nishabGram;
  const [totalZakat, setTotalZakat] = useState(0);
  const [info, setInfo] = useState('');
  const [color, setColor] = useState('text-red-500');

  const countTotalZakat = useCallback(() => {
    let totalCount = 0;
    totalCount = modal + untung + piutang;
    totalCount = totalCount - (utang + kerugian);
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
  }, [kerugian, modal, nishab, persenZakat, piutang, untung, utang]);

  useEffect(() => {
    countTotalZakat();
  }, [modal, untung, piutang, countTotalZakat]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <div className="border-t border-gray-300">
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="modal"
              className="text-sm font-medium text-gray-800"
            >
              Modal
            </label>
            <small className="text-xs text-gray-400">
              (Yang diputar selama 1 tahun)
            </small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="modal"
              name="modal"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={modal}
              onValueChange={(value, name) =>
                value === undefined ? setModal(0) : setModal(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-gray-100 px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="untung"
              className="text-sm font-medium text-gray-800"
            >
              Keuntungan
            </label>
            <small className="text-xs text-gray-400">(Selama 1 tahun)</small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="untung"
              name="untung"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={untung}
              onValueChange={(value, name) =>
                value === undefined ? setUntung(0) : setUntung(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="piutang"
              className="text-sm font-medium text-gray-800"
            >
              Piutang
            </label>
            <small className="text-xs text-gray-400">
              (Selama 1 tahun. Opsional)
            </small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="piutang"
              name="piutang"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={piutang}
              onValueChange={(value, name) =>
                value === undefined ? setPiutang(0) : setPiutang(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-gray-100 px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="utang"
              className="text-sm font-medium text-gray-800"
            >
              Utang
            </label>
            <small className="text-xs text-gray-400">
              (Selama 1 tahun. Opsional)
            </small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="utang"
              name="utang"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={utang}
              onValueChange={(value, name) =>
                value === undefined ? setUtang(0) : setUtang(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="kerugian"
              className="text-sm font-medium text-gray-800"
            >
              Kerugian
            </label>
            <small className="text-xs text-gray-400">
              (Selama 1 tahun. Opsional)
            </small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="kerugian"
              name="kerugian"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={kerugian}
              onValueChange={(value, name) =>
                value === undefined
                  ? setKerugian(0)
                  : setKerugian(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-gray-100 px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <label className="text-sm font-bold text-gray-800">Total</label>
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

export default Perdagangan;
