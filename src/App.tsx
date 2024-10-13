import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Survey from './Survey.tsx';
import Instruction from './Instruction.tsx';

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
