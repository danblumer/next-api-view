import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Mail from "@material-ui/icons/MailOutline";
import Drafts from "@material-ui/icons/Drafts";
import Assignment from "@material-ui/icons/Assignment";
import DialogComponent from "../components/dialog";
import { makeStyles } from "@material-ui/core/styles";
import { loadAllMessages, updateMessageStatus } from "../services/apiRequest";
import { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { parseTimeStampToLocalDate } from "../util/dataParse";
const useStyles = makeStyles((theme) => ({
  messageIcon: {
    color: "green",
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
  messageDetail: {
    color: "#686363",
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
  detailContainer: {
    display: "flex",
    width: "500px",
    height: "500px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "#908989 1px 1px 4px",
  },
}));

export default function Messages({ messages }) {
  const [messageList, setMessageList] = useState(null);
  const [isMessageDetailOpen, setIsMessageDetailOpen] = useState(false);
  const [messageDetail, setMessageDetail] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    if (!messages) {
      load();
    } else {
      setMessageList(messages);
    }
  }, []);
  const load = async () => {
    let messages = await loadAllMessages();
    setMessageList(messages);
  };
  const openMessageDetail = async (id) => {
    let detail = messageList.find((x) => x.id == id);

    if (detail) {
      setMessageDetail(detail);
      setIsMessageDetailOpen(true);
    }
  };

  const updateMessageReaded = async (id, read) => {
    await updateMessageStatus(id, read);
    load();
  };
  const handleMessageDetailClose = async () => {
    await updateMessageReaded(messageDetail.id, true);
    setMessageDetail(null);
    setIsMessageDetailOpen(false);
  };

  return (
    <>
      <DialogComponent open={isMessageDetailOpen} handleClose={handleMessageDetailClose} dialogTitle="Message Detail">
        <div className={classes.detailContainer}>{messageDetail?.detail}</div>
      </DialogComponent>
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
                <TableCell align="right" style={{ width: "100px" }}>
                  {message.read && (
                    <Tooltip title="Click to mark as Read">
                      <Drafts
                        className={classes.messageIcon}
                        style={{ color: "#908989" }}
                        onClick={() => updateMessageReaded(message.id, false)}
                      />
                    </Tooltip>
                  )}
                  {message.read == false && (
                    <Tooltip title="Click to mark as Unread">
                      <Mail className={classes.messageIcon} onClick={() => updateMessageReaded(message.id, true)} />
                    </Tooltip>
                  )}
                  <Tooltip title="Click to see the message detail">
                    <Assignment className={classes.messageDetail} onClick={() => openMessageDetail(message.id)} />
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.id}
                </TableCell>
                <TableCell align="center">{parseTimeStampToLocalDate(message.timestamp)}</TableCell>
                <TableCell align="center">{message.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
Messages.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return [];
  }

  return { messages: await loadAllMessages() };
};
