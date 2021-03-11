import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.schema';
import { ItemType } from './items.type';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get() // GET /items
  async getItems(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
  @Post('add') // POST /items/add
  async create(@Body() item: ItemType) {
    await this.itemsService.create(item);
  }
  @Post('remove/:name')
  async remove(@Param() params): Promise<ItemType> {
    return this.itemsService.remove(params.name);
  }
  @Post('update/:name')
  async update(@Param() params, @Body() item: ItemType) {
    return this.itemsService.update(item, params.name);
  }
}
