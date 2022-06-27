// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:8080/',
  apiVersion: 'api/v1/',
  Imagekitio: {
    publicKey: 'public_7yxYKRw/TRLq2AbI1L7xTXUV+Aw=',
    urlEndpoint: 'https://ik.imagekit.io/mu8g4or2k',
    authenticationEndpoint: 'http://localhost:8080/auth',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
