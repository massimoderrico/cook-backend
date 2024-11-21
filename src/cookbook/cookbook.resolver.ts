import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CookbookService } from './cookbook.service';
import { Cookbook } from '../@generated/cookbook/cookbook.model';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';

@Resolver(() => Cookbook)
export class CookbookResolver {
  constructor(private readonly cookbookService: CookbookService) {}

  @Mutation(() => Cookbook)
  async createCookbook(@Args('data') data: CookbookCreateInput,): Promise<Cookbook> {
    try {
      return await this.cookbookService.createCookbook(data);
    } catch (error) {
      throw new Error(`Failed to create cookbook: ${error.message}`);
    }
  }
}
