import fs from 'fs';

export function fsmkdir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, async (err) => {
      if (err)
        reject(err);
      resolve(path);
    });
  });
}
export function filemv(file, path) {
  return new Promise((resolve, reject) => {
    file.mv(path, async (err) => {
      if (err)
        reject(err);
      resolve(path);
    });
  });
}