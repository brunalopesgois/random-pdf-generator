import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as PDFDocument from 'pdfkit';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
@Injectable()
export class PdfService {
  constructor(private readonly httpService: HttpService) {}

  public async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
        font: 'Courier'
      });

      doc.text(`${faker.company.companyName()}`, {
          width: 410,
          align: 'center',
        }
        );

      this.downloadRandomImage();

      doc.moveDown();
      doc.image('./apps/pdf-service/src/assets/images/image.jpg', 150, 145, {width: 300, height: 100});

      doc.moveDown();
      doc.text(`${faker.lorem.paragraphs(5)}`, 100, 300, {
        align: 'justify'
       });

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  private async downloadRandomImage() {
    this.httpService.axiosRef.get(`${faker.image.animals()}`, {
      responseType: 'stream'
    })
      .then(
        response =>
          new Promise<void>((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream('./apps/pdf-service/src/assets/images/image.jpg'))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
          }),
      );
  }
}
