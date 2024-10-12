import prismaCliente from "../prisma";

interface ProductRegistrationProps {
  name: string;
  description: string;
  price: number;
  stock: number;
}

class ProductRegistrationService {
  async execute({ name, description, price, stock }: ProductRegistrationProps) {
    if (!name || !description || !price || !stock) {
      throw new Error("Prencha todos os campos");
    }

    const product = await prismaCliente.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });

    return product;
  }
}

export { ProductRegistrationService };
