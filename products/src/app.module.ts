import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './config/db.config';
import { conf } from './config/config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

console.log('configDB');
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [conf[process.env.NODE_ENV]],
      // envFilePath: ['.env.dev'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(configDB)],
      inject: [configDB.KEY],
      useFactory: (configService: ConfigType<typeof configDB>) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.nameDb,
        autoLoadEntities: true,
        entities: [],
        synchronize: true,
      }),
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
