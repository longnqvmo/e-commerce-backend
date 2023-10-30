import { Controller, Get, Post, Request, Query, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { FavoritesSummary } from 'src/common/constants/summary.constants';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get('')
  @ApiOperation({ summary: FavoritesSummary.GET_ALL_FAVORITES })
  getListFavorite(@Request() req: any, @Query() paginateDTO: PaginateDTO) {
    return this.favoriteService.handleGetListFavorite(req.user, paginateDTO);
  }

  @Post(':id')
  @ApiOperation({ summary: FavoritesSummary.FAVORITE })
  favorite(@Request() req: any, @Param() idDTO: IdDTO) {
    return this.favoriteService.handleFavorite(req.user, idDTO);
  }
}
