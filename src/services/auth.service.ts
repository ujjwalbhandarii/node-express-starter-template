import JWT from "jsonwebtoken";
import * as argon from "argon2";
import { ROLE, User } from "@prisma/client";

import {
  GetUser,
  HashPassword,
  PasswordMatch,
  SignToken,
} from "@/types/auth.type";
import { prisma } from "../utils/prisma";
import { SignupBody } from "@/validators/auth.schema";

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
const ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? "30d";

export class AuthService {
  async getUser({ email, role }: GetUser): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email, role: role as ROLE },
    });
  }

  async createUser({ ...data }: SignupBody): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data,
        role: "USER",
      },
    });
  }

  async passwordMatch({
    loginPassword,
    userPassword,
  }: PasswordMatch): Promise<boolean> {
    return await argon.verify(loginPassword, userPassword);
  }

  async hashPassword({ password }: HashPassword): Promise<string> {
    return await argon.hash(password);
  }

  async signToken({ userId, email, role }: SignToken): Promise<string> {
    const payload = {
      sub: userId,
      email,
      role,
    };

    return JWT.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  decodeToken({ token }: { token: string }) {
    console.log({ token });
  }
}

export const authService = new AuthService();
