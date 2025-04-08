import { PickType } from "@nestjs/mapped-types";
import { RegisterDto } from "./register.dto";

export class LoginUserDto extends PickType(RegisterDto, ['email', 'password']) { }
