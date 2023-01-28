import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email:string, password:string){
        const user = this.repo.create({email, password})
        return this.repo.save(user);
    }
    findone(id : number){
        if(!id){
            throw new BadRequestException('this user is not logged in ')
        }
        return this.repo.findOneBy({id});
    }
    find(email : string ){
        return this.repo.find({where: {email}});
    }
   async update(id : number , attrs : Partial<User>){
        const user = await this.findone(id);
        if(!user){
            throw new NotFoundException('id not found !');
        }
        Object.assign(user , attrs);
        return this.repo.save(user);
    }

   async remove(id:number){
        const user = await this.findone(id);
        if (!user) {
            throw new NotFoundException('id not found');
        }
       return this.repo.remove(user);
    }
}
