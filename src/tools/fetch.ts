function fetch(url: string, options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, url);
    xhr.withCredentials = true;

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = function() {
      reject(xhr.statusText);
    };

    xhr.send(options.body);
  });
}
