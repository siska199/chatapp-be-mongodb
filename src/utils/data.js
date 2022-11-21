const { uuid } = require("uuidv4");

const images = [
  "https://i.pinimg.com/564x/9a/e7/e5/9ae7e59a409f1b0364b3c84afcd31ba8.jpg",
  "https://i.pinimg.com/564x/07/e2/22/07e22290ad935d4bb6961d15767e2ea4.jpg",
  "https://i.pinimg.com/564x/8c/44/81/8c44811bd8395f413bee9dbc465214a3.jpg",
  "https://i.pinimg.com/564x/62/6c/b9/626cb982ee36f313bc4d4a2217f658c9.jpg",
  "https://i.pinimg.com/564x/d9/84/bd/d984bd2ba3455e28348b5485bac33b32.jpg",
  "https://i.pinimg.com/736x/94/50/00/945000e8ff2183b081d7c3e94add39d3.jpg",
  "https://i.pinimg.com/736x/00/2e/99/002e997bf1bf6570c44dbd2a6e0f5ea0.jpg",
  "https://i.pinimg.com/564x/90/cd/0d/90cd0db74f3f351466e3bcbcb5bc3812.jpg",
  "https://i.pinimg.com/564x/22/62/ee/2262ee28c894126a37f0f91a4c3d361d.jpg",
  "https://i.pinimg.com/564x/51/1a/e1/511ae188323c7de65b27360f59e1ff32.jpg",
];

const users = [...Array(10)].map((_, i) => ({
  id: i,
  image: images[i],
  username: `username${i}`,
  fullname: `fullname${i}`,
  password: `${i}`,
  info: `info user ${i}`,
  status: "online",
  newMessages: [], //-->{idOtherUser than send the message}
}));

const messages = [];

const messages12 = [...Array(10)].map((_, i) => ({
  id: uuid(),
  idReceiver: i % 2 == 0 ? 2 : 1,
  idSender: i % 2 != 0 ? 2 : 1,
  idGroup: null,
  text: `Printing and typesetting industry ${i % 2 ? 1 : 2}`,
  image: null,
  voice: null,
}));

const messages13 = [...Array(10)].map((_, i) => ({
  id: uuid(),
  idReceiver: i % 2 == 0 ? 3 : 1,
  idSender: i % 2 != 0 ? 3 : 1,
  idGroup: null,
  text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry ${
    i % 2 ? 1 : 3
  }`,
  image: null,
  voice: null,
}));

messages.push(...messages12, ...messages13);

module.exports = { users, messages };
