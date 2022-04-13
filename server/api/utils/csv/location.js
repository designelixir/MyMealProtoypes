const fs = require("fs");
const { parse } = require("csv-parse");

async function parseData(data) {
  return new Promise((resolve, reject) => {
    parse(data, { columns: false, trim: true }, function (err, rows) {
      if (err) reject(err);
      const rawData = [];
      for (let i = 1; i < rows.length; i++) {
        const [
          crossContactProcedure,
          streetOne,
          streetTwo,
          city,
          state,
          zip,
          country,
        ] = rows[i];
        rawData.push({
          crossContactProcedure,
          streetOne,
          streetTwo,
          city,
          state,
          zip,
          country,
        });
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
