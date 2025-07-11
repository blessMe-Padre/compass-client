export async function POST(request) {
    if (req.method === 'POST') {
        const captureResponse = req.body.captureResponse

        fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            body: new URLSearchParams({
                secret: process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY,
                response: captureResponse
            })
        })
            .then(r => r.json())
            .then(d => {
                console.log({ d })
                if (!d.success) {
                    res.status(500).json({ ok: false, message: 'Возможно вы робот!' })
                } else {
                    res.status(200).json({ ok: true, message: 'Ваши данные успешно отправлены!' })
                }
            })
            .catch(err => {
                res.status(200).json({ ok: false, message: 'Произошла ошибка' })
            })
    } else {
        res.status(200).json({ ok: false, message: 'Доступен только POST-запрос' })
    }
}