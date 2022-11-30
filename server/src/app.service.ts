import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from './codes/entities/code.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Code) private codeRepository: Repository<Code>,
  ) {}
  async redirect(shortcode_uuid: string) {
    const code = await this.codeRepository.findOneBy({ shortcode_uuid });
    if (code && code.redirect_url) {
      return { url: code.redirect_url };
    }
  }
}
