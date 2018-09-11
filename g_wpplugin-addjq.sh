mkdir wpNeko/lib
cp -f node_modules/jquery/dist/jquery.min.js wpNeko/lib/neko.min.js
java -jar node_modules/google-closure-compiler/compiler.jar --js wneko.js >> wpNeko/lib/neko.min.js
java -jar node_modules/google-closure-compiler/compiler.jar --js wnekoconf.js >> wpNeko/lib/neko.min.js
cat wneko.css > wpNeko/lib/neko.css
cat neko0.css >> wpNeko/lib/neko.css
cat nekocfg.css >> wpNeko/lib/neko.css
cp -f *.gif wpNeko/lib/