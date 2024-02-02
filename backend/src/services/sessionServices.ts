import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "minha-senha"; // Retirar daqui e armazenar em uma variável de ambiente

export class SessionServices {
  async login(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Usuário ou senha inválidos");
    }

    return jwt.sign(
      {
        userId: user.id,
      },
      SECRET_KEY
    );
  }

  verifyToken(token?: string) {
    if (!token) {
      throw new Error("Usuário não está autenticado");
    }

    try {
      const jwtPayload = jwt.verify(token, SECRET_KEY);
      return jwtPayload
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}
