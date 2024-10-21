import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthGuard } from './Guards/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        autoLoadEntities: process.env.AUTOLOADENTITIES === "true", // load all entities from the entities folder
        logging: false,
        synchronize: true,
        ssl: true,
      }),
    }), 
    ProductsModule,
    AuthModule,
    UsersModule],
  controllers: [],
  providers: [  {
    provide: "APP_GUARD",
    useClass: AuthGuard,
  },],
})
export class AppModule {}
