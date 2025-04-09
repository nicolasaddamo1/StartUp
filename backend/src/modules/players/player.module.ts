import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jugador } from 'src/entity/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jugador])],
  controllers: [PlayerController],
  providers: [PlayerService]
})
export class PlayerModule { }
