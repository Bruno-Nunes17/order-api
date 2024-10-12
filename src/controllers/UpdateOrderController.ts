import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateOrderService } from "../services/UpdateOrderService";

class UpdateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { orderId } = request.params as { orderId: string };
    const { status } = request.body as { status: string };

    const updateOrder = new UpdateOrderService();
    const update = await updateOrder.execute({ orderId, status });

    reply.send(update);
  }
}

export { UpdateOrderController };
