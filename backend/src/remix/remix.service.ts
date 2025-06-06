import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemixService {
  constructor(
    public readonly prisma: PrismaService,
    public readonly auth: AuthService,
  ){}

  public readonly getHello = (): string => {
    return 'Cette stack est incroyable !';
  };
  public readonly getHello2 = (): string => {
    return 'Cette stack est incroyable !';
  };
  public readonly getUser = async ({userId}: {userId: string}) => {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      }, select: {
        id: true,
        name: true,
        email: true,
      }
    });
  };
}
