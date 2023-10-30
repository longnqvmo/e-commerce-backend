import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { RateService } from './rate.service';
// import { Roles } from 'src/common/decorators/roles.decorator';
// import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { RateDTO } from './dto/rate.dto';
import { RateSummary } from 'src/common/constants/summary.constants';

@ApiTags('Rate')
@ApiBearerAuth()
@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: RateSummary.GET_RATE })
  getRate(@Query() idDTO: IdDTO) {
    return this.rateService.handleGetRate(idDTO);
  }

  @Post(':id')
  @ApiOperation({ summary: RateSummary.RATE })
  rate(@Request() req: any, @Param() idDTO: IdDTO, @Body() rateDTO: RateDTO) {
    return this.rateService.handleRate(req.user, idDTO, rateDTO);
  }
}
