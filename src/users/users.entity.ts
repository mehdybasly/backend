import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number; 
    @Column()
    email: string; 
    @Column()
    password: string; 

    @AfterInsert()
    insertUser(){
        console.log(`user is added with id : ${this.id}` )
    }
    @AfterUpdate()
    UpdateUser(){
        console.log(`user is updated with id : ${this.id}` )
    }
    @AfterRemove()
    removeUser(){
        console.log(`user is removed with id : ${this.id}` )
    }
}