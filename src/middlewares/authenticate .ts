import { FastifyReply, FastifyRequest } from "fastify";
import jtw from "jsonwebtoken";

const secret = process.env.SECRET || "default secret";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error("Token não fornecido");
  }
  const token = authHeader?.split(" ")[1];
  const decoded = jtw.verify(token, secret);
}
