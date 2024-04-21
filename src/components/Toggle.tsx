import React from "react";
import { Toggle } from "@refinitiv-ui/elements/toggle";
import { createComponent } from "@lit/react";

export default createComponent({
  react: React,
  tagName: "ef-toggle",
  elementClass: Toggle,
  events: {
    onChange: "checked-changed",
  },
});
