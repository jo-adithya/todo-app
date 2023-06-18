import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
if (process.env.REACT_APP_CLIENT_ID) root.render(<App />);
else root.render(<App />);
