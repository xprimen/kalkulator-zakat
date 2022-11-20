import React, { useCallback, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { formatCurrency, numberToString } from '../helpers';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Penghasilan = ({ harga }) => {
  const persenZakat = 0.025;
  const nishabGram = 85;
  const [penghasilan, setPenghasilan] = useState(0);
  const [pendapatanLain, setPendapatanLain] = useState(0);
  const [jenisPenghasilan, setJenisPenghasilan] = useState('perbulan');
  const [pengeluaran, setPengeluaran] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [nishab, setNishab] = useState((harga * nishabGram) / 12);
  const [totalZakat, setTotalZakat] = useState(0);
  const [info, setInfo] = useState('');
  const [color, setColor] = useState('text-red-500');

  const changeJenisPenghasilan = (val) => {
    if (val === 'pertahun') {
      setNishab(harga * nishabGram);
    } else {
      setNishab((harga * nishabGram) / 12);
    }
    setJenisPenghasilan(val);
  };

  const countTotalZakat = useCallback(() => {
    if (String(penghasilan).length > 1) {
      let totalCount = 0;
      totalCount = penghasilan + pendapatanLain;
      totalCount = totalCount - pengeluaran;
      // console.log('totalCount :', totalCount);
      let totalSetelahPersen = totalCount * persenZakat;
      // console.log('totalSetelahPersen :', totalSetelahPersen);
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
      }
    }
  }, [nishab, pendapatanLain, pengeluaran, penghasilan]);

  useEffect(() => {
    countTotalZakat();
  }, [penghasilan, pendapatanLain, pengeluaran, countTotalZakat]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        {/* <div className="mt-1 max-w-2xl text-sm text-gray-800">Perbulan</div> */}
        <div className="flex justify-start gap-6">
          <div className="flex item-center">
            <input
              defaultChecked={true}
              id="perbulan"
              name="jenis-penghasilan"
              type="radio"
              defaultValue="perbulan"
              onChange={(v) => changeJenisPenghasilan(v.target.value)}
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
              onChange={(v) => changeJenisPenghasilan(v.target.value)}
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
          <CurrencyInput
            id="penghasilan"
            name="penghasilan"
            prefix="Rp "
            defaultValue="0"
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value, name) => setPenghasilan(Number(value))}
            className="sm:col-span-2 flex w-full rounded-sm form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
          />
        </div>
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <label
            htmlFor="pendapatan-lain"
            className="text-sm font-medium text-gray-800"
          >
            Pendapatan Lain
          </label>
          <CurrencyInput
            id="pendapatan-lain"
            name="pendapatan-lain"
            prefix="Rp "
            defaultValue="0"
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value, name) => setPendapatanLain(Number(value))}
            className="sm:col-span-2 flex w-full rounded-sm form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
          />
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
          <CurrencyInput
            id="pengeluaran"
            name="pengeluaran"
            prefix="Rp "
            defaultValue="0"
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value, name) => setPengeluaran(Number(value))}
            className="sm:col-span-2 flex w-full rounded-sm form-input py-1 border-gray-200 focus:border-gray-300 focus:ring-gray-200 text-sm text-gray-800"
          />
        </div>
        <div className="bg-white px-4 py-4 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <label
            htmlFor="pendapatan-lain"
            className="text-sm font-bold text-gray-800"
          >
            Total
          </label>
          <h1 className="font-medium text-gray-800">
            Rp {numberToString(totalZakat)}
          </h1>
        </div>
        <div className="bg-gray-100 px-4 py-4 items-start text-xs text-gray-800">
          <h1 className={'text-lg font-medium mb-2 ' + color}>{info}</h1>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowNote(!showNote)}
          >
            <h1>Note:</h1>
            {showNote ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {showNote && (
            <ul className="px-4 mt-2 list-circle sm:col-span-2 text-gray-500">
              <li>
                Perhitungan zakat diupdate otomatis berdasarkan update harga
                emas
              </li>
              <li>
                Harga emas per gram saat ini Rp {numberToString(harga)}{' '}
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
