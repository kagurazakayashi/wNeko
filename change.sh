texturename=$1
if [ ! -n "$1" ] ;then
texturename="neko2"
fi
rm -rf t_*.gif
cat texture/$texturename/$texturename.css > neko0.css
cp -f texture/$texturename/t_$texturename.gif ./
cat texture/$texturename/COPYRIGHT
echo " "