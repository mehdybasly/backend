import { Controller, Post, Body, Get, Param, Query, Delete, Patch, NotFoundException, SerializeOptions, UseInterceptors, Session, UseGuards } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { serialized, SerializedInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { userDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@serialized(userDto)
export class UsersController {
    constructor(private usersService: UsersService , 
        private authSerive : AuthService){}

    // @Get('whoami')
    // whoAmI(@Session() session:any){
    //   return this.usersService.findone(session.userId)
    // }

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user:User){
        return user ;
    }
    @Post('signout')
    signout(@Session() session:any){
        session.userId = null;
    }
    @Post('/signup')
   async create(@Body() body : CreateUserDto , @Session() session:any){
   const user = await this.authSerive.signUp(body.email , body.password);
    session.userId= user.id;
    return user
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto , @Session() session : any){
       const user =await this.authSerive.signIn(body.email , body.password);

        session.userId= user.id
        return user
    }


@Get('/:id')
async findUser(@Param('id') id:string){
   
const user = await this.usersService.findone(parseInt(id));
if (!user){
    throw new NotFoundException('user not found')
}
return user;
}
@Get()
findAllUsers(@Query('email')  email : string ){
    return this.usersService.find(email);
}
@Delete('/:id')
deleteUser(@Param('id') id:string){
    return this.usersService.remove(parseInt(id));
}
@Patch('/:id')
updateUser(@Param('id') id: string , @Body() body: UpdateUserDto){
return this.usersService.update(parseInt(id) , body);
}
}
