import IconHeartPulse from './IconHeartPulse';

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="flex items-center gap-4">
          <div className="w-36 h-36 rounded-lg bg-white/10 flex items-center justify-center">
            {/* Placeholder lung illustration - replace with SVG/image */}
            <IconHeartPulse />
          </div>

          <div>
            <h2 className="text-xl font-semibold">William</h2>
            <p className="text-slate-600">Next: Monday 10:00 - 11:30</p>
            <div className="mt-3 flex gap-3">
              <div className="px-3 py-2 rounded-md bg-brand text-white">BP: 120/80</div>
              <div className="px-3 py-2 rounded-md bg-slate-100">Sugar: 98 mg/dL</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-slate-500">Medication</div>
        <div className="mt-3">
          <div className="text-2xl font-semibold">25%</div>
          <div className="text-sm text-slate-500">Paracetamol usage</div>
        </div>
      </div>
    </div>
  );
}