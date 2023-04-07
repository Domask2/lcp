import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/antd.css";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/Print.css";
import "./styles/my_ant.css";
import "./styles/labels.css";
import "./styles/antPropsClassNameStyles.css";

// import { createRoot } from 'react-dom/client';
// const root = createRoot(document.getElementById("root") as HTMLDivElement);
// root.render(<App/>);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
