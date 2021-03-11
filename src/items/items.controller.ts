import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  @Post('remove/:name')
  async remove(@Param() params): Promise<ItemDto> {
    return this.itemsService.remove(params.name);
  }
  @Post('update/:name')
  async update(@Param() params, @Body() itemDto: ItemDto) {
    return this.itemsService.update(itemDto, params.name);
  }
}
