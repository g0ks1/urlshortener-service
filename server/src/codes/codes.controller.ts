import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Code } from './entities/code.entity';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('api/v1/codes')
@ApiTags('codes')
export class CodesController {
  private readonly logger: Logger;
  constructor(private readonly codesService: CodesService) {
    this.logger = new Logger(CodesController.name);
  }

  @Post()
  async create(@Body() createCodeDto: CreateCodeDto): Promise<Code> {
    this.logger.log(createCodeDto);
    return await this.codesService.create(createCodeDto);
  }

  @Get()
  findAll() {
    return this.codesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.codesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCodeDto: UpdateCodeDto) {
    return this.codesService.update(id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.codesService.remove(id);
  }
}
