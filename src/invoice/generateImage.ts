const certificatePath = process.env.PUBLIC_URL + '/certificate.png';
const watermarkPath = process.env.PUBLIC_URL + '/watermark.png';

const ROOT_2 = 1.4142135623730951;

function createCanvas(width: number, height?: number): HTMLCanvasElement {
  height = height || width;
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx?.clearRect(0, 0, width, height);

  return canvas;
}

const loadImage = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const img = document.createElement('img');
  img.setAttribute("crossOrigin", 'Anonymous');
  img.onload = function onload() {
    resolve(img);
  };
  img.onerror = () => {
    reject(Error(`Fail to load image ${src}`));
  }
  img.src = src;
});

const imageContain = (img: HTMLImageElement, a4w: number = 210) => {
  const { height, width } = img;
  if (width / height < ROOT_2) {
    return {
      w: a4w,
      h: height / width * a4w,
    }
  } else {
    const a4h = Math.round(a4w * ROOT_2);
    return {
      w: width / height * a4h,
      h: a4h,
    }
  }
}

const watermarkPosition = (
  a4w = 210,
): Array<number[]> => {
  const ratio = a4w / 210;
  const today = (new Date().getDate() % 11);

  const l = 150;
  const step = l / 10;
  const theta = Math.acos(today / 10);
  const patchTheta = 2 / 3 * Math.PI - theta;
  const x = 30;
  const y = 30;
  const p1 = [x + today * step, y];
  const p2 = [x, y + l * Math.sin(theta)];

  const p3 = [
    x + today * step + l * Math.cos(patchTheta),
    y + l * Math.sin(patchTheta)
  ];
  return [p1, p2, p3,].map(
    point => point.map((x) => x * ratio)
  );
}

const watermarkCanvas = (
  watermarkPNG: HTMLImageElement,
  a4w = 210,
): HTMLCanvasElement => {
  const a4h = Math.round(a4w * ROOT_2);
  const canvas = createCanvas(a4w, a4h);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const ratio = a4w / 2100;
    ctx.globalAlpha = 0.7;
    const positions = watermarkPosition(a4w);

    positions.forEach((position) => {
      const [x, y] = position;
      ctx.drawImage(
        watermarkPNG,
        x, y,
        watermarkPNG.width * ratio,
        watermarkPNG.height * ratio,
      );
    });
  }

  return canvas;
}

type CurrencyType = '人民币/CNY' | '美元/$';

export async function generateImage(
  imgSrc: string,
  name: string,
  amount: number,
  currency = '人民币/CNY' as CurrencyType,
): Promise<Blob> {
  if (!imgSrc) {
    return Promise.reject(`You have to pass the valid string for "imgSrc", but got ${imgSrc}`);
  }
  const a4w = 1050;
  const a4h = Math.round(a4w * ROOT_2);
  const rootCanvas = createCanvas(a4w * 2, a4h);
  const rootCtx = rootCanvas.getContext('2d');
  if (rootCtx === null) {
    return Promise.reject('Failed to generate Image, retry it later, please.');
  }

  const [transcationPNG, certificatePNG, watermarkPNG] = await Promise.all([
    loadImage(imgSrc),
    loadImage(certificatePath),
    loadImage(watermarkPath),
  ]);

  // draw image background
  rootCtx.drawImage(certificatePNG, 0, 0, a4w, a4h);

  // draw transaction screenshoot
  const transcationWH = imageContain(transcationPNG, a4w);
  rootCtx.drawImage(
    transcationPNG,
    a4w,
    0,
    transcationWH.w,
    transcationWH.h,
  );

  // draw name
  rootCtx.save();
  rootCtx.textAlign = 'center';
  rootCtx.font = 9 / 210 * a4w + 'px PingFang SC';
  rootCtx.fillText(
    name,
    150 / 210 * a4w,
    105 / 210 * a4w,
  );
  rootCtx.restore();

  // draw date
  rootCtx.save();
  rootCtx.textAlign = 'center';
  rootCtx.font = 9 / 210 * a4w + 'px PingFang SC';
  const date = new Date();
  rootCtx.fillText(
    date.getFullYear().toString(),
    37 / 210 * a4w,
    105 / 210 * a4w,
  );
  rootCtx.fillText(
    ('00' + (date.getMonth() + 1)).slice(-2),
    72 / 210 * a4w,
    105 / 210 * a4w,
  );
  rootCtx.fillText(
    ('00' + date.getDate()).slice(-2),
    102 / 210 * a4w,
    105 / 210 * a4w,
  );
  rootCtx.restore();

  // draw currency
  rootCtx.save();
  rootCtx.textAlign = 'center';
  rootCtx.font = 5 / 210 * a4w + 'px serif';
  rootCtx.fillText(
    currency,
    23 / 210 * a4w,
    1925 / 2100 * a4w,
  );
  rootCtx.textAlign = 'start';
  rootCtx.fillText(
    amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
    550 / 2100 * a4w,
    1925 / 2100 * a4w,
  );
  rootCtx.restore();


  // draw watermark
  rootCtx.drawImage(
    watermarkCanvas(watermarkPNG, a4w),
    a4w / 2,
    0
  );

  return new Promise((resolve, reject) => {
    rootCanvas.toBlob(function (blob) {
      if (blob !== null) {
        resolve(blob);
      } else {
        reject('Failed to convert to canvas.');
      }
    });
  })
}
