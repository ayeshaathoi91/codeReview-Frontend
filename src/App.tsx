import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Survey from './Survey';
import NotFound from './notFound';

export function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/codeReview-Frontend/" element={<Survey />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
