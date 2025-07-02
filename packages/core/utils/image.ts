const validateImageUrl = (url: string): Promise<string | boolean> => {
  return new Promise((resolve) => {
    const img = new Image();

    // prevent this promise from never resolving
    const timeoutId = setTimeout(() => {
      img.src = '';

      resolve(false);
    }, 5000);

    img.onload = () => {
      clearTimeout(timeoutId);

      resolve(url);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);

      resolve(false);
    };

    img.src = url;
  });
};

export const imageUtils = {
  validateImageUrl,
};
