import { Body, Controller, Get, Post } from '@nestjs/common';

interface Name {
  name: string;
}

@Controller('items')
export class ItemsController {
  @Get()
  getItems(): string[] {
    return ['1', '2', '69'];
  }
  @Post('add')
  addItem(@Body() req: Name): string {
    const name = req.name;
    return `Req contains name prop of ${name}`;
  }
}
