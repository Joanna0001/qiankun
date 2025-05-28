import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        {/* 头部内容 */}
      </Header>
      <Content style={{ padding: '20px', minHeight: 'calc(100vh - 64px - 70px)' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {/* 底部内容 */}
      </Footer>
    </Layout>
  );
};

export default MainLayout; 