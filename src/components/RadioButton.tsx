import React from "react";
import { RadioButton } from "@refinitiv-ui/elements/radio-button";
import { createComponent } from "@lit/react";

export default createComponent({
  react: React,
  tagName: "ef-radio-button",
  elementClass: RadioButton,
  events: {
    onChange: "checked-changed",
  },
});
