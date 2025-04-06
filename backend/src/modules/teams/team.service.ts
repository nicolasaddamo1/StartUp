import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTeam } from 'src/entity/user-team.entity';
import { Repository } from 'typeorm';
import { CreateUserTeamDto } from './folder/user-team.dto';
import { UpdateUserTeamDto } from './folder/update-user-team.dto';


@Injectable()
export class UserTeamsService {
    constructor(
        @InjectRepository(UserTeam)
        private readonly userTeamRepo: Repository<UserTeam>,
    ) { }

    create(dto: CreateUserTeamDto) {
        const newTeam = this.userTeamRepo.create(dto);
        return this.userTeamRepo.save(newTeam);
    }

    findAll() {
        return this.userTeamRepo.find({ relations: ['user', 'players'] });
    }

    findOne(id: string) {
        return this.userTeamRepo.findOne({
            where: { id },
            relations: ['user', 'players'],
        });
    }

    async update(id: string, dto: UpdateUserTeamDto) {
        const team = await this.userTeamRepo.findOne({ where: { id } });
        if (!team) throw new NotFoundException('Team not found');
        Object.assign(team, dto);
        return this.userTeamRepo.save(team);
    }

    async remove(id: string) {
        const team = await this.userTeamRepo.findOne({ where: { id } });
        if (!team) throw new NotFoundException('Team not found');
        return this.userTeamRepo.remove(team);
    }
}
