import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export default function dialogComponent({ open, handleClose, dialogTitle, ...props }) {
  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">{dialogTitle}</DialogTitle>
      {props.children}
    </Dialog>
  );
}
