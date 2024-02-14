import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: never, user: never) {
    if (err || !user) {
      console.log('err', err);
      console.log('user', user);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
