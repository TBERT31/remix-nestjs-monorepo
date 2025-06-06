import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { CookieSerializer } from './cookie-serializer';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({
        defaultStrategy: 'local',
        property: 'user',
        session: true,
    }),
  ],
  controllers: [],
  providers: [LocalStrategy, LocalAuthGuard, CookieSerializer, PrismaService, AuthService],
  exports: [AuthService]
})
export class AuthModule { }
