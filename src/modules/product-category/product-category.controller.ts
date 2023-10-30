import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductCategoryService } from './product-category.service';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddCategoryToProductDTO } from './dto/product-category.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { ProductToCategorySummary } from 'src/common/constants/summary.constants';

@ApiTags('Product - Category')
@ApiBearerAuth()
@Controller('product-category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: ProductToCategorySummary.GET_ALL_PRODUCTS })
  getAllProduct(@Query() idDTO: IdDTO, @Query() pagiateDTO: PaginateDTO) {
    return this.productCategoryService.handleGetAllProduct(idDTO, pagiateDTO);
  }

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ProductToCategorySummary.ADD_PRODUCT_TO_CATEGORY })
  addCategoryToProduct(
    @Body() addCategoryToProductDTO: AddCategoryToProductDTO,
  ) {
    return this.productCategoryService.handleAddCategoryToProduct(
      addCategoryToProductDTO,
    );
  }
}
