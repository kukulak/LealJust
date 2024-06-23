import QRCode from "qrcode";

export function qrCodeCreator(infoToQr) {
  var opts = {
    errorCorrectionLevel: "H",
    type: "terminal",
    quality: 0.7,
    margin: 1,
    color: {
      dark: "#3F4451ff",
      light: "#ffffffff",
    },
  };

  // "https://incomparable-snickerdoodle-b2eb5f.netlify.app/perro/664f99f245fc6dd54bb5c011",

  return QRCode.toFile("file.png", infoToQr, opts, function (err, url) {
    console.log("FROM QR CREATROR", url);
  });

  // QRCode.toString(infoToQr, opts, function (err, url) {
  //   console.log(url);
  // });
}

// qrCodeCreator(
//   "https://incomparable-snickerdoodle-b2eb5f.netlify.app/perro/664f99f245fc6dd54bb5c011",
// );
