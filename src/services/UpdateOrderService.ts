import prismaCliente from "../prisma";

interface UpdateOrderProps {
  orderId: string;
  status: string;
}

const orderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Canceled",
  "Returned",
  "Failed",
  "On Hold",
  "Refunded",
];

class UpdateOrderService {
  async execute({ orderId, status }: UpdateOrderProps) {
    const isValid = await this.checkStatus(status);

    if (!isValid) {
      throw new Error("Informe um status valido!");
    }

    const updatedOrder = await prismaCliente.order.update({
      where: { id: Number(orderId) },
      data: { status },
    });

    return updatedOrder;
  }

  async checkStatus(status: string) {
    return orderStatus.includes(status);
  }
}

export { UpdateOrderService };
