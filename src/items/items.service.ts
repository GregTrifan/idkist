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
}
