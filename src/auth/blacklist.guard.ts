import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";
import { UserDto } from "src/user/interfaces/user.dto";
import { map } from "rxjs/operators";
import { blacklist } from "./blacklist.decorator";


@Injectable()
export class blacklistGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const session = this.reflector.get<boolean[]>('blacklist', context.getHandler());
        // if (!session) {
        //     return true;
        // }

        const request = context.switchToHttp().getRequest();
        const user: UserDto = request.user.user;

        return this.userService.findOne(user.id).pipe(
            map((user: UserDto) => {
                const blackList = () => session.indexOf(user.blackList) > -1;
                let hasPermission: boolean = false;

                if (blackList()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
    }
}
