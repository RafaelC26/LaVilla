const UNSPLASH_HOST = "images.unsplash.com";

export const getOptimizedImageUrl = (rawUrl, options = {}) => {
  if (!rawUrl) {
    return rawUrl;
  }

  const {
    width,
    height,
    quality = 68,
    format = "webp",
    fit = "crop"
  } = options;

  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.hostname !== UNSPLASH_HOST) {
      return rawUrl;
    }

    const params = parsedUrl.searchParams;
    params.set("auto", "format");
    params.set("fit", fit);
    params.set("q", String(quality));
    params.set("fm", format);
    params.set("dpr", "1");

    if (width) {
      params.set("w", String(width));
    }

    if (height) {
      params.set("h", String(height));
    }

    return parsedUrl.toString();
  } catch {
    return rawUrl;
  }
};
