import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import { app } from "@/app";

describe("UsersController", () => {
  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201); // validar o status da resposta
    expect(response.body).toHaveProperty("id"); //verificar a propriedade ID
    expect(response.body.name).toBe("John Doe"); //verificar o nome do usuário
  });
});
