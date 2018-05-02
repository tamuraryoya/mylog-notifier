const notifier = require('node-notifier');
const nc = new notifier.NotificationCenter();
const CronJob = require('cron').CronJob;
const moment = require('moment');
const openurl = require('openurl');

const mylog = 'https://docs.google.com/spreadsheets/d/1cVzmMLplPLdG3x3tCMPHxYQRD-xR7dK4qu5VAhwxbR8/edit#gid=0';
let timestamp = Date.now();

const job = new CronJob({
  cronTime: '00 */30 10-18 * * 1-5',
  onTick: () => {
    const now = Date.now();
    
    nc.notify({
      title: '作業のログを残しませんか？',
      message: now - timestamp > 1000 * 60 * 60 * 1.5 ?
        `最後の更新は ${Math.floor(moment(now).diff(timestamp, 'hours', true) * 10) / 10}h 前です。`: '' +
        'タスクの更新とこれまでの作業ログを残しましょう',
      icon: __dirname + '/icon.png',
      sound: true,
      wait: true,
      closeLabel: '結構です',
      actions: '作業ログ',
    }, (err, res, meta) => {
      if (meta.activationValue !== '作業ログ') {
        return;
      }
      timestamp = now;
      openurl.open(mylog);
    });
  },
})

job.start();