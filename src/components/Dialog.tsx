import React from "react";
import { Dialog } from "@refinitiv-ui/elements/dialog";
import { createComponent } from "@lit/react";

export default createComponent({
  react: React,
  tagName: "ef-dialog",
  elementClass: Dialog,
  events: {
    onConfirm: "confirm",
    onCancel: "cancel",
  },
});
