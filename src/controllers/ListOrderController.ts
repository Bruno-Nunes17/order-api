import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrderService } from "../services/ListOrderService";

class ListOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string };

    const listOrder = new ListOrderService();
    const order = await listOrder.execute({ userId });

    reply.send(order);
  }
}

export { ListOrderController };
