import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AccountController } from './account.controller';
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AccountController],
})
export class AccountModule {}
