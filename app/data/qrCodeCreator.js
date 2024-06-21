import QRCode from "qrcode";
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

QRCode.toFile(
  "file.png",
  "https://incomparable-snickerdoodle-b2eb5f.netlify.app/perro/664f99f245fc6dd54bb5c011",
  opts,
  function (err, url) {
    console.log(url);
  },
);

// QRCode.toString(
//   "https://incomparable-snickerdoodle-b2eb5f.netlify.app/perro/664f99f245fc6dd54bb5c011",
//   opts,
//   function (err, url) {
//     console.log(url);
//   },
// );
