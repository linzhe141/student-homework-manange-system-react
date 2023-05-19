import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/router';
import { AuthRouter } from './router/AuthRouter';
function App() {
  return (
    <BrowserRouter>
      <AuthRouter>
        <Router></Router>
      </AuthRouter>
    </BrowserRouter>
  );
}

export default App;
