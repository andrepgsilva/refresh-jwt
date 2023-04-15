import { client } from "../../prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
  username: string;
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });

    const errorMessage = "User or password incorrect!";

    if (! userAlreadyExists) {
      throw new Error(errorMessage);
    }

    const passwordMatch = compare(password, userAlreadyExists.password);

    if (! passwordMatch) {
      throw new Error(errorMessage);
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);
    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  }
}