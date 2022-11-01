import { Controller, Post, Body, Get, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/signup')
    create(@Body() body : CreateUserDto){
    return this.usersService.create(body.email , body.password);
}

@Get('/:id')
findUser(@Param('id') id:string){
return this.usersService.findone(parseInt(id));
}
@Get()
findAllUsers(@Query('email')  email : string ){
    return this.usersService.find(email)
}
@Delete('/:id')
deleteUser(@Param('id') id:string){
    return this.usersService.remove(id);
}
}
