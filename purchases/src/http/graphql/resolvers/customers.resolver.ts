import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';

import { Customer } from '../models/customer';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';

import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';

interface UserReferenceProps {
  authUserId: string;
}

@Resolver(() => Customer)
export class CustomersResolver {
  public constructor(
    private readonly customersService: CustomersService,
    private readonly purchasesServices: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  public me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesServices.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  public resolveReference(reference: UserReferenceProps) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
