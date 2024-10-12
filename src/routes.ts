import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { ProductRegistrationController } from "./controllers/ProductRegistrationController";
import { ListProductsController } from "./controllers/ListProductsController";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { UpdateOrderController } from "./controllers/UpdateOrderController";
import { ListOrderController } from "./controllers/ListOrderController";
import { UserAuthenticationController } from "./controllers/UserAuthenticationController";
import { authenticate } from "./middlewares/authenticate ";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { ok: true };
  });
  fastify.post(
    "/register",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply);
    }
  );
  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UserAuthenticationController().handle(request, reply);
    }
  );
  fastify.post(
    "/newproduct",
    { preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ProductRegistrationController().handle(request, reply);
    }
  );
  fastify.get(
    "/products",
    { preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListProductsController().handle(request, reply);
    }
  );
  fastify.post(
    "/order",{ preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateOrderController().handle(request, reply);
    }
  );
  fastify.put(
    "/order/:orderId/status",
    { preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateOrderController().handle(request, reply);
    }
  );
  fastify.get(
    "/orders/:userId",{ preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListOrderController().handle(request, reply);
    }
  );
}
