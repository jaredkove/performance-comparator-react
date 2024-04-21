import React from "react";
import { TextField } from "@refinitiv-ui/elements/text-field";
import { createComponent } from "@lit/react";

export default createComponent({
  react: React,
  tagName: "ef-text-field",
  elementClass: TextField,
  events: {
    onChange: "value-changed",
  },
});
