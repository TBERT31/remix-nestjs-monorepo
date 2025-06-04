
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptionsWithRequest, Strategy } from 'passport-local';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { RedirectException } from './redirected-error.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly prisma: PrismaService,
    ){
        super({
            passReqToCallback: true,
            usernameField: 'email',
        } as IStrategyOptionsWithRequest);
    }

    async validate(request: Request, email:string, password: string) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            }
        });

        if(!existingUser) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = existingUser.password === password; 

        if(!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return existingUser;
    }
}
