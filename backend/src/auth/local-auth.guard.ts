
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
  
  @Injectable()
  export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        // request.body = {};
        // request.body.email = 't.berteau@test.com';
        // request.body.password = 'password123';
        console.log(request);

        // Add your custom authentication logic here
        const canBeActivated = await super.canActivate(context) as boolean;
        // for example, call super.logIn(request) to establish a session.

        await super.logIn(request);
        return canBeActivated;
    }
  
    // @ts-expect-error Fix that later
    handleRequest(err, user, info) {
        console.log({user, err, info});
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException("You do not have access to this page");
        }
        return user;
    }
  }
  