import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Item, ItemDocument } from './items.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ItemType } from './items.dto';
@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
  // Create a new Item
  async create(Item: ItemType): Promise<Item> {
    const createdItem = new this.itemModel(Item);
    return createdItem.save();
  }
  // Fetch all Items
  async findAll(): Promise<Item[]> {
    return this.itemModel.find();
  }
  // Update Item
  async update(Item: ItemType, name: string): Promise<ItemType> {
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
  // Remove Item
  async remove(name: string): Promise<ItemType> {
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
