import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.schema';
import { ItemDto } from './items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get() // GET /items
  async getItems(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
  @Post('add') // POST /items/add
  async create(@Body() itemDto: ItemDto) {
    await this.itemsService.create(itemDto);
  }
}
