"use client";

export function ImportNotice() {
    return (
        <div className="space-y-4 my-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
                You need to look up the <span className="font-bold text-slate-900 dark:text-slate-200">Import Regulations</span> of your country for this vehicle.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm">
                An international database provides the <span className="font-bold text-slate-900 dark:text-slate-200">manufacturing year</span>. Tokyo International Japan may not be liable for any issues or costs caused by this information.
            </p>
        </div>
    );
}
