import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import {randomBytes ,  scrypt as _scrypt} from 'crypto';
import { promisify } from "util";
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}
    

    async signUp(email:string , password:string){
        const user =await this.userService.find(email);

        if(user.length){
            throw new BadRequestException('email has been used please try another Email')
        }


        //create a salt 

        const salt = randomBytes(8).toString('hex');

        //Hash the salt and the password together 

        const Hash = (await scrypt(password , salt , 32)) as Buffer;


        // join the hash and the salt together 
        const result = salt + '.' + Hash.toString('hex')
        
        //create user 
       const newuser = await this.userService.create(email , result);

        return newuser ; 
    }

    async signIn(email:string , password:string){
      const [user] = await this.userService.find(email);
            if (!user){
                throw new NotFoundException('User not found'); 
            }

            const [salt, storedhash] = user.password.split('.'); 

            const hash = (await scrypt(password , salt , 32)) as Buffer ; 

            if (storedhash !== hash.toString('hex')){
                    throw new BadRequestException('Wrong password');
            }
            return user;
    } 
    async update(id:number){
        const user = await this.userService.findone(id)

        if(!user){
            throw new NotFoundException('Id not found'); 
        }
        
    }
}