import React from 'react';
import { TrendingUp, Minus, Compass } from 'lucide-react';
import { MarketSignal } from '../../types';

export const MarketSignalBadge: React.FC<{ signal: MarketSignal; showDetails?: boolean }> = ({
  signal,
  showDetails = false
}) => {
  const isUp = signal.direction === 'up';

  return (
    <div className="flex flex-col gap-1">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50/60 border-amber-200 text-amber-900 w-fit">
        {isUp ? (
          <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
        ) : (
          <Minus className="w-3.5 h-3.5 text-slate-500" />
        )}
        <span>{signal.trend}</span>
      </div>
      {showDetails && (
        <div className="text-[11px] text-brand-muted flex items-center gap-1 mt-0.5">
          <Compass className="w-3 h-3 text-slate-400" />
          <span>{signal.regional_demand}</span>
        </div>
      )}
    </div>
  );
};
