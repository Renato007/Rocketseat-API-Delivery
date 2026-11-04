import request from "supertest";
import { describe, it, expect, afterAll } from "@jest/globals";
import { app } from "@/app";
import { before } from "node:test";
import { prisma } from "@/database/prisma";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201); // validar o status da resposta
    expect(response.body).toHaveProperty("id"); //verificar a propriedade ID
    expect(response.body.name).toBe("John Doe"); //verificar o nome do usuário

    user_id = response.body.id;
  });

  it("should throw an error user with same email already exists", async()=>{
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User with same email already exists")
  })
});
