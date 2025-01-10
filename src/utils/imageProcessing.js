// Convert RGB to HSL helper function
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

export const sortPixelsByColor = async (img) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = [];

  // Convert pixels to array of objects with color information
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    
    // Calculate luminosity
    const luminosity = (r + g + b) / 3;
    
    // Determine color group using strict thresholds
    let colorGroup;
    const threshold = 1.2; // Adjust this value to make grouping more/less strict
    
    if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10) {
      colorGroup = 0; // grayscale
    }
    else if (r > g * threshold && r > b * threshold) {
      colorGroup = 1; // red
    }
    else if (g > r * threshold && g > b * threshold) {
      colorGroup = 2; // green
    }
    else if (b > r * threshold && b > g * threshold) {
      colorGroup = 3; // blue
    }
    else if (r > b && g > b) {
      colorGroup = 4; // yellow
    }
    else if (r > g && b > g) {
      colorGroup = 5; // magenta
    }
    else if (g > r && b > r) {
      colorGroup = 6; // cyan
    }
    else {
      colorGroup = 7; // mixed colors
    }

    pixels.push({
      r, g, b, a,
      colorGroup,
      luminosity
    });
  }

  // Sort pixels by color group first, then by luminosity
  pixels.sort((a, b) => {
    // First sort by color group
    if (a.colorGroup !== b.colorGroup) {
      return a.colorGroup - b.colorGroup;
    }
    
    // Within same color group, sort by luminosity
    return b.luminosity - a.luminosity;
  });

  // Put sorted pixels back into imageData
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    imageData.data[i * 4] = pixel.r;
    imageData.data[i * 4 + 1] = pixel.g;
    imageData.data[i * 4 + 2] = pixel.b;
    imageData.data[i * 4 + 3] = pixel.a;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}; 