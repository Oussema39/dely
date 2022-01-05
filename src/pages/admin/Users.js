import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { deleteUser, getAllUsers } from "../../api/UserApi";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogCopy from "../../components/DialogCopy";
import { Backdrop, Button, CircularProgress } from "@mui/material";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//   createData(
//     0,
//     "16 Mar, 2019",
//     "Elvis Presley",
//     "Tupelo, MS",
//     "VISA ⠀•••• 3719",
//     312.44
//   ),
//   createData(
//     1,
//     "16 Mar, 2019",
//     "Paul McCartney",
//     "London, UK",
//     "VISA ⠀•••• 2574",
//     866.99
//   ),
//   createData(
//     2,
//     "16 Mar, 2019",
//     "Tom Scholz",
//     "Boston, MA",
//     "MC ⠀•••• 1253",
//     100.81
//   ),
//   createData(
//     3,
//     "16 Mar, 2019",
//     "Michael Jackson",
//     "Gary, IN",
//     "AMEX ⠀•••• 2000",
//     654.39
//   ),
//   createData(
//     4,
//     "15 Mar, 2019",
//     "Bruce Springsteen",
//     "Long Branch, NJ",
//     "VISA ⠀•••• 5919",
//     212.79
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Users() {
  const [rows, setRows] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const abortController = new AbortController();

  const handleDialogClose = () => {
    setOpenDialog(false);
    setUserToDelete(0);
  };

  const handleCloseLoading = () => {
    setLoading(false);
    setUserToDelete(0);
  };

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      deleteUser(userToDelete);
      setRows((prv) => prv.filter((row) => row.id !== userToDelete));
      setUserToDelete(0);
      setLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    (async () => {
      const users = await (await getAllUsers(abortController.signal)).data;
      const _rows =
        users &&
        users?.map(({ id, firstName, lastName, email, role }) => ({
          id,
          fullName: `${firstName} ${lastName}`,
          email,
          role,
        }));
      _rows && setRows(_rows);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <Title>All Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Fullname</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Role</b>
            </TableCell>
            <TableCell align="right">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ id, fullName, email, role }) => (
            <TableRow key={email}>
              <TableCell>{fullName}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    setOpenDialog(true);
                    setUserToDelete(id);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogCopy
        open={openDialog}
        handleClose={handleDialogClose}
        children={{
          title: "Are you sure ?",
          actions: [
            <Button onClick={handleDialogClose} color="error">
              Cancel
            </Button>,
            <Button
              onClick={() => {
                setOpenDialog(false);
                handleDelete();
              }}
              variant="outlined"
            >
              Confirm
            </Button>,
          ],
        }}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
