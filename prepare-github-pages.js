const fs = require('fs');
const path = require('path');

// Create the docs directory if it doesn't exist (GitHub Pages can serve from /docs)
if (!fs.existsSync('docs')) {
  fs.mkdirSync('docs');
}

// Copy the root index.html to the docs directory
fs.copyFileSync('index.html', 'docs/index.html');

// Create the /docs/client folder
if (!fs.existsSync('docs/client')) {
  fs.mkdirSync('docs/client');
}

// Copy client/index.html to docs/client/index.html
// First check if the source exists
if (fs.existsSync('client/index.html')) {
  // Now modify the file to use relative paths for scripts
  let clientIndexHtml = fs.readFileSync('client/index.html', 'utf8');
  
  // Update script paths to be relative
  clientIndexHtml = clientIndexHtml.replace('src="/src/main.tsx"', 'src="./src/main.tsx"');
  
  // Write the modified file to docs/client/index.html
  fs.writeFileSync('docs/client/index.html', clientIndexHtml);
  
  console.log('Created docs/client/index.html with relative paths');
} else {
  console.error('Error: client/index.html not found!');
}

// Copy relevant client files to docs/client
// This is a simplified example - in a real project you would use a build tool like Vite
console.log('GitHub Pages preparation complete!');
console.log('');
console.log('To use this with GitHub Pages:');
console.log('1. Push this code to your GitHub repository');
console.log('2. Go to your repo Settings > Pages');
console.log('3. Under "Source", select "Deploy from a branch"');
console.log('4. Under "Branch", select "main" and "/docs" folder, then click Save');
console.log('');
console.log('Note: This is a basic setup. For a production application, you should use a proper build process.');