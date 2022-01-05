import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DialogCopy = ({ handleClose, open, children }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{children.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children.contentText}</DialogContentText>
        {children.restContent}
      </DialogContent>
      <DialogActions>
        {children.actions?.map((action, index) => (
          <React.Fragment key={index}>{action}</React.Fragment>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default DialogCopy;
