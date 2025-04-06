// src/modules/points/points.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Point } from 'src/entity/points.entity';

@Injectable()
export class PointsService {
    constructor(
        @InjectRepository(Point)
        private pointRepository: Repository<Point>,
    ) { }

    create(createPointDto: CreatePointDto) {
        return this.pointRepository.save(createPointDto);
    }

    findAll() {
        return this.pointRepository.find({
            relations: ['player', 'match'],
        });
    }

    findOne(id: string) {
        return this.pointRepository.findOne({
            where: { id },
            relations: ['player', 'match'],
        });
    }

    update(id: string, updatePointDto: UpdatePointDto) {
        return this.pointRepository.update(id, updatePointDto);
    }

    remove(id: string) {
        return this.pointRepository.delete(id);
    }
}
