import prismaCliente from "../prisma";
import argon2 from "argon2";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    if (!name || !email || !password) {
      throw new Error("Prencha todos os campos");
    }

    const userExist = await prismaCliente.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new Error("E-mail já cadastrado!");
    }

    const hashedPassword = await argon2.hash(password);

    const user = await prismaCliente.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }
}

export { CreateUserService };
