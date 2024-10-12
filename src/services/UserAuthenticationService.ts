import prismaCliente from "../prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "default_secret";

interface UserAuthenticationProps {
  email: string;
  password: string;
}

class UserAuthenticationService {
  async execute({ email, password }: UserAuthenticationProps) {
    const user = await prismaCliente.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email invalido");
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new Error("Senha invalido");
    }

    const token = await this.createToken(user);
    const userId = user.id;

    return  {userId, token} ;
  }

  async createToken(user: object) {
    const token = jwt.sign(user, secret, {
      expiresIn: "1h",
    });
    return token;
  }
}

export { UserAuthenticationService };
