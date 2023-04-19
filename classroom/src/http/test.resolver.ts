import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../database/prisma/prisma.service';
import { AuthorizationGuard } from '../http/auth/authorization.guard';

@Resolver('test')
export class TestResolver {
  public constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World';
  }
}
