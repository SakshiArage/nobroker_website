import { useNavigate } from 'react-router-dom';

export default function Brand() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      aria-label="NoBroker home"
      className="inline-flex cursor-pointer flex-col border-0 bg-transparent p-0 text-left leading-none"
    >
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-[#E5342B]">no</span>
        <span className="text-[#8B96A8]">broker</span>
      </span>
      <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-[#5C6879]">
        ZERO BROKERAGE
      </span>
    </button>
  );
}