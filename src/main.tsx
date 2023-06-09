import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./input.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastWrapper } from "./components/ToastWrapper.tsx";

const queryClient = new QueryClient();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false, // default: true
//     },
//   },
// });
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    <ToastWrapper />
  </QueryClientProvider>
  // </React.StrictMode>
);
