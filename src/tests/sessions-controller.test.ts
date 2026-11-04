import request from "supertest";
import { describe, it, expect, afterAll } from "@jest/globals";
import { app } from "@/app";
import { before } from "node:test";
import { prisma } from "@/database/prisma";
import exp from "node:constants";

describe("SessionsController", () => {
  let user_id: string;

  it("should authenticate a and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Auth Test User",
      email: "auth_john.doe@example.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post("/sessions").send({
      email: "auth_john.doe@example.com",
      password: "password123",
    });

    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body.token).toEqual(expect.any(String))
  });
});
