import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Mail from "@material-ui/icons/MailOutline";
import Drafts from "@material-ui/icons/Drafts";
import { makeStyles } from "@material-ui/core/styles";
import { loadAllMessages, updateMessageStatus } from "../services/apiRequest";
import { useState, useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  messageUnreadIcon: {
    color: "green",
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
}));

export default function Users({ messages }) {
  const [messageList, setMessageList] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    setMessageList(messages);
  }, []);
  const load = async () => {
    let users = await loadAllMessages();
    setMessageList(users);
  };

  const updateMessageReaded = async (id, read) => {
    let user = await updateMessageStatus(id, read);
    load();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Id</TableCell>
              <TableCell align="center">DateTime</TableCell>
              <TableCell align="center">Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messageList?.map((message) => (
              <TableRow key={message.id}>
                <TableCell align="right" style={{ width: "20px" }}>
                  {message.read && (
                    <Drafts
                      className={classes.messageUnreadIcon}
                      onClick={() => updateMessageReaded(message.id, false)}
                    />
                  )}
                  {message.read == false && (
                    <Mail className={classes.messageUnreadIcon} onClick={() => updateMessageReaded(message.id, true)} />
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.id}
                </TableCell>
                <TableCell align="center">{message.timestamp}</TableCell>
                <TableCell align="center">{message.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
Users.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return [];
  }

  return { messages: await loadAllMessages() };
};
