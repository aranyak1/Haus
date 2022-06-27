import fs, { read } from 'fs';
import { readdirSync, rename } from 'fs';
import { resolve } from 'path';

//Modify user data
let userData = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// let i = 1;
// const dirPath = resolve(__dirname, '../img/users');
// const userImages = readdirSync(dirPath);
// console.log(userImages);
// userData = userData.map((user: any) => {
//     if (i % 24 == 0) {
//       user.photo = `default.jpg`;
//   } else {
//     user.photo = userImages[i%24];
//   }
// console.log(user);
//     i++;
//     return user;
// });
// console.log(userData);
// fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(userData));

//Modify home data
let homeData = JSON.parse(fs.readFileSync(`${__dirname}/homes.json`, 'utf-8'));
// const dirPath = resolve(__dirname, '../img/homes');
// const imageFolder = ['Bathroom', 'Bedroom', 'Dining', 'Kitchen', 'Livingroom'];
// console.log(homeData.length,userData.length);
let i = 0;
// const bath = readdirSync(dirPath + '/Bathroom');
// const bed = readdirSync(dirPath + '/Bedroom');
// const din = readdirSync(dirPath + '/Dining');
// const kit = readdirSync(dirPath + '/Kitchen');
// const liv = readdirSync(dirPath + '/Livingroom');

homeData = homeData.map((home: any) => {
  // if (i < 25) {
  //   home.images = [liv[i], din[i], bed[i], kit[i],  bath[i]];
  // } else {
  //   i = 0;
  //   home.images = [liv[i], din[i], bed[i], kit[i], bath[i]];
  // }

  //     home.owner = userData[0]._id.$oid;
  // home.location = [];
  
  if (home.address.state == 'Karnataka') {
    home.furnishing = 'furnished';
    home.homeType = 'private';
        //   home.address.city = 'Banglore';
        //   home.address.locality = 'Indira Nagar';
        //   home.address.pincode = '560038';
        // home.location = {
        //   coordinates: [77.641525, 12.982188],
        // };

  } else if (home.address.state == 'Andhra Pradesh') {
        home.furnishing = 'furnished';
        home.homeType = 'shared';
        //           home.address.city = 'Visakhapatnam';
        //           home.address.locality = 'Maharani Peta';
        //           home.address.pincode = '530002';
        // home.location = {
        //   coordinates: [83.312378, 17.707363],
        // };
  } else if (home.address.state == 'Telangana') {
            home.furnishing = 'unfurnished';
            home.homeType = 'shared';
        //           home.address.city = 'Hyderabad';
        //           home.address.locality = 'Gachibowli';
        //           home.address.pincode = '500032';
        // home.location = {
        //   coordinates: [78.331454, 17.422706],
        // };
  } else {
                home.furnishing = 'semi-furnished';
                home.homeType = 'shared';
          //         home.address.city = 'Bhubaneswar';
          //         home.address.locality ='Khandagiri Square',
          //         home.address.pincode = '751030';
          // home.location = {
          //   coordinates: [85.781378, 20.25609],
          // };
    }
  i++;
  return home;
});
console.log(homeData);

fs.writeFileSync(`${__dirname}/homes.json`, JSON.stringify(homeData));
