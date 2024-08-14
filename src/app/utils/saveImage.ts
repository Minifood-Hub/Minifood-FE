import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';

export const saveImage = async () => {
  try {
    const node = document.getElementById('quotation-modal');
    if (node) {
      const dataUrl = await toPng(node);
      saveAs(dataUrl, '견적서.png');
    }
  } catch (error) {
    console.error('이미지 저장 중 오류 발생 :', error);
  }
};
