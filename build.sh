mkdir -p dist;

# node-sass should be installed
node-sass --output-style expanded --output dist/ src/

cp -R src/ dist/

echo "done at `date`"