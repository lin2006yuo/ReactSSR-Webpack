require('@babel/register')({
  presets: [ '@babel/preset-env', '@babel/preset-react' ]
});
require('css-modules-require-hook')({
  extensions: ['.css']
})
require('./start')
