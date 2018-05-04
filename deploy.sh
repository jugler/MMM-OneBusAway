#Send Magic Mirror config to pimirror
echo "Uploading config.js to MagicMirror"
scp config.js pi@pi:MagicMirror/config/config.js

echo "Updating module MMM-OneBusAway"
scp MMM-OneBusAway.js pi@pi:MagicMirror/modules/MMM-OneBusAway/MMM-OneBusAway.js
scp node_helper.js pi@pi:MagicMirror/modules/MMM-OneBusAway/node_helper.js

echo "Restarting MagicMirror"
ssh pi@pi 'pm2 restart mm'
echo "Done Uploading and restarting magic mirror"