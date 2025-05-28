import '@/App.css'
import MainLayout from './layouts/MainLayout'
import { Typography } from 'antd'

const { Title } = Typography

function App() {
  return (
    <MainLayout>
      <Title level={2}>网易云音乐</Title>
    </MainLayout>
  )
}

export default App
