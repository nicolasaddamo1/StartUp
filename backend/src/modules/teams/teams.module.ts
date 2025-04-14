import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Jugador } from "src/entity/player.entity";
import { Equipo } from "src/entity/team.entity";
import { EquipoController } from "./teams.controller";
import { EquipoService } from "./team.service";
import { Usuario } from "src/entity/user.entity";
import { JugadorEquipo } from "src/entity/player-team.entity";

@Module({
imports:[TypeOrmModule.forFeature([Equipo, Jugador, Usuario, JugadorEquipo])],
controllers:[EquipoController],
providers:[EquipoService]
})
export class EquipoModule { }