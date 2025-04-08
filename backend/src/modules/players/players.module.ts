import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Jugador } from 'src/entity/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jugador])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule { }
