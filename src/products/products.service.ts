import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { DB_ERROR_CODES } from 'src/utils/constants';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  private logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.save(createProductDto);
    } catch (error) {  
      this.handleDbError(error);
    }
  }

  async findAll({offset, limit}: PaginationDto) {
    try {
     const [products,totalProducts] = await  this.productRepository.findAndCount({
      take: limit,
      skip: (offset - 1) * limit,
     });
     return {
      products,
      total: totalProducts
     }
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findOne(id: number) {
       return await this.productRepository.findOneBy({id});
  }

  async update(id: number, updateData: UpdateProductDto) {
      const item = await this.findOne(id);
      if (!item) {
        throw new NotFoundException('Product not found');
      }
      Object.assign(item, {...updateData, updateAt: new Date()});
    
      return await this.productRepository.save(item);
   
  }
  

  async remove(id: number) {
    const { affected } = await this.productRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return 'Product deleted successfully';
  }


  private handleDbError(error: any): never {
    if (error.code === DB_ERROR_CODES.UNIQUE_CONSTRAINT) {
      throw new ConflictException('Email already exists');
    }
    this.logger.error(error);
    throw new InternalServerErrorException('please check the logs');
  }
}
