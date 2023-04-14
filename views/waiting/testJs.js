// 1번 파트
const teams = await Waiting.findAll({
    where: { enter_status: '대기' },
    order: [['start_time', 'ASC']],
    limit: 3,
    include: [{ model: Store, attributes: ['store_name'] }]
});
app.post('/enterNotification', async (req, res) => {
    const { waitingNum } = req.body;
    await Waiting.update({ enter_status: '알림' }, { where: { waiting_num: waitingNum } });
    res.send('success');
});

app.post('/enterCompleted', async (req, res) => {
    const { waitingNum } = req.body;
    await Waiting.update({ enter_status: '완료' }, { where: { waiting_num: waitingNum } });
    res.send('success');
});

app.post('/enterCancelled', async (req, res) => {
    const { waitingNum } = req.body;
    await Waiting.update({ enter_status: '유저취소' }, { where: { waiting_num: waitingNum } });
    res.send('success');
});
