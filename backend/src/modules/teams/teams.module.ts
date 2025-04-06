import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeam } from 'src/entity/user-team.entity';
import { UserTeamsController } from './teams.controller';
import { UserTeamsService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeam])],
  controllers: [UserTeamsController],
  providers: [UserTeamsService],
  exports: [UserTeamsService],
})
export class UserTeamsModule { }
