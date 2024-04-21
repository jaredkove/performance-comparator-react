import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "@refinitiv-ui/elements/button";
import "@refinitiv-ui/elements/sidebar-layout";
import "@refinitiv-ui/elements/tab-bar";
import "@refinitiv-ui/elements/tab";
import "@refinitiv-ui/elements/panel";
import "@refinitiv-ui/elements/appstate-bar";
import "@refinitiv-ui/elements/text-field";
import "@refinitiv-ui/elements/email-field";
import "@refinitiv-ui/elements/slider";
import "@refinitiv-ui/elements/radio-button";
import "@refinitiv-ui/elements/datetime-picker";
import "@refinitiv-ui/elements/tornado-chart";
import "@refinitiv-ui/elements/combo-box";
import "@refinitiv-ui/elements/toggle";
import "@refinitiv-ui/elements/dialog";


const loadTheme = () => {
  return new Promise((resolve) => {
    const theme = sessionStorage.getItem("elf-theme") || "dark";
    import(`./themes/${theme}.js`);
    resolve(theme);
  });
};

loadTheme().then((theme) => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <StrictMode>
      <App theme={theme} />
    </StrictMode>,
  );
});
