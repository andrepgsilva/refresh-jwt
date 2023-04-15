import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
  async execute(userId: string) {
    return sign(
      {}, 
      'a9bb935c-1080-44e8-8bd7-96ee5290f4a9', {
      subject: userId,
      expiresIn: "20s"
    });
  } 
}