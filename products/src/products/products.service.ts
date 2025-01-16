import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../common/dto/query.dto';
import { IdDto } from '../common/dto/id-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      return await this.productRepository.save(newProduct);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('This product Exist');
      }
    }
  }

  async findAll(paginationQuery: PaginationQuery): Promise<Products[]> {
    const { limit = 10, offset = 0 } = paginationQuery;
    return await this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(idDto: IdDto): Promise<Products> {
    const { id } = idDto;
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    return product;
  }

  async update(
    idDto: IdDto,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const { id } = idDto;
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    return await this.productRepository.save(product);
  }

  async remove(idDto: IdDto): Promise<Products> {
    const { id } = idDto;
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    this.productRepository.remove(product);
    return product;
  }
}
