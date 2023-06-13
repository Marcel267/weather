import Toggle from "./components/Toggle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface WeatherData {
  name?: string;
  sys?: {
    country?: string;
  };
  main?: {
    temp?: number;
  };
  weather?: {
    main?: string;
  }[];
}

interface Coordinates {
  lat: number;
  lon: number;
}

export default function App() {
  // const [formData, setFormData] = useState({city: ""});
  const [search, setSearch] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    const storedCoordinates = localStorage.getItem("coordinates");
    if (storedCoordinates) {
      setCoordinates(JSON.parse(storedCoordinates));
    }
  }, []);

  const {
    status,
    error,
    data: weatherData,
    isFetching,
    refetch,
  } = useQuery<WeatherData>({
    queryKey: ["weatherData"],
    queryFn: () => {
      return axios
        .get(
          // `http://api.openweathermap.org/geo/1.0/direct?q=Anspach,61267,de&appid=${
          //   import.meta.env.VITE_OPENWEATHER_KEY
          // }`
          `https://api.openweathermap.org/data/2.5/weather?lat=50.296509&lon=8.515360&appid=${
            import.meta.env.VITE_OPENWEATHER_KEY
          }&units=metric`
          // `https://api.open-meteo.com/v1/forecast?latitude=50.30&longitude=8.51&hourly=temperature_2m`
        )
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false, // default: true
    enabled: false, // default: true
  });
  // console.log(weatherData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    // setFormData((prevFormData) => {
    //   return {
    //     ...prevFormData,
    //     [name]: value,
    //   };
    // });
    setSearch(event.target.value);
    // console.log(city);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("coordinates", JSON.stringify(coordinates));

    // refetch();
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
            {/* <input
              // value={formData.city}
              value={search}
              onChange={handleChange}
              name="city"
              type="text"
              className="mb-6 w-full rounded-lg border-none bg-slate-200 p-3 text-lg shadow-sm dark:bg-slate-800"
            /> */}
          </form>
          <div className="flex flex-col items-center gap-8">
            <span className="">
              {status !== "loading" && !isFetching
                ? `${weatherData?.name}, ${weatherData?.sys?.country}`
                : ""}
            </span>
            <span className="text-4xl font-bold">
              {status == "loading" || isFetching
                ? "Loading..."
                : `${weatherData?.main?.temp} °C`}
            </span>
            <span className="">
              {status !== "loading" && !isFetching
                ? weatherData?.weather[0]?.main
                : ""}
            </span>
          </div>
          {status == "error" ? JSON.stringify(error) : null}
        </section>
      </main>
    </>
  );
}
