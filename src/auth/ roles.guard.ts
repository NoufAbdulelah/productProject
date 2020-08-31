import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";
import { UserDto } from "src/user/interfaces/user.dto";
import { map } from "rxjs/operators";
import { hasRoles } from "./ roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: UserDto = request.user.user;

        return this.userService.findOne(user.id).pipe(
            map((user: UserDto) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;

                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
    }
}
