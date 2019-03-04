import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as QRCode from 'qrcode';

interface CoordinatesInterface {
  x: number;
  y: number;
}

@Injectable()
export class QRCodesPDFService {
  private doc;
  private qrSize: number;
  private position: CoordinatesInterface = { x: 0, y: 0 };
  private page;
  private margins: CoordinatesInterface;
  private textMargin: number;
  private qrBoxSize: CoordinatesInterface;
  private avgFontWidth: number;
  private fontSize: number;
  private qrCodes: any[] = [];

  constructor() { }

  private initialize(params: any) {
    this.doc = new jsPDF(params);
    this.moveTo ({x: 0, y: 0});
  }

  private moveTo(position: CoordinatesInterface) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  private moveOf(traslation: CoordinatesInterface) {
    this.position.x += traslation.x;
    this.position.y += traslation.y;
  }

  private write(text: string) {
    this.doc.text(text, this.position.x, this.position.y);
  }

  private addImage(imgData) {
    this.doc.addImage(imgData, 'JPEG', this.position.x, this.position.y, this.qrSize, this.qrSize);
  }

  private resetCoordinates() {
    this.moveTo({ x: 0, y: 0 });
  }

  private addMargins() {
    this.moveOf(this.margins);
  }

  private addPage() {
    this.doc.addPage();
    this.resetCoordinates();
    this.addMargins();
  }

  private checkForMargins() {
    if (this.position.x + this.qrBoxSize.x > this.page.width - this.margins.x)
      this.moveTo({ x: this.margins.x, y: this.position.y + this.qrBoxSize.y });
    if (this.position.y > this.page.width - this.margins.y)
      this.addPage();
  }

  private async addQRCode(qrCode) {
    const startX = this.avgFontWidth * qrCode.id;
    this.moveOf({ x: startX + this.margins.x, y: this.fontSize });
    this.moveOf({ x: -startX, y: 0 });
    this.moveOf({ x: 3, y: 0 });
    this.write(qrCode.name);
    this.moveOf({ x: -3, y: 0 });
    this.moveOf({ x: 0, y: this.textMargin });
    this.addImage(this.qrCodes[qrCode.id]);
    this.moveOf({ x: this.qrSize, y: - (this.fontSize + this.textMargin) });
    this.moveOf({ x: 20, y: 0 });
    this.checkForMargins();
  }

  private print() {
    this.doc.autoPrint();
  }

  private save() {
    this.doc.save();
  }

  async generateQRCodesArray(qrCodes: any[]) {
    for (const qrCode of qrCodes)
      this.qrCodes[qrCode.id] = await QRCode.toDataURL(JSON.stringify(qrCode));
  }

  async generateQRCodes(qrCodes, qrSize, marginBetweenPercentage, pageFormat, fontSize, avgFontWidth) {
    await this.generateQRCodesArray(qrCodes);

    if (pageFormat.toLowerCase() === 'a4') this.page = { width: 210, height: 297 };

    this.fontSize = fontSize;
    this.qrSize = qrSize;
    this.avgFontWidth = avgFontWidth;

    this.margins = {
      x: qrSize * marginBetweenPercentage / 100,
      y: marginBetweenPercentage * 0 * (fontSize + qrSize) / 100
    };

    this.textMargin = fontSize * marginBetweenPercentage / 100;

    this.qrBoxSize = {
      x: qrSize + this.margins.x,
      y: qrSize + fontSize + this.textMargin + this.margins.y
    };

    /*this.maxQRs = {
      row: Math.floor(this.page.width / this.qrBoxSize.x),
      column: Math.floor(this.page.height / this.qrBoxSize.y)
    };*/

    this.initialize({
      orientation: 'p',
      unit: 'mm',
      format: pageFormat.toLowerCase()
    });

    this.doc.setFontSize(this.fontSize);

    this.moveOf(this.margins);

    qrCodes.forEach(qrCode => this.addQRCode(qrCode));

    this.print();
    this.save();
  }

}
