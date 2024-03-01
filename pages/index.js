import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { GiGoldBar, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { MdOutlineStorefront } from "react-icons/md";
import Emas from "../components/Emas";
import Penghasilan from "../components/Penghasilan";
import Perdagangan from "../components/Perdagangan";
import Tabungan from "../components/Tabungan";

const fkBlue = "#1100db";
const fkGreen = "#648830";
const persenZakat = 0.025;
const nishabGram = 85;

// const Home = ({ hargaEmas }) => {
const Home = () => {
  const [page, setPage] = useState("penghasilan");
  const [hargaEmas, setHargaEmas] = useState(0);
  const [loadingCheckHargaEmas, setLoadingCheckHargaEmas] = useState(false);

  const checkHargaEmasHariIni = async () => {
    setLoadingCheckHargaEmas(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ title: 'React POST Request Example' })
    };
    const getHarga = await fetch("./api/get-harga-emas", requestOptions);
    const { harga } = await getHarga.json();
    setHargaEmas(harga);
    setLoadingCheckHargaEmas(false);
  };

  useEffect(() => {
    checkHargaEmasHariIni();
  }, []);

  const loader = useCallback(
    () => (
      <div className="animate-pulse bg-slate-300 rounded-md sm:col-span-2 flex w-full h-8" />
    ),
    []
  );

  const content = () => {
    let callPage;
    switch (page) {
      case "penghasilan":
        callPage = (
          <Penghasilan
            hargaEmas={hargaEmas}
            loading={loadingCheckHargaEmas}
            loader={loader}
            persenZakat={persenZakat}
            nishabGram={nishabGram}
          />
        );
        break;
      case "tabungan":
        callPage = (
          <Tabungan
            hargaEmas={hargaEmas}
            loading={loadingCheckHargaEmas}
            loader={loader}
            persenZakat={persenZakat}
            nishabGram={nishabGram}
          />
        );
        break;
      case "perdagangan":
        callPage = (
          <Perdagangan
            hargaEmas={hargaEmas}
            loading={loadingCheckHargaEmas}
            loader={loader}
            persenZakat={persenZakat}
            nishabGram={nishabGram}
          />
        );
        break;
      case "emas":
        callPage = (
          <Emas
            hargaEmas={hargaEmas}
            loading={loadingCheckHargaEmas}
            loader={loader}
            persenZakat={persenZakat}
            nishabGram={nishabGram}
          />
        );
        break;

      default:
        callPage = <Penghasilan />;
        break;
    }

    return callPage;
  };

  return (
    <div className="bg-white max-h-screen h-screen">
      <Head>
        <title>Kalkulator Zakat Fatwa Kehidupan</title>
        <meta
          name="description"
          content="Alat untuk membantu menghitung Zakat yang akan Anda keluarkan"
        />
        <link rel="icon" href="/icon.png" />
        <link rel="canonical" href="https://kalkulator-zakat-fk.vercel.app" />
      </Head>

      <main className="container mx-auto max-w-[520px] bg-white">
        <h1 className="text-2xl font-bold text-center py-6">
          Pilih Jenis Zakat
        </h1>
        <div className="flex bg-gray-100 justify-evenly gap-4 py-4">
          <div className="flex flex-col">
            <button
              onClick={() => setPage("penghasilan")}
              className="self-center"
            >
              <GiPayMoney
                color={page === "penghasilan" ? fkBlue : fkGreen}
                fontSize={32}
              />
            </button>
            <span
              className={
                "text-sm " + (page === "penghasilan" ? "text-fkBlue" : "")
              }
            >
              Penghasilan
            </span>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setPage("tabungan")}
              className="w-full justify-center flex"
            >
              <GiReceiveMoney
                color={page === "tabungan" ? fkBlue : fkGreen}
                fontSize={32}
              />
            </button>
            <span
              className={
                "text-sm " + (page === "tabungan" ? "text-fkBlue" : "")
              }
            >
              Tabungan
            </span>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setPage("perdagangan")}
              className="w-full justify-center flex"
            >
              <MdOutlineStorefront
                color={page === "perdagangan" ? fkBlue : fkGreen}
                fontSize={32}
              />
            </button>
            <span
              className={
                "text-sm " + (page === "perdagangan" ? "text-fkBlue" : "")
              }
            >
              Perdagangan
            </span>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setPage("emas")}
              className="w-full justify-center flex"
            >
              <GiGoldBar
                color={page === "emas" ? fkBlue : fkGreen}
                fontSize={32}
              />
            </button>
            <span
              className={"text-sm " + (page === "emas" ? "text-fkBlue" : "")}
            >
              Emas
            </span>
          </div>
        </div>
        <div className="bg-white">
          {loadingCheckHargaEmas && (
            <div className="px-4 py-1 sm:px-6">
              <small className="text-amber-700">
                Mohon Tunggu Sejenak. Sedang Memeriksa Harga Emas Hari ini.
              </small>
            </div>
          )}
        </div>
        <div>{content()}</div>
      </main>
    </div>
  );
};

export default Home;

/* export async function getServerSideProps(context) {
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   // body: JSON.stringify({ title: 'React POST Request Example' })
  // };
  // const getHarga = await fetch('/api/get-harga-emas', requestOptions);
  // const { harga } = await getHarga.json();

  const response = await fetch(
    `https://www.logammulia.com/id/harga-emas-hari-ini`
  );
  const htmlString = await response.text();
  const $ = await Cheerio.load(htmlString);
  let harga = 0;
  $(
    `body > section.section-padding.n-no-padding-top > div > div:nth-child(5) > div > div.right > div > div:nth-child(1) > span.value > span.text`
  ).each((i, d) => {
    harga = $(d).text();
    harga = harga.split(',')[0];
    harga = harga.replace('.', '');
    harga = parseInt(harga.replace('Rp', ''), 10);
  });

  return {
    props: {
      hargaEmas: harga,
    },
  };
} */
