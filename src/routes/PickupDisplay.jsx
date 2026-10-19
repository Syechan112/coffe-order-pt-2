import usePickupDisplay from '../hooks/usePickupDisplay';
import DisplayHeader from '../components/pickup/DisplayHeader';
import StatusSummary from '../components/pickup/StatusSummary';
import DisplayColumn from '../components/pickup/DisplayColumn';
import DisplayFooter from '../components/pickup/DisplayFooter';

export default function PickupDisplay() {
  const { clock, isFullscreen, preparing, ready, toggleFullscreen } =
    usePickupDisplay();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#faf9f6] px-4 py-5 text-stone-900 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1600px]">
        <DisplayHeader
          clock={clock}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />

        <StatusSummary
          preparingCount={preparing.length}
          readyCount={ready.length}
        />

        <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
          <DisplayColumn
            title="Sedang diproses"
            subtitle="Pesanan sedang kami siapkan"
            orders={preparing}
            tone="processing"
          />

          <DisplayColumn
            title="Siap diambil"
            subtitle="Silakan ambil pesanan di counter"
            orders={ready}
            tone="ready"
          />
        </div>

        <DisplayFooter />
      </div>
    </main>
  );
}
