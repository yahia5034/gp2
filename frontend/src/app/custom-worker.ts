import { createWorker } from 'tesseract.js';

export const createWorkerInstance = () => {
  return createWorker({
    logger: m => console.log(m),
    workerPath: 'tesseract.js',
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    corePath: 'https://tessdata.projectnaptha.com/4.0.0',
  });
};