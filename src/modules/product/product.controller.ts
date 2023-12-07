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
import { ProductSummary } from 'src/common/constants/summary.constants';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: ProductSummary.GET_PRODUCT })
  getProduct(@Param() idDTO: IdDTO) {
    return this.productService.handleGetProduct(idDTO);
  }

  @Get('')
  @Public()
  @ApiOperation({ summary: ProductSummary.GET_ALL_PRODUCTS })
  getAllProduct(@Query() paginateDTO: PaginateDTO) {
    return this.productService.handleGetAllProduct(paginateDTO);
  }

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.ADD_PRODUCT,
    description: `Role: ${Role.ADMIN}`,
  })
  addProduct(@Body() addProductDTO: AddProductDTO) {
    return this.productService.handleAddProduct(addProductDTO);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.UPDATE_PRODUCT,
    description: `Role: ${Role.ADMIN}`,
  })
  updateProduct(
    @Param() idDTO: IdDTO,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    return this.productService.handleUpdateProduct(idDTO, updateProductDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.DELETE_PRODUCT,
    description: `Role: ${Role.ADMIN}`,
  })
  deleteProduct(@Param() idDTO: IdDTO) {
    return this.productService.handleDeleteProduct(idDTO);
  }
}
