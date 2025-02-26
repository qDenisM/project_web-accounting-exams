import { Table, Typography, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Tesseract from 'tesseract.js'
import { useDispatch, useSelector } from 'react-redux'
import { updateScores, calculateTotalScore } from '../../redux/slices/examSlice'

const { Title } = Typography

export default function Exams() {
	const dispatch = useDispatch()
    const examData = useSelector(state => state.exam.examData)
  
    const processAttestat = async file => {
      const imagePath = URL.createObjectURL(file)
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(imagePath, 'rus')
        const grades = text.match(/\b(9|10|8|7|6|5)\b/g)
        if (grades) {
          const sum = grades.reduce((acc, grade) => acc + parseInt(grade), 0)
          const average = sum / grades.length
          const score = Math.round(average * 10)
          dispatch(updateScores({ attestat: score }))
          dispatch(calculateTotalScore())
          message.success(`Баллы из аттестата обработаны: ${score}`)
        } else {
          message.error('Не удалось найти оценки в аттестате')
        }
      } catch (error) {
        console.error('Ошибка обработки аттестата:', error)
        message.error('Ошибка обработки аттестата')
      }
    }
  
    const processCTCertificate = async file => {
      const imagePath = URL.createObjectURL(file)
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(imagePath, 'rus')
  
        const scoreMatch = text.match(
          /и\s+набрал\(а\)\s*—?\s*(\d+)\s*(?:\([^)]+\))?\s*баллов?/i
        )
        const subjectMatch = text.match(
          /(математике|истории\s+Беларуси|английскому\s+языку|русскому\s+языку|белорусскому\s+языку|физике|химии|биологии|немецкому\s+языку|французскому\s+языку|испанскому\s+языку|китайскому\s+языку|обществоведению|географии|всемирной\s+истории)/i
        )
        const subject = subjectMatch
          ? subjectMatch[1].toLowerCase().includes('математике')
            ? 'Математика'
            : subjectMatch[1].toLowerCase().includes('беларуси')
            ? 'История Беларуси'
            : subjectMatch[1].toLowerCase().includes('английскому')
            ? 'Английский язык'
            : subjectMatch[1].toLowerCase().includes('русскому')
            ? 'Русский язык'
            : subjectMatch[1].toLowerCase().includes('белорусскому')
            ? 'Белорусский язык'
            : subjectMatch[1].toLowerCase().includes('физике')
            ? 'Физика'
            : subjectMatch[1].toLowerCase().includes('химии')
            ? 'Химия'
            : subjectMatch[1].toLowerCase().includes('биологии')
            ? 'Биология'
            : subjectMatch[1].toLowerCase().includes('немецкому')
            ? 'Немецкий язык'
            : subjectMatch[1].toLowerCase().includes('французскому')
            ? 'Французский язык'
            : subjectMatch[1].toLowerCase().includes('испанскому')
            ? 'Испанский язык'
            : subjectMatch[1].toLowerCase().includes('китайскому')
            ? 'Китайский язык'
            : subjectMatch[1].toLowerCase().includes('обществоведению')
            ? 'Обществоведение'
            : subjectMatch[1].toLowerCase().includes('географии')
            ? 'География'
            : 'Всемирная история'
          : null
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null
  
        if (score && subject) {
          try {
            dispatch(updateScores({ ct: score, subject }))
            dispatch(calculateTotalScore())
            message.success(`Баллы из ЦТ обработаны: ${score}`)
          } catch (error) {
            message.error(error.message)
          }
        } else if (score === null) {
          message.error('Не удалось найти баллы в ЦТ-сертификате')
        } else if (!subject) {
          message.error('Не удалось определить предмет из ЦТ-сертификата')
        }
      } catch (error) {
        console.error('Ошибка обработки ЦТ-сертификата:', error)
        message.error('Ошибка обработки ЦТ-сертификата')
      }
    }
  
    const columns = [
      {
        title: 'Предмет',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Ваш балл',
        dataIndex: 'score',
        key: 'score',
      },
    ]
  
    return (
      <div>
        <Title level={3}>Экзамены</Title>
  
        <div style={{ marginBottom: '20px' }}>
          <Upload
            accept='image/*'
            showUploadList={false}
            beforeUpload={file => {
              processAttestat(file)
              return false
            }}
          >
            <Button icon={<UploadOutlined />}>Загрузить Аттестат</Button>
          </Upload>
  
          <Upload
            accept='image/*'
            showUploadList={false}
            beforeUpload={file => {
              processCTCertificate(file)
              return false
            }}
            style={{ marginLeft: '10px' }}
          >
            <Button icon={<UploadOutlined />}>Загрузить ЦТ-сертификат</Button>
          </Upload>
        </div>
  
        <Table
          columns={columns}
          dataSource={examData}
          rowKey='name'
          pagination={false}
          bordered
        />
      </div>
    )
}
