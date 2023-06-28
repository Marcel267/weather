import { Toggle } from "./components/Toggle";
import { getWeather } from "./utils/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Image } from "./components/Image";
// import { AsyncPaginate } from "react-select-async-paginate";

// external imports
import { Weather } from "./types/globals";

type Inputs = {
  location: string;
};

export const App = () => {
  const [location, setLocation] = useState<string>();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [iconSnippet, setIconSnippet] = useState("");
  const iconURL = `https://openweathermap.org/img/wn//${iconSnippet}@2x.png`;

  // react-hook-form
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setFocus,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLocation(data.location);
    reset();
  };

  // focus input
  useEffect(() => {
    setFocus("location");
  }, [setFocus]);

  // react-query
  const weatherQuery = useQuery<Weather>(
    ["weather", location, unit],
    () => getWeather(String(location), unit),
    {
      enabled: !!location,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data.cod === "404") return toast.error("Location not found");
        setIconSnippet(data.weather[0].icon);
        toast.success("Location found successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );

  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center bg-slate-200 text-2xl text-slate-900 dark:bg-slate-800 dark:text-slate-100">
        <Toggle />
        <section className="min-h-[25rem] w-80 rounded-2xl bg-slate-100 p-5 shadow-md dark:bg-slate-700">
          <form
            onSubmit={handleSubmit(onSubmit)}
            //  autoComplete="off"
          >
            <input
              // value={formData.city}
              id="location"
              type="text"
              className="w-full rounded-lg border-none bg-slate-200 p-3 text-lg shadow-sm dark:bg-slate-800"
              placeholder="Search location..."
              {...register("location", { required: true })}
            />
            {/* <div className="mb-6">
              <AsyncPaginate
              placeholder="Search city"
              debounceTimeout={500}
              value={search}
              onChange={handleChange}
            />
            </div> */}
            {errors.location ? (
              <span className="flex justify-center text-red-500">
                Location is required
              </span>
            ) : null}
          </form>
          {weatherQuery.isError || weatherQuery.data?.cod === "404" ? (
            <div className="mt-5 flex-1 text-center">
              <h1 className="text-3xl font-bold">Location not found</h1>
            </div>
          ) : !weatherQuery.data ? (
            <div className="mt-5 flex-1 text-center">
              <h1 className="text-3xl font-bold">Search for a location</h1>
            </div>
          ) : (
            <div className="mt-5 flex w-full flex-1 flex-col items-center justify-center gap-1 text-center">
              <h1 className="text-3xl font-bold">{weatherQuery.data.name}</h1>
              <h2 className="text-xl font-bold">
                {weatherQuery.data.weather[0].description}
              </h2>
              <Image
                src={iconURL}
                width={100}
                height={100}
                alt="Weather icon"
              />
              <div className="grid flex-1 gap-2.5 text-center">
                <h2 className="text-3xl font-bold">
                  {Math.round(weatherQuery.data.main.temp)}
                </h2>
                <h3 className="text-xl font-bold">
                  Feels like {Math.round(weatherQuery.data.main.feels_like)}°
                </h3>
                <div className="flex w-full flex-1 items-center justify-center gap-2 text-center">
                  <button
                    aria-label="change unit to metric"
                    className={`rounded-md bg-transparent px-4 py-2 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      unit === "metric"
                        ? "border-2 border-blue-500 "
                        : "border border-gray-400 "
                    }`}
                    onClick={() => setUnit("metric")}
                  >
                    °C
                  </button>
                  <button
                    aria-label="change unit to imperial"
                    className={`rounded-md bg-transparent px-4 py-2 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      unit === "imperial"
                        ? "border-2 border-blue-500 "
                        : "border border-gray-400 "
                    }`}
                    onClick={() => setUnit("imperial")}
                  >
                    °F
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
