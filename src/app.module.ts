import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client', 'build'),
    }),
    ProductModule,
    UsersModule,
    AuthModule,
    OrderModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        cors({
          origin: ['http://localhost:3000', 'http://localhost:8000'],
          credentials: true,
        }),
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
