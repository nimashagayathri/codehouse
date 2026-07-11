const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

// A comprehensive regex to match most common UI emojis while leaving legitimate text alone
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{23F3}]/gu;

function cleanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (emojiRegex.test(content)) {
        // Replace emojis with nothing
        const newContent = content.replace(emojiRegex, '');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Cleaned: ${path.basename(filePath)}`);
    }
}

function sweepDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            sweepDir(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            cleanFile(fullPath);
        }
    }
}

sweepDir(srcDir);
console.log('UI Emoji sweep complete! The app is now strictly professional.');
