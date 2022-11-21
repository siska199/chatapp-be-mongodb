const { getContacts, getContact } = require("../controller/user");
const { addMessage, getMessages } = require("../controller/message");
const jwt = require("jsonwebtoken");

const EVENTS = {
  USER_IN_OUT: "USER_IN_OUT",
  LOAD_CONTACTS: "LOAD_CONTACTS",
  CONTACTS: "CONTACTS",
  LOAD_ACTIVE_CONTACT: "LOAD_ACTIVE_CONTACT",
  ACTIVE_CONTACT: "ACTIVE_CONTACT",
  LOAD_MESSAGES: "LOAD_MESSAGES",
  MESSAGES: "MESSAGES",
  SEND_MESSAGE: "SEND_MESSAGE",
  NEW_MESSAGE: "NEW_MESSAGE",
  RELOAD_CONTACTS: "RELOAD_CONTACTS",
};

const getIdSender = (token) => {
  const secret = process.env.SECRET_TOKEN;
  const { id } = jwt.verify(token, secret);
  return id;
};

const connectedUser = {};
const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", (socket) => {
    const token = socket.handshake?.auth?.token;
    const idSender = getIdSender(token);
    connectedUser[idSender] = socket.id;

    socket.on(EVENTS.USER_IN_OUT, async () => {
      socket.broadcast.emit(EVENTS.RELOAD_CONTACTS);
    });

    socket.on(EVENTS.LOAD_CONTACTS, async (form) => {
      const { idUser, query } = form;
      const contacts = await getContacts(idUser, query.toLowerCase());
      socket.emit(EVENTS.CONTACTS, contacts);
    });

    socket.on(EVENTS.LOAD_ACTIVE_CONTACT, async (idContact) => {
      const activeContactData = await getContact(idContact);
      socket.emit(EVENTS.ACTIVE_CONTACT, activeContactData);
    });

    socket.on(EVENTS.LOAD_MESSAGES, async ({ idReceiver, loadContacts }) => {
      //Tambah logic detect active contact////
      const token = socket.handshake?.auth?.token;
      const idSender = getIdSender(token);
      connectedUser[idSender] = socket.id;
      const dataMessages = await getMessages(idReceiver, idSender);
      io.to(socket.id)
        .to(connectedUser[idReceiver])
        .emit(EVENTS.MESSAGES, dataMessages);

      loadContacts &&
        io
          .to(socket.id)
          .to(connectedUser[idReceiver])
          .emit(EVENTS.RELOAD_CONTACTS);
    });

    socket.on(EVENTS.SEND_MESSAGE, async (form) => {
      await addMessage(form);
      socket.emit(EVENTS.NEW_MESSAGE, form.idReceiver);
      io.to(socket.id)
        .to(connectedUser[form.idReceiver])
        .emit(EVENTS.LOAD_CONTACTS, form.idUser);
    });

    socket.on("disconnect", () => {
      const token = socket.handshake?.auth?.token;
      const idSender = getIdSender(token);
      delete connectedUser[idSender];
    });
  });
};

module.exports = socketIo;
