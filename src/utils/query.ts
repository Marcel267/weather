export const getWeather = async (
  location: string,
  unit: "metric" | "imperial"
) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
    import.meta.env.VITE_OPENWEATHER_KEY
  }&units=${unit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
