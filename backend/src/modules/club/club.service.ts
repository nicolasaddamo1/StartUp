import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/entity/club.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.entity';
import { UpdateClubDto } from './dto/update-club.entity';

@Injectable()
export class ClubService {
    constructor(

        @InjectRepository(Club)
        private clubRepository: Repository<Club>
    ) { }

    async findAll(): Promise<Club[]> {
        return this.clubRepository.find();
    }

    async findOne(id: string): Promise<Club> {

        const club = await this.clubRepository.findOne({ where: { id } });
        if (!club) throw new Error('El club no existe');

        return club;
    }

    async create(club: CreateClubDto): Promise<Club> {
        return this.clubRepository.save(club);
    }

    async update(id: string, club: UpdateClubDto): Promise<Club> {
        const clubToUpdate = await this.clubRepository.findOne({ where: { id } });
        if (!clubToUpdate) throw new Error('El club no existe');

        return this.clubRepository.save({ ...clubToUpdate, ...club });
    }

    async delete(id: string): Promise<DeleteResult> {
        const result = await this.clubRepository.delete(id);
        if (result.affected === 0) throw new Error('El club no existe');
        return result;
    }
}
