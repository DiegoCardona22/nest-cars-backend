import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {
    const brand : Brand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);
    const index = this.brands.findIndex((brand) => brand.id === id);
    this.brands[index] = {
      ...brand,
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    };
    return this.brands[index];
  }

  remove(id: string) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) throw new NotFoundException(`Brand with id ${id} not found`);
    this.brands.splice(index, 1);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
