import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../features/users/user.module';
import { Guards } from './guards/guards.privider';

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, ...Guards],
  exports: [AuthService],
})
export class AuthModule {}
