import express from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors()) 

const transporter = nodemailer.createTransport({
	service: 'gmail', 
	auth: {
		user: 'your-email@gmail.com',
		pass: 'your-email-password', 
	},
})

app.post('/send-form', (req, res) => {
	const { fullName, phone, email, dob, subject, date } = req.body

	const mailOptions = {
		from: 'your-email@gmail.com',
		to: 'recipient-email@example.com', 
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
