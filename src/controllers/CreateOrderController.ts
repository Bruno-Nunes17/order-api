import { FastifyRequest, FastifyReply } from "fastify";
import { CreateOrderService } from "../services/CreateOrderService";

class CreateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId, orderItems } = request.body as {
      userId: number;
      orderItems: [];
    };

    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({ userId, orderItems });

    reply.send(order);
  }
}

export { CreateOrderController };
