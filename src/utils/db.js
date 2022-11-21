const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "error", "info", "warn"],
});

module.exports = prisma;
