import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2), // pelo menos 1 caracter
      email: z.string().email(), // @email.com
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    //verificar se existe um usuário com o email cadastrado
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if(userWithSameEmail){
        throw new AppError("User with same email already exists")
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        },
    })

    //Para não retornar a senha
    const {password: _, ...userWithoutPassword} = user

    return response.json(userWithoutPassword);
  }
}

export { UsersController };
