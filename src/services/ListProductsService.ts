import prismaCliente from "../prisma";

class ListProductsService {
  async execute() {
    const products = await prismaCliente.product.findMany();

    if (products.length === 0) {
      throw new Error("Ainda não existem produtos cadastrados");
    }

    return products;
  }
}

export { ListProductsService };
