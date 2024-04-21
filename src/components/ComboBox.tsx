import React from "react";
import { ComboBox } from "@refinitiv-ui/elements/combo-box";
import { createComponent } from "@lit/react";

export default createComponent({
  react: React,
  tagName: "ef-combo-box",
  elementClass: ComboBox,
  events: {
    onChange: "value-changed",
  },
});
