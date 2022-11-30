import { Injectable, Logger } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodesService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Code) private readonly codeRepository: Repository<Code>,
  ) {
    this.logger = new Logger(CodesService.name);
  }

  async create(createCodeDto: CreateCodeDto): Promise<Code> {
    createCodeDto.id = Date.now();
    createCodeDto.shortcode_uuid = this.ShortURL.encode(createCodeDto.id);
    createCodeDto.active = true;

    const newLink = this.codeRepository.create(createCodeDto);
    return await this.codeRepository.save(newLink);
  }

  findAll() {
    return this.codeRepository.find();
  }

  findOne(id: number) {
    return this.codeRepository.findOneBy({ id });
  }

  async update(id: number, updateCodeDto: UpdateCodeDto) {
    const code = await this.findOne(id);
    return this.codeRepository.save({ ...code, ...updateCodeDto });
  }

  async remove(id: number) {
    const code = await this.findOne(id);
    return this.codeRepository.remove(code);
  }

  ShortURL = new (function () {
    const _alphabet =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      _base = _alphabet.length;

    this.encode = (num: number) => {
      let str = '';
      while (num > 0) {
        str = _alphabet.charAt(num % _base) + str;
        num = Math.floor(num / _base);
      }
      return str;
    };

    this.decode = (str: string) => {
      let num = 0;
      for (let i = 0; i < str.length; i++) {
        num = num * _base + _alphabet.indexOf(str.charAt(i));
      }
      return num;
    };
  })();
}
