import { FastifyRequest, FastifyReply } from "fastify";
import { ListProductsService } from "../services/ListProductsService";

class ListProductsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    const listProduct = new ListProductsService();
    const product = await listProduct.execute();

    reply.send(product);
  }
}

export { ListProductsController };
