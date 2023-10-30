import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { CategoryService } from './category.service';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddCategoryDTO } from './dto/add-category.dto';
import { CategoriesSummary } from 'src/common/constants/summary.constants';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: CategoriesSummary.GET_ALL_CATEGORIES })
  getAllCategory(@Query() pagiateDTO: PaginateDTO) {
    return this.categoryService.handleGetAllCategory(pagiateDTO);
  }

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: CategoriesSummary.CREATE_CATEGORY })
  addCategory(@Body() addCategoryDTO: AddCategoryDTO) {
    return this.categoryService.handleAddCategory(addCategoryDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: CategoriesSummary.DELETE_CATEGORY })
  deleteCategory(@Param() idDTO: IdDTO) {
    return this.categoryService.handleDeleteCategory(idDTO);
  }
}
