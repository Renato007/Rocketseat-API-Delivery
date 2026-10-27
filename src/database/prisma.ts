import { PrismaClient } from "@prisma/client";
import { query } from "express";

export const prisma = new PrismaClient({
    //Node_env determina se a API está em ambiente de desenvolimento ou de produção afim de leitura dos logs em fase de desenvolvimento
    log: process.env.NODE_ENV === "production" ? [] : ["query"]
})