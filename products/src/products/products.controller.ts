import { IdDto } from '../common/dto/id-product.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationQuery } from '../common/dto/query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create new product' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Data for new product',
  })
  @ApiCreatedResponse({
    description: 'Product created',
    type: Products,
  })
  @ApiResponse({
    status: 409,
    description: 'This product Exist',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List of products' })
  findAll(@Query() paginationQuery: PaginationQuery) {
    return this.productsService.findAll(paginationQuery);
  }
  @ApiResponse({
    status: 404,
    description: 'Product not exist',
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() idDto: IdDto) {
    return this.productsService.findOne(idDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update product' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Data for update product',
  })
  @ApiCreatedResponse({
    description: 'Product update',
    type: Products,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not exist',
  })
  update(@Param() idDto: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(idDto, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param() idDto: IdDto) {
    return this.productsService.remove(idDto);
  }
}
