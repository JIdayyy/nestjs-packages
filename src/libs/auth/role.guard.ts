import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { roles: requiredRoles } = this.reflector.getAllAndOverride<{
      roles: Role[];
    }>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const ctx = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => ctx.user.roles?.includes(role));
  }
}
