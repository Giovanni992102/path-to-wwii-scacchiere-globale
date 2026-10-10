import React, { useEffect, useState } from 'react';

interface ToastNoticeProps {
  date: string;
  title: string;
  triggerKey: number | string;
}

export const ToastNotice: React.FC<ToastNoticeProps> = ({
  date,
  title,
  triggerKey,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (!show) return null;

  return (
    <div className="tactical-panel absolute top-20 left-1/2 -translate-x-1/2 z-40 px-6 py-2 shadow-2xl text-center pointer-events-none animate-in fade-in slide-in-from-top-3 duration-300">
      <div className="text-[11px] tracking-[4px] text-[#c9a557] font-semibold">
        ✦ {date} ✦
      </div>
      <div className="font-oswald text-lg sm:text-xl font-bold tracking-[2.5px] text-[#f0e6c8] uppercase leading-tight mt-0.5">
        {title}
      </div>
    </div>
  );
};
