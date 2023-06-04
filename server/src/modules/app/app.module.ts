import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { BudgetPlanModule } from '../budget-plan/budget-plan.module';
import { ReceiptModule } from '../receipt/receipt.module';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from 'src/guards';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    BudgetPlanModule,
    ReceiptModule,
  ],
  providers: [
    //еще один способ задать глобальный Guard
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
  ],
})
export class AppModule {}
