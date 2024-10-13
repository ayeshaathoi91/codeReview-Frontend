import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Survey from './Survey';
import Instruction from './Instruction';

export function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/codeReview/Survey/" element={<Survey />} />
          <Route path="/codeReview/" element={<Instruction />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
