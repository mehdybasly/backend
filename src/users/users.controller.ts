import { Controller, Post, Body, Get, Param, Query, Delete, Patch, NotFoundException, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { serialized, SerializedInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { userDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@serialized(userDto)
export class UsersController {
    constructor(private usersService: UsersService , 
        private authSerive : AuthService){}



    @Post('/signup')
    create(@Body() body : CreateUserDto){
    return this.authSerive.signUp(body.email , body.password);
    }

    @Post('/signin')
    signin(@Body() body: CreateUserDto){
        return this.authSerive.signIn(body.email , body.password)
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
