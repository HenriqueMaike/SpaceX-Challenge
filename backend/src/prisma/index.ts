const { PrismaClient } = require('@prisma/client')

// instancia do prisma para poder ser utilizado mais facimente chamando somente prismaClient em outras parte do codigo
const prismaClient = new PrismaClient();

export default prismaClient;