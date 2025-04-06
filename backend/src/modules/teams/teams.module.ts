import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamService]
})
export class TeamsModule {}
