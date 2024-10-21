import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
@ApiTags('products')
@ApiBearerAuth()
@Controller('products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() pagination : PaginationDto ) {
    return this.productsService.findAll(pagination);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number
  ) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number
  ) {
    return this.productsService.remove(id);
  }
}
