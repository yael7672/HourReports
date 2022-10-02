const webpush = require('web-push'); // new
console.log(webpush.generateVAPIDKeys()); // new
const vapidKeys = { // new
    publicKey: 'BEkBHj59990TZZi4b0aIGrwSU_2_YLre7f12qIdkA6mxPOesF7A2VKGtd13DFGURnAqa-2_Nb5Dpb2eCxhuqjmo', // new
    privateKey: 'hW1K642YKMD1p4DRbVxcVhSO-ma9Q_Ygc_lLFOZc0cY' // new
  };
  const subscription = {
    endpoint: '',
    expirationTime: null,
    keys: {
        auth: '',
        p256dh: '',
    },
};
const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: 'assets/icons/icon-384x384.png',
        actions: [
            { action: 'bar', title: 'Focus last' },
            { action: 'baz', title: 'Navigate last' },
        ],
        data: {
            onActionClick: {
                default: { operation: 'openWindow' },
                bar: {
                    operation: 'focusLastFocusedOrOpen',
                    url: '/signin',
                },
                baz: {
                    operation: 'navigateLastFocusedOrOpen',
                    url: '/signin',
                },
            },
        },
    },
};
const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
}
// send notification
webpush.sendNotification(subscription, JSON.stringify(payload), options)
    .then((_) => {
        console.log('SENT!!!');
        console.log(_);
    })
    .catch((_) => {
        console.log(_);
    });