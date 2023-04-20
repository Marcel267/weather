import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Toggle() {
  return (
    <button className="absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-2 text-slate-900 shadow-md hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600">
      <SunIcon className="h-7 w-7" />
      {/* <MoonIcon className="h-6 w-6" /> */}
    </button>
  );
}
