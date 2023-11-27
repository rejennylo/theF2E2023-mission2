import fs from 'fs'; // 匯入 Node.js 檔案系統
import csv from 'csv-parser'; // 匯入 csv-parser module
import path from 'path'; // 匯入 Node.js path module

const INPUT_DIR_PATH = './source/vote-csv';
const OUTPUT_DIR_PATH = './src/data/vote-json';

// 讀取各別 csv 解析成 JSON，並存入指定資料夾
function convertCSVtoJson(dataFilePath) {
  const results = [];
  fs.createReadStream(dataFilePath) // 創建資料讀取流
    .pipe(csv({ headers: false })) // 使用轉換流解析csv，並忽略第一行欄位的標題（返回 array，不返回key-value）
    .on('data', (data) => results.push(data)) // 將每一行資料推入 results 中
    // 所有資料讀取結束時觸發此事件
    .on('end', () => {
      const relativePath = path.relative(INPUT_DIR_PATH, dataFilePath); // 計算檔案路徑(dataFilePath)與來源路徑(INPUT_DIR_PATH)的相對路徑
      const newDir = path.join(OUTPUT_DIR_PATH, path.dirname(relativePath)); // 取得相對路徑(relativePath) 與輸出路徑(OUTPUT_DIR_PATH)並結合成完整資料夾路徑
      fs.mkdirSync(newDir, { recursive: true }); // 建立新目錄，如果目錄不存在就遞迴創建
      const newFilePath = path.join(
        newDir,
        path.basename(dataFilePath, '.csv') + '.json'
      ); // 計算新的檔路徑並將副檔名改為.json
      fs.writeFileSync(newFilePath, JSON.stringify(results, null, 2)); // 將 results 轉換成 JSON 格式並寫入新檔案
      console.log('File saved to ' + newFilePath);
    });
}

// 遍歷每個子資料夾及檔案，如果是 csv 就調用 convertCSVtoJson
function walkDir(dir) {
  const files = fs.readdirSync(dir); // 同步取得目錄中的所有內容，並將取得的陣列存入 files
  // 遍歷所有檔案
  files.forEach((file) => {
    const filePath = path.join(dir, file); // 將取得的路徑合併成完整字串存入 filePath
    const stat = fs.statSync(filePath); // 同步取得檔案或資料夾訊息，返回一個 fs.Stats 物件，再將它存入 stat

    if (stat.isDirectory()) {
      walkDir(filePath); // 如果是資料夾，回傳路徑繼續向下找尋
    } else if (path.extname(filePath) === '.csv') {
      convertCSVtoJson(filePath); // 如果檔案副檔名為 csv，呼叫函示並將檔案路徑傳入函式
    }
  });
}

walkDir(INPUT_DIR_PATH);

