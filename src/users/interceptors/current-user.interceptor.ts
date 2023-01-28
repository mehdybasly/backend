import { CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { handleRetry } from "@nestjs/typeorm";
import { ExecException } from "child_process";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";



@Injectable()
export class currenUserInterceptor implements NestInterceptor{
    constructor(private UserService : UsersService){}
   async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        if(userId){
         const user =  await this.UserService.findone(userId);
         request.currentUser = user ;
        }
        return handler.handle();
    }
}
   
