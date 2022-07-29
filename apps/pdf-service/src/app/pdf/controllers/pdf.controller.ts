import { Controller, Get, Res } from '@nestjs/common';
import Response from 'express';

import { PdfService } from '../services';

@Controller('/pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('/')
  async getPDF(
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfService.generatePDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
