const fs = require("fs");
const { parse } = require("csv-parse");

async function parseData(data) {
  return new Promise((resolve, reject) => {
    parse(data, { columns: false, trim: true }, function (err, rows) {
      if (err) reject(err);
      const rawData = {};
      for (let i = 1; i < rows.length; i++) {
        const [
          categoryName,
          dishName,
          dishDescription,
          priceType,
          priceDetails,
        ] = rows[i];
        rawData[categoryName] = {
          ...rawData[categoryName],
          [dishName]: {
            description: dishDescription,
            priceType,
            priceDetails: (() => {
              if (priceType === "Single") return priceDetails;
              const variants = priceDetails.split("|");
              return variants.reduce((obj, variant, idx) => {
                const [type, price] = variant.split(",");
                obj[idx] = { type, price };
                return obj;
              }, {});
            })(),
          },
        };
      }
      resolve(rawData);
    });
  });
}

async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, async function (err, fileData) {
      if (err) reject(err);
      const data = await parseData(fileData);
      fs.unlinkSync(filePath);
      resolve(data);
    });
  });
}

module.exports = async (filePath) => await readFile(filePath);
