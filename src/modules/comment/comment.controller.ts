import {
  Controller,
  Post,
  Body,
  Request,
  Query,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { IdDTO } from 'src/common/dto/id.dto';
import { AddCommentDTO } from './dto/add-comment.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { CommentsSummary } from 'src/common/constants/summary.constants';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: CommentsSummary.GET_ALL_COMMENTS })
  getAllComment(@Query() idDTO: IdDTO, @Query() paginateDTO: PaginateDTO) {
    return this.commentService.handleGetAllComment(idDTO, paginateDTO);
  }

  @Post(':id')
  @ApiOperation({ summary: CommentsSummary.ADD_COMMENT })
  addComment(
    @Request() req: any,
    @Param() idDTO: IdDTO,
    @Body() addCommentDTO: AddCommentDTO,
  ) {
    return this.commentService.handleAddComment(req.user, idDTO, addCommentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: CommentsSummary.DELETE_COMMENT })
  deleteProduct(@Request() req: any, @Param() idDTO: IdDTO) {
    return this.commentService.handleDeleteComment(req.user, idDTO);
  }
}
