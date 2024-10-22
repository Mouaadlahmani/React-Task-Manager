import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Tasks from './tasks/tasks';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/tasks' element={<Tasks />} />
            </Routes>
        </div>
    );
}

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to the Task Manager</h1>
            <Link to="/tasks" className="view-tasks-link">View Your Tasks</Link>
        </div>
    );
};

export default App;
