import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    UsersModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
