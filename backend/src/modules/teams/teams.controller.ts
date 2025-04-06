import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTeamsService } from './team.service';
import { CreateUserTeamDto } from './folder/user-team.dto';
import { UpdateUserTeamDto } from './folder/update-user-team.dto';

@Controller('user-teams')
export class UserTeamsController {
    constructor(private readonly userTeamsService: UserTeamsService) { }

    @Post()
    create(@Body() createUserTeamDto: CreateUserTeamDto) {
        return this.userTeamsService.create(createUserTeamDto);
    }

    @Get()
    findAll() {
        return this.userTeamsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userTeamsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserTeamDto: UpdateUserTeamDto) {
        return this.userTeamsService.update(id, updateUserTeamDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userTeamsService.remove(id);
    }
}
