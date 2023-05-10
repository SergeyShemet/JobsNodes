import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { v4 as uuidv4 } from "uuid"
import { Card } from "./card.component";
import CardEditor from "./card-editor.component";




export default function BoardUser()  {
    const [content, setContent] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [redirected, setRedirected] = useState(false);
    const [userReady, setReady] = useState(false);
    const [currentMode, setCurrentMode] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [emplyesnum, setEmplyesnum] = useState(0);
    const [sortedContent, setSortedContent] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshNow, setRefreshMode] = useState(false);
        

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) { setRedirected("/login"); return; }                    //если не залогинен, то редирект
        UserService.getUsersList().then(response => { setUsersList(response.data); });
        setCurrentUser(user);

        setReady(true);
        refreshMode(2);
    }, []);

    useEffect(() => {
        sortbyPerformer();
    }, [content]);

    useEffect(() => {
        setRefreshMode(false);
        setShowModal(false);
        refreshMode(currentMode);
    }, [refreshNow]);


    const refreshMode = (mode) => {
        if (!currentUser) return;
        setReady(false);
        setCurrentMode(mode);
        setContent([]);
        switch (mode) {
            case 0:
                UserService.getJobsForUser(currentUser.id).then(response => {
                    setContent( response.data);
                });
                
                break;
            case 1:
                UserService.getJobsForEmployes(currentUser.id).then(response => {
                    setContent(response.data);
                });
                sortbyPerformer();
                break;
            case 2:
                UserService.getAllJobs().then(response => {
                    setContent(response.data);
                });
                break;
            default:
                break;
            }

        setReady(true);
        
    }

    const sortbyPerformer = (lastmode) => {                 //сортировка объектов задач по пользователям
        setSortedContent([]);
        if (content.length === 0) {setSortedContent([]); return; }
        var lastID = content[0].performerId
        var tempContent = [];
        var finalContent = [];


        for (var i = 0; i < content.length; i++) {
            if (content[i].performerId !== lastID) {
                lastID = content[i].performerId;
                if (tempContent !== []) finalContent.push(tempContent);
                tempContent = [];
        
            } 
                tempContent.push(content[i]);

                if (i === content.length - 1) {
                    if (tempContent !== []) finalContent.push(tempContent);
                }
        }
        setSortedContent(finalContent);
    }

    const invokeModal = () => {
        setShowModal(!showModal);
    }


    if (redirected) return <Navigate to={redirected} />;
    if (!userReady) return <div className="text-center"><h1>Загрузка данных...</h1></div>;
    if (!content ) return <div className="text-center"><h1>Загрузка данных...</h1></div>;
    if (!sortedContent) return <div className="text-center"><h1>Загрузка данных...</h1></div>;

    
    

    return (
        <>

        { showModal && <CardEditor setShowModal={setShowModal} job='false' isNew='1' currentUser={currentUser} currentMode={currentMode} refreshMode={setRefreshMode}/> }

        <div>{(userReady) ?
            <div className="container">
                <header className="p-2 text-center bg-primary-outline rounded mb-4">
                    <span className="">
                        <button className="btn btn-info mx-1 my-2" onClick={() => refreshMode(0)}>Мои задачи</button>
                        <button className="btn btn-info mx-1 my-2" onClick={() => refreshMode(1)}>Задачи подчинённых</button>
                        <button className="btn btn-info mx-1 my-2" onClick={() => refreshMode(2)}>Все задачи</button>
                    </span>
                    <span><button className="btn btn-success mx-5 my-2" onClick={() => setShowModal(!showModal)}>Добавить задачу</button></span>
                </header>
            </div> : null}
        </div>
        
        { (currentMode === 0 && content.length !== 0) ? 
            <div><h2 className="text-center">Мои задачи</h2>
            
            <div><h4 >Задачи на сегодня</h4></div>
             <div className="row row-cols-3 py-2">
                { content[0].map(job => <div key={job.id}><Card job={job} currentUser={currentUser} refreshMode={setRefreshMode}/></div>) } </div>
                <div><h4>Задачи на неделю</h4></div>
                <div className="row row-cols-3 py-2">
                { content[1].map(job => <div key={job.id}><Card job={job} currentUser={currentUser} refreshMode={setRefreshMode}/></div>) } </div>
                <div><h4 >Остальные задачи</h4></div>
                <div className="row row-cols-3 py-2">
                { content[2].map(job => <div key={job.id}><Card job={job} currentUser={currentUser} refreshMode={setRefreshMode}/></div>) }</div>
                </div>
               
                
          :  (currentMode === 1 && sortedContent.length !== 0) ? 
             <div><h2 className="text-center">Задачи подчинённых</h2>
                
                { sortedContent.map(user => 
                    <div key={uuidv4()} className="row">
                       <div> { 'performer' in user[0] ? <div><h4>{user[0].performer.lastName} {user[0].performer.firstName}</h4></div> : null }
                       <div className="row row-cols-3 py-2">
                                 { user.map(job =>
                                    <div key={job.id}><Card job={job} currentUser={currentUser} refreshMode={setRefreshMode}/></div>
                                )}
                        </div>
                        </div>                    
                </div>
                )}
          </div>
            
          : (currentMode === 2 && content.length !== 0) ?
                <div><h2 className="text-center mb-5">Все задачи</h2>
                <div className="row row-cols-3 py-2">
                { content.map(job => <div key={job.id} className="row"><Card job={job} currentUser={currentUser} refreshMode={setRefreshMode}/></div>) }
                </div>

                </div>
          :      null
           
        }
        </>
    );
    
}
