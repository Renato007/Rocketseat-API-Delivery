import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { authConfig } from "@/configs/auth";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
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

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? "customer"}, secret, {
      subject: user.id,
      expiresIn
    })

    //Verifica se a senha é igual do banco  de dados
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    return response.json({ token });
  }
}

export { SessionsController };
