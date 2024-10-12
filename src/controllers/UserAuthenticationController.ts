import { FastifyRequest, FastifyReply } from "fastify";
import { UserAuthenticationService } from "../services/UserAuthenticationService";

class UserAuthenticationController{
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as {
          email: string;
          password: string;
        };
    
        const userAuthentication = new UserAuthenticationService();
        const result = await userAuthentication.execute({ email, password });
    
        reply.send(result)
      }
}

export {UserAuthenticationController}