// 小程序启动测试脚本
const fs = require('fs');
const path = require('path');

console.log('=== 一品香蛋糕房小程序启动测试 ===\n');

// 检查必要文件是否存在
const requiredFiles = [
  'app.js',
  'app.json',
  'app.wxss',
  'project.config.json',
  'sitemap.json'
];

console.log('1. 检查核心文件:');
let allFilesExist = true;
for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`  ${file}: ${exists ? '✓ 存在' : '✗ 缺失'}`);
  if (!exists) allFilesExist = false;
}

// 检查页面文件
console.log('\n2. 检查页面配置 (app.json):');
try {
  const appJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'app.json'), 'utf8'));
  const pages = appJson.pages || [];
  console.log(`  配置页面数: ${pages.length}`);
  
  console.log('  检查页面文件:');
  for (const page of pages) {
    const pagePath = path.join(__dirname, page);
    const jsExists = fs.existsSync(pagePath + '.js');
    const wxmlExists = fs.existsSync(pagePath + '.wxml');
    const wxssExists = fs.existsSync(pagePath + '.wxss');
    const jsonExists = fs.existsSync(pagePath + '.json');
    
    const allExist = jsExists && wxmlExists && wxssExists && jsonExists;
    console.log(`  ${page}: ${allExist ? '✓ 完整' : '✗ 不完整'}`);
    if (!allExist) {
      if (!jsExists) console.log(`    - 缺失: ${page}.js`);
      if (!wxmlExists) console.log(`    - 缺失: ${page}.wxml`);
      if (!wxssExists) console.log(`    - 缺失: ${page}.wxss`);
      if (!jsonExists) console.log(`    - 缺失: ${page}.json`);
    }
  }
} catch (error) {
  console.log(`  ✗ 无法读取 app.json: ${error.message}`);
  allFilesExist = false;
}

// 检查图片资源
console.log('\n3. 检查图片资源:');
const imagesDir = path.join(__dirname, 'images');
if (fs.existsSync(imagesDir)) {
  const imageCount = countFiles(imagesDir, ['.png', '.jpg', '.jpeg', '.gif']);
  console.log(`  图片总数: ${imageCount}`);
  
  // 检查关键图片目录
  const keyDirs = ['banner', 'icons', 'products', 'tabbar', 'avatars'];
  for (const dir of keyDirs) {
    const dirPath = path.join(imagesDir, dir);
    if (fs.existsSync(dirPath)) {
      const count = countFiles(dirPath, ['.png', '.jpg', '.jpeg', '.gif']);
      console.log(`  ${dir}/: ${count} 个图片`);
    } else {
      console.log(`  ${dir}/: ✗ 目录不存在`);
    }
  }
} else {
  console.log('  ✗ images 目录不存在');
}

// 检查 app.json 语法
console.log('\n4. 检查配置文件语法:');
try {
  const appJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'app.json'), 'utf8'));
  
  // 检查 tabBar 配置
  if (appJson.tabBar && appJson.tabBar.list) {
    console.log(`  tabBar 配置: ✓ 有 ${appJson.tabBar.list.length} 个标签页`);
    
    // 检查 tabBar 图标
    for (const item of appJson.tabBar.list) {
      if (item.iconPath) {
        const iconPath = path.join(__dirname, item.iconPath);
        const exists = fs.existsSync(iconPath);
        console.log(`    ${item.iconPath}: ${exists ? '✓ 存在' : '✗ 缺失'}`);
      }
      if (item.selectedIconPath) {
        const selectedIconPath = path.join(__dirname, item.selectedIconPath);
        const exists = fs.existsSync(selectedIconPath);
        console.log(`    ${item.selectedIconPath}: ${exists ? '✓ 存在' : '✗ 缺失'}`);
      }
    }
  }
  
  console.log('  配置文件语法: ✓ 正确');
} catch (error) {
  console.log(`  配置文件语法: ✗ 错误 - ${error.message}`);
  allFilesExist = false;
}

console.log('\n=== 测试结果 ===');
if (allFilesExist) {
  console.log('✅ 所有必要文件都存在，小程序应该可以正常启动');
  console.log('   请在微信开发者工具中导入项目进行测试');
} else {
  console.log('❌ 存在缺失文件，需要修复');
}

// 辅助函数：统计文件数量
function countFiles(dir, extensions) {
  if (!fs.existsSync(dir)) return 0;
  
  let count = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (extensions.includes(ext)) {
        count++;
      }
    } else if (item.isDirectory()) {
      count += countFiles(path.join(dir, item.name), extensions);
    }
  }
  
  return count;
}