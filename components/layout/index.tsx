import { Layout as AntdLayout } from 'antd';

import FooterDefault from '@components/footer';
import HeaderDefault from '@components/header';
import { useContext } from 'react';
import { ThemeContext } from '@pages/_app';

const { Header, Footer, Content } = AntdLayout;

const Layout = ({ children }) => {
  const theme = useContext(ThemeContext);
  return (
    <AntdLayout className='layout'>
      <Header className='layout-header'>
        <HeaderDefault theme={theme} />
      </Header>
      <Content className='layout-content'>{children}</Content>
      <Footer className='layout-footer'>
        <FooterDefault />
      </Footer>
    </AntdLayout>
  );
};

export default Layout;
