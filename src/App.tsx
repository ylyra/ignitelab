import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { client } from "./lib/apollo";
import { Router } from "./Router";

import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ApolloProvider>
  );
}

export default App;
