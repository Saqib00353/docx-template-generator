const ImageModule = require("docxtemplater-image-module");

const imageOpts = {
  centered: false,
  getImage: function (tagValue, tagName) {
    return fs.readFileSync(tagValue);
  },
  getSize: function (img, tagValue, tagName) {
    // it also is possible to return a size in centimeters, like this : return [ "2cm", "3cm" ];
    return [150, 150];
  },
};

const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
  modules: [new ImageModule(imageOpts)],
});
doc.render({ image: "examples/image.png" });

const buffer = doc.getZip().generate({
  type: "nodebuffer",
  compression: "DEFLATE",
});

fs.writeFile("test.docx", buffer);
