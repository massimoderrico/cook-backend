import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../@generated/user/user-create.input';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async createUser(data: UserCreateInput){
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                username: data.username,
                password: data.password,
                recipes: data.recipes,
                cookbooks: data.cookbooks
            }
        });
    }

    async deleteUser(id: number){
        return this.prisma.user.delete({where: {id: id}});
    }
}
