import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath: '.env',
    },
  ),
  TypeOrmModule.forRootAsync({
    imports: [ConfigService],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.getOrThrow<string>('DB_HOST'),
      port: configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow<string>('DB_USERNAME'),
      password: configService.getOrThrow<string>('DB_PASSWORD'),
      database: configService.getOrThrow<string>('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: false,
      logging: true,
      autoLoadEntities: true,
    }),
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
