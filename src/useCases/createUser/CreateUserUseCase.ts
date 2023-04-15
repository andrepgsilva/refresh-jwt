import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

export class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verify user existence
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      }
    });

    return user;
  }
}
