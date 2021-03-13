import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function messageId(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const user = await prisma.messages.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json(user);
  } else if (req.method === "PUT") {
    let updated = await prisma.messages.update({
      where: {
        id: id,
      },
      data: { read: req.body.read },
    });
    return res.status(200).json(updated);
  } else {
    return res.status(405).json({ message: "Method now allowed" });
  }
}
