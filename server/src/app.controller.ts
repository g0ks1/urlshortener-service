import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ path: '/' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':uuid')
  @Redirect('http://localhost:3000/404.html', 301)
  redirect(@Param('uuid') uuid: string) {
    return this.appService.redirect(uuid);
  }
}
