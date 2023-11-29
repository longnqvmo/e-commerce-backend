import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { MailService } from './mail.service';
import { SendMailDTO } from './dto/send-mail.dto';

@ApiTags('Mail')
@ApiBearerAuth()
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('')
  @Public()
  async sendEmail(@Body() sendMailDTO: SendMailDTO) {
    return await this.mailService.sendEmail(sendMailDTO);
  }
}
