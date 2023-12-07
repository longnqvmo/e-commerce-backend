import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VersionService } from './version.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { ProductSummary } from 'src/common/constants/summary.constants';
import { IdDTO } from 'src/common/dto/id.dto';
import { AddVersionDTO } from './dto/add-version.dto';
import { UpdateVersionDTO } from './dto/update-version.dto';

@ApiTags('Versions')
@ApiBearerAuth()
@Controller('versions')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.ADD_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async addProduct(@Body() body: AddVersionDTO) {
    return this.versionService.handleAddVersion(body);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.UPDATE_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async updateProduct(
    @Param() idDTO: IdDTO,
    @Body() updateProductDTO: UpdateVersionDTO,
  ) {
    return this.versionService.handleUpdateVersion(idDTO, updateProductDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.DELETE_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async deleteProduct(@Param() idDTO: IdDTO) {
    return this.versionService.handleDeleteVersion(idDTO);
  }
}
