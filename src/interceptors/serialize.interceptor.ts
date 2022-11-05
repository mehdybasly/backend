import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";



export function serialized(dto: any){
    return UseInterceptors(new SerializedInterceptor(dto))
}

export class SerializedInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        
    return handler.handle().pipe(
        map((data : any) =>{
        return plainToClass(this.dto, data , {
            excludeExtraneousValues : true
        });
        }),
    ) ; 
       
    }
}