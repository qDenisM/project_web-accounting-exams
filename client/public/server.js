import express from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 5000

// Настроим парсинг JSON данных
app.use(bodyParser.json())
app.use(cors()) // Для разрешения запросов с другого домена

// Настроим транспорт для отправки почты
const transporter = nodemailer.createTransport({
	service: 'gmail', // Используйте почтовый сервис (например, Gmail)
	auth: {
		user: 'your-email@gmail.com',
		pass: 'your-email-password', // Используйте безопасные способы для хранения пароля
	},
})

// Обработчик для приема данных формы и отправки письма
app.post('/send-form', (req, res) => {
	const { fullName, phone, email, dob, subject, date } = req.body

	const mailOptions = {
		from: 'your-email@gmail.com',
		to: 'recipient-email@example.com', // Почта, на которую будет отправлено письмо
		subject: 'Новая заявка на ЦТ',
		text: `Полное имя: ${fullName}\nНомер телефона: ${phone}\nEmail: ${email}\nДата рождения: ${dob}\nПредмет: ${subject}\nДата экзамена: ${date}`,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
			res.status(500).send('Ошибка при отправке письма')
		} else {
			console.log('Email sent: ' + info.response)
			res.status(200).send('Письмо отправлено успешно')
		}
	})
})

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
