import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Item, ItemDocument } from './items.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ItemDto } from './items.dto';
@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(ItemDto: ItemDto): Promise<Item> {
    const createdItem = new this.itemModel(ItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find();
  }
  // Upadte Service
  async update(Item: ItemDto, name: string): Promise<ItemDto> {
    try {
      const item = await this.itemModel.findOne({ name: name });
      item.name = Item.name;
      item.save();
      return { ...Item, status: 'Success' };
    } catch {
      return {
        name: '',
        status: 'Item not found',
      };
    }
  }
  // Remove Service
  async remove(name: string): Promise<ItemDto> {
    try {
      const item = await this.itemModel.findOne({ name: name });
      await item.delete();
      return { ...item, status: 'Success' };
    } catch {
      return {
        name: '',
        status: 'Item not found',
      };
    }
  }
}
