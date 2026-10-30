import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    //Objeto zod serve de validar a requisição
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { email } });

    //Verifica se o usuário não foi encontrado
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    //Verifica se a senha é igual do banco  de dados
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    return response.json({ message: "ok" });
  }
}

export { SessionsController };
