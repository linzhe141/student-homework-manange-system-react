import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/router';
import { AuthRouter } from './router/AuthRouter';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <AuthRouter>
          <Router></Router>
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
