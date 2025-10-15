const fs = require('fs');
const path = require('path');

const outputDir = 'dist';
const outputFile = path.join(outputDir, 'bundle.ts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function resolveImports(filePath, seen = new Set()) {
    console.log(__filename);
    console.log(__dirname);
    console.log(process.cwd());
    let content = fs.readFileSync(filePath, 'utf-8');
    seen.add(filePath);

    const importRegex = /import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?["'\s](.*[@\w_-]+)["'\s].*;?/g;

    let match;
    while ((match = importRegex.exec(content))) {
        const importPath = match[1];

        if (importPath.startsWith('.')) {
        const resolvedPath = path.resolve(path.dirname(filePath), importPath);
        let dependencyPath = resolvedPath;
        
        // Check for .ts extension
        if (!dependencyPath.endsWith('.ts')) {
            dependencyPath += '.ts';
        }

        if (fs.existsSync(dependencyPath) && !seen.has(dependencyPath)) {
            const dependencyContent = resolveImports(dependencyPath, seen);
            content = content.replace(match[0], dependencyContent);
        }
        }
    }

    return content;
}

try {
    const bundledContent = resolveImports(process.argv.slice(2)[0]);
    fs.writeFileSync(outputFile, bundledContent);
    console.log(`Successfully created flat file at ${outputFile}`);
} catch (error) {
    console.error('Error during bundling:', error);
}
