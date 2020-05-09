mkdir -p dist

# node-sass should be installed
node-sass --output-style expanded --output dist/ src/

cp -R src/ dist/

# remove all scss files
rm dist/styles/*.scss

echo "done at $(date)"
