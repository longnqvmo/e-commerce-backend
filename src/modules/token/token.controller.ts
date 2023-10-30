import { Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
// import { Roles } from 'src/common/decorators/roles.decorator';
// import { Role } from 'src/common/enums/enums';
import { TokenSummary } from 'src/common/constants/summary.constants';
import { TokenService } from './token.service';
import { IdDTO } from 'src/common/dto/id.dto';

@ApiTags('Token')
@ApiBearerAuth()
@Controller('token')
export class TokenController {
  constructor(private rateService: TokenService) {}

  // @Get('')
  // @Public()
  // @ApiOperation({ summary: TokenSummary.GET_RATE })
  // getToken(@Query() idDTO: IdDTO) {
  //   return this.rateService.handleGetToken(idDTO);
  // }

  @Post(':id/generate-token')
  @Public()
  @ApiOperation({ summary: TokenSummary.GENERATE_TOKEN })
  generateToken(@Param() idDTO: IdDTO) {
    return this.rateService.generateToken(idDTO);
  }
}
