/*************  ✨ Windsurf Command ⭐  *************/
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partido } from 'src/entity/match.entity';
import { Repository, DeepPartial } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Partido)
        private readonly matchRepository: Repository<Partido>,
    ) { }
    async findAll(): Promise<Partido[]> {
        return await this.matchRepository.find();
    }

    async findOne(id: string): Promise<Partido> {
        const match = await this.matchRepository.findOne({ where: { id } });
        if (!match) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }
        return match;
    }

    async create(createMatchDto: CreateMatchDto): Promise<Partido> {
        const match = this.matchRepository.create({ ...createMatchDto } as DeepPartial<Partido>);
        return await this.matchRepository.save(match);
    }

    async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Partido> {
        await this.matchRepository.update(id, updateMatchDto as DeepPartial<Partido>);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.matchRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }
    }
}

