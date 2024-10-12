import prismaCliente from "../prisma";

interface ListOrderProps {
  userId: string;
}

class ListOrderService {
  async execute({ userId }: ListOrderProps) {
    const user = await prismaCliente.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error("O usuario informado não existe");
    }

    const orders = await prismaCliente.order.findMany({
      where: { userId: Number(userId) },
    });

    if (orders.length === 0) {
      throw new Error("Não existem pedidos relacionados a esse usuario");
    }

    return orders;
  }
}

export { ListOrderService };
