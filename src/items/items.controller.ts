import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('items')
export class ItemsController {
  @Get()
  getItems(): string[] {
    return ['1', '2', '69'];
  }
  @Post('add')
  addItem(@Req() req: Request): string {
    const { name } = req.body;
    return `Req contains name prop of ${name}`;
  }
}
