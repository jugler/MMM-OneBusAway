#Send Magic Mirror config to pimirror
echo "Uploading config.js to MagicMirror"
scp config.js pi@pi:MagicMirror/config/config.js
ssh pi@pi 'pm2 restart mm'
echo "Done Uploading and restarting magic mirror"