import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';
import { ProductsService } from '../../../services/products.service';

@Resolver(() => Product)
export class ProductsResolver {
  public constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  public products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  public createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
