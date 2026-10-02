import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_STEPS } from '../context/AppContext';

export const DemoScenarioStepper: React.FC = () => {
  const {
    demoStep,
    isDemoActive,
    isDemoPlaying,
    startDemoScenario,
    nextDemoStep,
    prevDemoStep,
    jumpToDemoStep,
    toggleDemoPlay,
    resetDemoScenario,
    currentDemoInfo,
  } = useApp();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!isDemoActive) {
    return (
      <div id="demo-banner-idle" className="bg-emerald-900 border border-emerald-700/60 rounded-2xl p-4 text-white shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-800/80 text-emerald-300 shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                  HACKATHON DEMO MODE
                </span>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  18 Complete Stages
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                Simulate the Complete Farm &rarr; Truck &rarr; AI Reroute &rarr; Buyer Rescue Story
              </h3>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Experience farmer dispatch, live moving truck, highway traffic, 33°C sensor spike, AI FreshRoute recommendation, crop rescue divert, buyer QR scan & acceptance!
              </p>
            </div>
          </div>

          <button
            id="start-demo-btn-main"
            onClick={startDemoScenario}
            className="self-start sm:self-auto bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-700" />
            <span>START 18-STAGE DEMO</span>
          </button>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((demoStep / 18) * 100);

  return (
    <div id="demo-stepper-active" className="bg-slate-900 border-2 border-emerald-500 rounded-2xl p-4 text-white shadow-xl mb-6 relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
            STAGE {demoStep} OF 18
          </span>
          <span className="text-xs font-semibold text-emerald-300">
            Active Role: <strong className="text-white uppercase">{currentDemoInfo?.role}</strong>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevDemoStep}
            disabled={demoStep <= 1}
            title="Previous Stage"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={toggleDemoPlay}
            title={isDemoPlaying ? 'Pause Auto-Play' : 'Auto-Play Stages'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
          >
            {isDemoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={nextDemoStep}
            disabled={demoStep >= 18}
            title="Next Stage"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={resetDemoScenario}
            title="Reset to Start"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Expand' : 'Minimize'}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step Information (Collapsible) */}
      {!isMinimized && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 border-t border-slate-800">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{currentDemoInfo?.title}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {currentDemoInfo?.subtitle}
            </p>
            <p className="text-[11px] text-emerald-400 mt-0.5">
              &bull; {currentDemoInfo?.systemActionDescription}
            </p>
          </div>

          {/* Jump to Stage dropdown */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Jump:</span>
            <select
              value={demoStep}
              onChange={(e) => jumpToDemoStep(Number(e.target.value))}
              className="bg-slate-800 text-white text-xs rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            >
              {DEMO_STEPS.map((s) => (
                <option key={s.step} value={s.step}>
                  {s.step}. {s.title.split(':')[1]?.trim() || s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
