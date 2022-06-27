//this script is used to rename images of home and users
//to run this script in command line -  npx ts-node renameScript.ts
import { readdirSync, rename } from 'fs';
import { resolve } from 'path';

const imageFolder = ['Bathroom', 'Bedroom', 'Dining', 'Kitchen', 'Livingroom'];
const imageAbbr = ['bath', 'bed', 'din', 'kitchen', 'living'];
const dirPath = resolve(__dirname, 'homes');

// Get an array of the files inside the folder

let i = 0,count=1;
imageFolder.forEach(folder => {
  const images = readdirSync(dirPath + '/' + folder);
  images.forEach(img => {
    console.log(img);
    return rename(
      dirPath + '/' + folder + `/${img}`,
      dirPath + '/' + folder + `/${imageAbbr[i]}_${count++}.jpeg`,
      err => console.log(err),
    );
  });
  count = 1;
  i++;
});
