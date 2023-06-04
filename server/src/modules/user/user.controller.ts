import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserBalanceEntity } from './entities/balance.entity';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { CurrentUser } from 'src/decorators';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id/balance')
  @ApiCreatedResponse({ type: UserBalanceEntity, isArray: true })
  async updateBalance(
    @CurrentUser() id: number,
    @Body() updateUserBalanceDto: UpdateUserBalanceDto,
  ) {
    return this.userService.updateBalance(id, updateUserBalanceDto);
  }
}
