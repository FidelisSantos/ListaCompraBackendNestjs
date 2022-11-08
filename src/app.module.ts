import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { AppService } from './app.service';
import { FireormModule } from 'nestjs-fireorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ProductModule,
    FireormModule.forRoot({
      firestoreSettings: {
        projectId: process.env.PROJECTID,
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATY_KEY,
        },
      },
      fireormSettings: { validateModels: false },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
