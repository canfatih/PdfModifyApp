
const { PDFDocument } = require('pdf-lib');
const fs = require('fs')
const csv = require('csv-parser');
const { create } = require('domain');
const {rgb}=require('pdf-lib')
const{degrees}=require('pdf-lib');
const { type } = require('os');

const Uts = () => {
    
    
  fs.createReadStream('GH Wires.csv')
    .pipe(csv({separator: ',' }))
    .on('data', (data) =>modifypdf(data["Primary DI Number (BARCODE NUMBER)"],data["Description"],data["Versiyon Model"],data["Quantity per package configuration"]))
    .on('end', () => {
    });

}


async function modifypdf(barkodnum,productname,refcode,Quantity){
  console.log(barkodnum)
  const pdfData = await fs.readFileSync('./şablon1.pdf');
  const pdfDoc = await PDFDocument.load(pdfData)
    
    
    
    
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize()
    firstPage.drawText(barkodnum, {
      x: 84,
      y: 572.5,
      size: 4,
      color: rgb(0,0,0),
     
    })
    firstPage.drawText(productname, {
      x: 30,
      y: 690,
      size: 9,
      color: rgb(0,0,0),
      
      
    })
    firstPage.drawText(refcode, {
      x: 48,
      y: 654,
      size: 8,
      color: rgb(0, 0, 0),
  
    })
    firstPage.drawText(Quantity,{
      x: 115,
      y: 640,
      size: 8,
      color: rgb(0, 0, 0),
    })
   
    var folder = './pdfler';

    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }
   
  
    const pdfBytes = await pdfDoc.save()
    await fs.writeFileSync(`./${folder}/`+refcode+".pdf",pdfBytes);
  
  }




//pdf Creater--
//-----------------------------------------------------------------------------------------------------
// //file:///C:/Users/canfa/Downloads/36-L1-8U-V.pdf
//  async function createpdf(a,b,c){
// // Create a new PDFDocument
// const pdfDoc = await PDFDocument.create()


// // Add a blank page to the document
// const page = pdfDoc.addPage()

// // Get the width and height of the page
// const { width, height } = page.getSize()

// // Draw a string of text toward the top of the page
// const fontSize = 30
// page.drawText(a, {
//   x: 50,
//   y: height - 4 * fontSize,
//   size: fontSize,
//   color: rgb(0, 0.53, 0.71),
// })
// page.drawText(b, {
//   x: 50,
//   y: height - 5 * fontSize,
//   size: fontSize,
//   color: rgb(0, 0.53, 0.71),
// })
// page.drawText(c, {
//   x: 50,
//   y: height - 6 * fontSize,
//   size: fontSize,
//   color: rgb(0, 0.53, 0.71),
// })
// const pdfBytes = await pdfDoc.save()
// await fs.writeFileSync(c+".pdf",pdfBytes);
// }
Uts();
