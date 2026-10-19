import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
      <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-400">
        <Coffee size={32} strokeWidth={1.4} />
      </div>

      <div className="mb-2 flex items-baseline justify-center gap-3">
        <span className="text-[5.5rem] font-extrabold tracking-tight text-stone-900 sm:text-[6rem]">
          404
        </span>
        <span className="text-xl font-medium text-stone-400">Page Not Found</span>
      </div>

      <p className="mb-10 max-w-md text-sm leading-6 text-stone-500">
        Halaman yang kamu cari tidak tersedia. Mungkin sudah dipindah, atau linknya
        salah ketik saja. Kembali ke Beranda atau Menu?
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          <Home size={17} />
          Ke Menu
        </Link>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
        >
          <ArrowLeft size={17} />
          Kembali
        </button>
      </div>
    </section>
  );
}
