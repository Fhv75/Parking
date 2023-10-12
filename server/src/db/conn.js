const { PrismaClient } = require("@prisma/client")

let prisma

function getDatabaseConnection() {
    if(!prisma) {
        prisma = new PrismaClient()
    }
    return prisma
}

module.exports = getDatabaseConnection