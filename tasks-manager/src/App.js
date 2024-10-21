import './App.css';
import {useEffect, useState} from "react";
import {MdDelete} from "react-icons/md";
import {FaCheck} from "react-icons/fa";
import {TiPin} from "react-icons/ti";

function App() {
    const [selected, setSelected] = useState('all');
    const [allTaskes, setAllTaskes] = useState([]);
    const [completedTaskes, setCompletedTaskes] = useState([]);
    const [pendingTaskes, setPendingTaskes] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");


    const handleAdd = () =>{
        let newTask = {
            title:newTitle,
            description:newDescription
        }
        let updatedArr = [...allTaskes];
        updatedArr.push(newTask);
        localStorage.setItem('task-list', JSON.stringify(updatedArr));
    }

    const deleteTask = (index) =>{
        let taskes = [...allTaskes];
        taskes.splice(index);

        localStorage.setItem('task-list', JSON.stringify(taskes));
        setAllTaskes(taskes);
    }

    const addToCompleted = (index) =>{
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth();
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes()
        let s = now.getSeconds();
        let completeOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

        let filtredTask = {
            ...allTaskes[index],
            completeOn:completeOn,
        }

        let updatedCompletedArr = [...completedTaskes];
        updatedCompletedArr.push(filtredTask);
        setCompletedTaskes(updatedCompletedArr);
        localStorage.setItem('completed-taskes', JSON.stringify(updatedCompletedArr));
    }

    const addToPending = (index) =>{
        let pendingTask = {
            ...allTaskes[index],
        }

        let updatedPendingArr = [...completedTaskes];
        updatedPendingArr.push(pendingTask);
        setPendingTaskes(updatedPendingArr);
        localStorage.setItem('pending-taskes', JSON.stringify(updatedPendingArr));
    }

    useEffect(() => {
        let savedTaskes = JSON.parse(localStorage.getItem('task-list'));
        if (savedTaskes){
            setAllTaskes(savedTaskes);
        }
        let completedTaskes = JSON.parse(localStorage.getItem('completed-taskes'));
        if (completedTaskes){
            setCompletedTaskes(completedTaskes);
        }
        let penfingTaskes = JSON.parse(localStorage.getItem('pending-taskes'));
        if (penfingTaskes){
            setPendingTaskes(penfingTaskes);
        }
    }, []);

    console.log(newDescription, newTitle)
    return (
        <div className="App">

            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Task</label>
                    <input type="text" className="form-control" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} id="exampleInputEmail1"
                           placeholder="Task"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} id="exampleInputPassword1" placeholder="Description"/>
                </div>
                <button onClick={handleAdd} type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className='btn-area'>
                <button
                    className={selected === 'all' ? 'selected' : ''}
                    onClick={() => setSelected('all')}
                >
                    All
                </button>
                <button
                    className={selected === 'completed' ? 'selected' : ''}
                    onClick={() => setSelected('completed')}
                >
                    Completed
                </button>
                <button
                    className={selected === 'pending' ? 'selected' : ''}
                    onClick={() => setSelected('pending')}
                >
                    Pending
                </button>
            </div>

            <div className='task-list'>

                {selected==='all' && allTaskes.map((item,index)=>{
                    return (
                        <div className='task-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="icon-group">
                                <FaCheck className='icon' onClick={()=>addToCompleted(index)}/>
                                <TiPin className='icon' onClick={()=>addToPending(index)}/>
                                <MdDelete className='icon' onClick={()=>deleteTask(index)}/>
                            </div>
                        </div>
                    )
                })}

                {selected==='completed' && completedTaskes.map((item,index)=>{
                    return (
                        <div className='task-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="icon-group">
                                <TiPin className='icon' onClick={()=>addToPending(index)}/>
                                <MdDelete className='icon' onClick={()=>deleteTask(index)}/>
                            </div>
                        </div>
                    )
                })}

                {selected==='pending' && pendingTaskes.map((item,index)=>{
                    return (
                        <div className='task-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="icon-group">
                                <FaCheck className='icon' onClick={()=>addToCompleted(index)}/>
                                <MdDelete className='icon' onClick={()=>deleteTask(index)}/>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default App;
