import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PdfController } from '../controllers';
import { PdfService } from '../services';

@Module({
  imports: [HttpModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
