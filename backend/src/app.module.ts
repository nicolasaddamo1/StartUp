import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/user.entity';
import { UsuariosModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { Jugador } from './entity/player.entity';
import { JugadorEquipo } from './entity/player-team.entity';
import { Equipo } from './entity/team.entity';
import { Transferencia } from './entity/transfers.entity';
import { Mercado } from './entity/market.entity';
import { UsuarioTorneo } from './entity/user-tournament.entity';
import { TipoTransaccion, Transaccion } from './entity/transactions.entity';
import { Torneo } from './entity/tournaments.entity';
import { EquipoTorneo } from './entity/team-tournaments.entity';
import { Puntuacion } from './entity/points.entity';
import { Notificacion } from './entity/notifications.entity';
import { Fecha } from './entity/fecha.entity';
import { ClubModule } from './modules/club/club.module';
import { PlayerModule } from './modules/players/player.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath: '.env',
    },
  ),
  TypeOrmModule.forRootAsync({
    // imports: [ConfigService],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.getOrThrow<string>('DB_HOST'),
      port: configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow<string>('DB_USERNAME'),
      password: configService.getOrThrow<string>('DB_PASSWORD'),
      database: configService.getOrThrow<string>('DB_DATABASE'),
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
      dropSchema: false,
      logging: true,
      autoLoadEntities: false,
    }),
  }),
  TypeOrmModule.forFeature([Usuario]),
    HttpModule,
    AuthModule,
    UsuariosModule,
    ClubModule,
    PlayerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
