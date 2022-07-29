import { Module } from '@nestjs/common';
import { PdfModule } from './app/pdf/modules/pdf.module';

@Module({
  imports: [PdfModule],
  controllers: [],
  providers: [],
})
export class RootModule {}
