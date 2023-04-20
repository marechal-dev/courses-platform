import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  public listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId: customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
