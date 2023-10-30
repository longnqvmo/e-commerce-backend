import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductService } from './product.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { AddProductDTO } from './dto/add-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { ProductsSummary } from 'src/common/constants/summary.constants';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: ProductsSummary.GET_PRODUCT })
  getProduct(@Param() idDTO: IdDTO) {
    return this.productService.handleGetProduct(idDTO);
  }

  @Get('')
  @Public()
  @ApiOperation({ summary: ProductsSummary.GET_ALL_PRODUCTS })
  getAllProduct(@Query() paginateDTO: PaginateDTO) {
    return this.productService.handleGetAllProduct(paginateDTO);
  }

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ProductsSummary.ADD_PRODUCT })
  addProduct(@Body() addProductDTO: AddProductDTO) {
    return this.productService.handleAddProduct(addProductDTO);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ProductsSummary.UPDATE_PRODUCT })
  updateProduct(
    @Param() idDTO: IdDTO,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    return this.productService.handleUpdateProduct(idDTO, updateProductDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ProductsSummary.DELETE_PRODUCT })
  deleteProduct(@Param() idDTO: IdDTO) {
    return this.productService.handleDeleteProduct(idDTO);
  }
}
