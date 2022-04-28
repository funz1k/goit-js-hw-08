import VimeoPlayer from '@vimeo/player';
const throttle = require('lodash.throttle');


let savedData = localStorage.getItem('videoplayer-current-time')
const parseData = JSON.parse(savedData)

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onLocalRecordTime, 1000))

function onLocalRecordTime(event) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(event))
};

player.setCurrentTime(parseData ? parseData.seconds : 0)

