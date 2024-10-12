import prismaCliente from "../prisma";

interface CreateOrderProps {
  userId: number;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
}

class CreateOrderService {
  async execute({ userId, orderItems }: CreateOrderProps) {
    let totalPrice = 0;

    const orderItemsData = await Promise.all(
      orderItems.map(async (item) => {
        const product = await prismaCliente.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(
            `Não foi prossivel encontrar um produto com ID: ${item.productId}`
          );
        }

        if (product.stock < item.quantity) {
          throw new Error("Estoque insuficiente");
        }

        const itemPrice = product.price * item.quantity;
        totalPrice += itemPrice;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const order = await prismaCliente.order.create({
      data: {
        userId,
        status: 'Pending',
        totalPrice,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: true,
      },
    });

    if (order) {
      for (const item of orderItems) {
        await prismaCliente.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }

    return order;
  }
}

export { CreateOrderService };
