export function hideLoader(delay, statuss) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(!statuss); 
      }, delay);
    });
  }
  