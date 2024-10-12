import { FastifyRequest, FastifyReply } from "fastify";
import { ProductRegistrationService } from "../services/ProductRegistrationService";

class ProductRegistrationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, price, stock } = request.body as {
      name: string;
      description: string;
      price: number;
      stock: number;
    };

    const productRegistration = new ProductRegistrationService();
    const product = await productRegistration.execute({
      name,
      description,
      price,
      stock,
    });

    reply.send(product);
  }
}

export { ProductRegistrationController };
