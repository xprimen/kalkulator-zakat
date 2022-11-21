import React, { useCallback, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { formatCurrency, numberToString } from '../helpers';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Penghasilan = ({ hargaEmas, loading }) => {
  // const Penghasilan = () => {
  const persenZakat = 0.025;
  const nishabGram = 85;
  const [penghasilan, setPenghasilan] = useState(0);
  const [pendapatanLain, setPendapatanLain] = useState(0);
  const [jenisPenghasilan, setJenisPenghasilan] = useState('perbulan');
  const [pengeluaran, setPengeluaran] = useState(0);
  const [showNote, setShowNote] = useState(true);
  const [nishab, setNishab] = useState((hargaEmas * nishabGram) / 12);
  const [totalZakat, setTotalZakat] = useState(0);
  const [info, setInfo] = useState('');
  const [color, setColor] = useState('text-red-500');

  const changeJenisPenghasilan = useCallback(() => {
    if (jenisPenghasilan === 'pertahun') {
      setNishab(hargaEmas * nishabGram);
    } else {
      setNishab((hargaEmas * nishabGram) / 12);
    }
  }, [hargaEmas, jenisPenghasilan]);

  const loader = useCallback(
    () => (
      <div className="animate-pulse bg-slate-300 rounded-md sm:col-span-2 flex w-full h-8" />
    ),
    []
  );

  const countTotalZakat = useCallback(() => {
    let totalCount = 0;
    totalCount = penghasilan + pendapatanLain;
    totalCount = totalCount - pengeluaran;
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
  }, [nishab, pendapatanLain, pengeluaran, penghasilan]);

  useEffect(() => {
    changeJenisPenghasilan('perbulan');
  }, [changeJenisPenghasilan]);

  useEffect(() => {
    countTotalZakat();
  }, [penghasilan, pendapatanLain, pengeluaran, countTotalZakat]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {loading && (
        <div className="px-4 py-1 sm:px-6">
          <small className="text-amber-700">
            Mohon Tunggu Sejenak. Sedang Memeriksa Harga Emas Hari ini.
          </small>
        </div>
      )}
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-start gap-6">
          <div className="flex item-center">
            <input
              defaultChecked={true}
              id="perbulan"
              name="jenis-penghasilan"
              type="radio"
              defaultValue="perbulan"
              onChange={(v) => setJenisPenghasilan(v.target.value)}
              className="h-4 w-4 border-gray-300 text-fkGreen focus:ring-fkGreen"
            />
            <label
              htmlFor="perbulan"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Perbulan
            </label>
          </div>
          <div className="flex item-center">
            <input
              id="pertahun"
              name="jenis-penghasilan"
              type="radio"
              defaultValue="pertahun"
              onChange={(v) => setJenisPenghasilan(v.target.value)}
              className="h-4 w-4 border-gray-300 text-fkGreen focus:ring-fkGreen"
            />
            <label
              htmlFor="pertahun"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Pertahun
            </label>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300">
        <div className="bg-gray-100 px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <label
            htmlFor="penghasilan"
            className="text-sm font-medium text-gray-800"
          >
            Penghasilan
          </label>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="penghasilan"
              name="penghasilan"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={penghasilan}
              onValueChange={(value, name) =>
                value === undefined
                  ? setPenghasilan(0)
                  : setPenghasilan(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <label
            htmlFor="pendapatan-lain"
            className="text-sm font-medium text-gray-800"
          >
            Pendapatan Lain
          </label>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="pendapatan-lain"
              name="pendapatan-lain"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={pendapatanLain}
              onValueChange={(value, name) =>
                value === undefined
                  ? setPendapatanLain(0)
                  : setPendapatanLain(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-gray-100 px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="flex flex-col">
            <label
              htmlFor="pengeluaran"
              className="text-sm font-medium text-gray-800"
            >
              Pengeluaran
            </label>
            <small className="text-xs text-gray-400">
              Kebutuhan pokok (termasuk hutang jatuh tempo)
            </small>
          </div>
          {loading ? (
            loader()
          ) : (
            <CurrencyInput
              id="pengeluaran"
              name="pengeluaran"
              prefix="Rp "
              defaultValue="0"
              decimalSeparator=","
              groupSeparator="."
              value={pengeluaran}
              onValueChange={(value, name) =>
                value === undefined
                  ? setPengeluaran(0)
                  : setPengeluaran(Number(value))
              }
              className="sm:col-span-2 flex w-full rounded-md form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
            />
          )}
        </div>
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
        <div className="bg-gray-100 px-4 py-4 items-start text-xs text-gray-800">
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
                Nishab {nishabGram} gram per{' '}
                {jenisPenghasilan === 'pertahun' ? 'Tahun' : 'Bulan'} Rp{' '}
                {numberToString(nishab)}
              </li>
              <li>Dianjurkan dipotong dari gaji bruto</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Penghasilan;
