import { Injectable } from '@nestjs/common';
import { MailjetService } from 'nest-mailjet';
import { mailConfig } from 'src/configs/mail.config';

@Injectable()
export class MailService {
  constructor(private mailjetService: MailjetService) {}

  async sendEmail(data: any) {
    try {
      const result = await this.mailjetService.send({
        Messages: [
          {
            From: {
              Email: mailConfig.ADDRESS,
            },
            To: [
              {
                Email: data.to,
              },
            ],
            Subject: data.subject,
            TextPart: data.body,
          },
        ],
      });
      console.log(result);
      return result.body.Messages;
    } catch (error) {
      return error;
    }
  }
}
