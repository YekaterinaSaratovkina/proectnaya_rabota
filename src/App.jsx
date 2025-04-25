import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./constans/Router";

const queryCline = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryCline}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </>
  )
}

export default App