import { Module } from '@nestjs/common';

import { PdfController } from '../controllers';
import { PdfService } from '../services';

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
