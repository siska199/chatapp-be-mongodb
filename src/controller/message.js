const { message } = require("../utils/db");

exports.addMessage = async (data) => {
  try {
    await message.create({
      data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getMessages = async (idReceiver, idSender) => {
  try {
    await message.update({
      where: {
        receiverId: idSender,
        senderId: idReceiver,
      },
      data: {
        read: 1,
      },
    });

    const messages = await message.findMany({
      where: {
        idSender: {
          [Op.or]: [idSender, idReceiver],
        },
        idReceiver: {
          [Op.or]: [idReceiver, idSender],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getMessagesOffline = async (idReceiver, idSender) => {
  const messages = await messagge.findMany({
    where: {
      senderId: idSender,
      receiverId: idReceiver,
      read: 0,
    },
  });
  return messages.length;
};
