import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    reply.send(user)
  }
}

export { CreateUserController };
