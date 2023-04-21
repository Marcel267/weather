import Toggle from "./components/Toggle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function App() {
  const getCatFact = () => {
    return axios.get(`https://catfact.ninja/fact`).then((res) => res.data);
  };

  const {
    status,
    error,
    data: catFact,
    isFetching,
  } = useQuery({
    queryKey: ["catFact"],
    queryFn: getCatFact,
    refetchOnWindowFocus: false, // default: true
  });
  useEffect(() => {
    console.log(catFact);
  }, [catFact]);

  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center bg-slate-200 text-2xl text-slate-900 dark:bg-slate-800 dark:text-slate-100">
        <section className="min-h-[20rem] w-80 rounded-xl bg-slate-100 p-5 shadow-md dark:bg-slate-700">
          {status == "loading" || isFetching ? "Loading..." : catFact?.fact}
          {status == "error" ? JSON.stringify(error) : null}
        </section>
        <Toggle />
      </main>
    </>
  );
}
