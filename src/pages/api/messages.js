import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function users(req, res) {
  if (req.method === "POST") {
    let newUser = await prisma.messages.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json(newUser);
  } else if (req.method === "GET") {
    const allUsers = await prisma.messages.findMany();
    res.status(200).json(allUsers);
  } else {
    res.status(405).json({ message: "Method now allowed" });
  }
}
