import Toggle from "./components/Toggle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import { AsyncPaginate } from 'react-select-async-paginate';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
}

// interface Coordinates {
//   lat: number;
//   lon: number;
// }

export default function App() {
  // const [formData, setFormData] = useState({city: ""});
  const [city, setCity] = useState<string>("Anspach");

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(JSON.parse(storedCity));
    }
  }, []);

  const {
    status,
    error,
    data: weatherData,
    isFetching,
    refetch,
    isError
  } = useQuery<WeatherData>({
    queryKey: ["weatherData"],
    queryFn: () => {
      return axios
        .get(
          // `http://api.openweathermap.org/geo/1.0/direct?q=Anspach,61267,de&appid=${
          //   import.meta.env.VITE_OPENWEATHER_KEY
          // }`
          // `https://api.openweathermap.org/data/2.5/weather?lat=50.2965&lon=8.5154&appid=${import.meta.env.VITE_OPENWEATHER_KEY
          // }&units=metric`
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_KEY}&units=metric`
          // `https://api.open-meteo.com/v1/forecast?latitude=50.30&longitude=8.51&hourly=temperature_2m`
        )
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false, // default: true
    enabled: true, // default: true
  });
  console.log(weatherData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (city.length !== 0) {
      event.preventDefault();
      localStorage.setItem("city", JSON.stringify(city));
      console.log(city);
    }
    refetch();

    // console.log("data refetched");
  };

  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center bg-slate-200 text-2xl text-slate-900 dark:bg-slate-800 dark:text-slate-100">
        <Toggle />
        <section className="min-h-[25rem] w-80 rounded-2xl bg-slate-100 p-5 shadow-md dark:bg-slate-700">
          <form
            onSubmit={handleSubmit}
          //  autoComplete="off"
          >
            <input
              // value={formData.city}
              value={city}
              onChange={handleChange}
              name="city"
              type="text"
              className="mb-6 w-full rounded-lg border-none bg-slate-200 p-3 text-lg shadow-sm dark:bg-slate-800"
            />
            {/* <AsyncPaginate
              value={value}
              loadOptions={loadOptions}
              onChange={setValue}
            /> */}

          </form>
          <div className="flex flex-col items-center gap-8">
            {isError ? 'Error' : ''}
            <span>
              {status !== "loading" && !isFetching
                ? `${weatherData?.name}, ${weatherData?.sys?.country}`
                : ""}
            </span>
            <span className="text-4xl font-bold">
              {status == "loading" || isFetching
                ? "Loading..."
                : `${weatherData?.main?.temp} °C`}
            </span>
            <span>
              {status !== "loading" && !isFetching
                ? weatherData?.weather[0]?.main
                : ""}
              {/* {isError && 'Error'} */}
            </span>
          </div>
          {status == "error" ? JSON.stringify(error) : null}
        </section>
      </main>
    </>
  );
}
