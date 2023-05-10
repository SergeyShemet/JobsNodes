import React, {useState, useEffect} from "react";
import moment from 'moment'
import 'moment/locale/ru';
import { Modal, Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import UserService from "../services/user.service";
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru'
export default function CardEditor(props) {

    const [isShow, invokeModal] = useState(true);
    const [isNew, setNew] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);
    const [priority, setPriority] = useState(0);
    const [creatorId, setCreatorId] = useState(0);
    const [expiresAt, setExpiresAt] = useState(new Date());
    const [otvList, setOtvList] = useState([]);
    const [performerId, setPerformerId] = useState(0);
    const [editable, setEditable] = useState(true);



    const initModal = () => {
        return invokeModal(false);
    }

    useEffect(() => {
        (props.isNew == 1) ? setNew(true) : setNew(false);
        UserService.getUsersList().then(response => {
            setAllUsers(response.data);
        }).then(()=>setLoaded(true));

    },[])
    
    useEffect(() => {
        if (isNew) {
            setTitle("");
            setDescription("");

            setCreatorId(props.currentUser.id);
            setExpiresAt(new Date());
            setPerformerId(props.currentUser.id);
            setPriority(0);
            setStatus(0);
            setEditable(true);
        } else {
            setTitle(props.job.title);
            setDescription(props.job.description);
            setCreatorId(props.job.creatorId);
            setPerformerId(props.job.performerId); //
            setStatus(props.job.status);
            setPriority(props.job.priority);
            setExpiresAt(Date.parse(props.job.expiresAt));
            if (props.currentUser.id != props.job.creatorId) { setEditable(false); } // блокируем редактирование задачи
                       
        }
        var list=allUsers.filter(x=> x.managerId == props.currentUser.id);
        
        list.unshift(props.currentUser);
        for (var i = 0; i < list.length; i++) {
            list[i].fullName = list[i].lastName + " " + list[i].firstName;
        }
        setOtvList(list);
    },[isLoaded])



    function submitForm(e) {
        e.preventDefault();


        if (isNew) {                    //создаём запись
            const sendData = {
                title: title,
                description: description,
                creatorId: creatorId,
                performerId: performerId,
                status: status,
                priority: priority,
                expiresAt: expiresAt,
                
            }
            UserService.insertJob(sendData)
            props.refreshMode(true);
            props.setShowModal(false);

        } else {
            const sendData = {
                id: props.job.id,
                title: title,
                description: description,
                creatorId: creatorId,
                performerId: performerId,
                status: status,
                updatedAt: Date.now(),
                priority: priority,
                expiresAt: expiresAt
            }
            UserService.updateJob(sendData)
            props.refreshMode(true);
            props.setShowModal(false);
        };
    }   
        

    function getUserById(id) {
       try {
       var u = allUsers.find(x=> x.id === id);
       if (!u) return "---";
        return u.lastName + " " + u.firstName;
        } catch (e) {
            console.log(e);
            return "---";
        }
    }

    function getOtvFullName(id) { 
        var u = otvList.find(x=> x.id === performerId);
        if (!u) return "---";
        return u.fullName;
    }
    
    if (!props.currentUser) return <div></div>;
    if (!allUsers) return <div></div>;
    if (otvList.length === 0) return <div></div>;

    if (!('fullName' in otvList[0])) return <div></div>;
    
    return (<>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={()=>{props.setShowModal(false)}}>
          <Modal.Title>{(isNew) ? <div>Добавление задачи</div> : <div>Редактирование задачи</div>}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <div className="mx-2">Создатель: {getUserById(creatorId)} (id:{creatorId})</div>
        

        <Form>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control type="text" placeholder="Введите заголовок" value={title}
                            onChange={e => setTitle(e.target.value)} disabled={!editable}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Описание</Form.Label>
                <Form.Control type="text" placeholder="Введите описание задачи" value={description}
                            onChange={e => setDescription(e.target.value)} disabled={!editable}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Дата и время исполнения</Form.Label>
                <DatePicker selected={expiresAt} onChange={date => setExpiresAt(date)} showTimeSelect dateFormat="Pp" timeFormat="HH:mm" locale={ru} disabled={!editable}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Ответственный</Form.Label>
                <Form.Select disabled={!editable}
                    onChange={e => setPerformerId(otvList.find(x=> x.fullName == e.target.value).id)}
                    value={getOtvFullName()}>
                        
                {otvList.map(x => <option key={x.id}>{x.lastName} {x.firstName}</option>)}

                </Form.Select>
            </Form.Group>
    </Form>
    </Modal.Body>
       <Form.Label className="mx-3">Приоритет:</Form.Label>
      <ButtonGroup className="mb-2 mx-3">
            <Button onClick={()=>{setPriority(0); console.log(performerId)}} className={priority===0 ? "btn-dark" : null } disabled={!editable}>Низкий</Button>
            <Button onClick={()=>setPriority(1)} className={priority===1 ? "btn-dark" : null } disabled={!editable}>Средний</Button>
            <Button onClick={()=>setPriority(2)} className={priority===2 ? "btn-dark" : null } disabled={!editable}>Высокий</Button>
      </ButtonGroup>
      <Form.Label className="mx-3"> Статус задачи:</Form.Label>
      <ButtonGroup className="mb-2 mx-3">
            <Button onClick={()=>setStatus(0)} className={status===0 ? "btn-dark" : null }>К выполнению</Button>
            <Button onClick={()=>setStatus(1)} className={status===1 ? "btn-dark" : null }>Выполняется</Button>
            <Button onClick={()=>setStatus(2)} className={status===2 ? "btn-dark" : null }>Выполнена</Button>
            <Button onClick={()=>setStatus(3)} className={status===3 ? "btn-dark" : null }>Отменена</Button>
      </ButtonGroup>
      <form onSubmit={submitForm}>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{props.setShowModal(false)}}>Отменить</Button>
          <Button variant="success" type="submit">Сохранить</Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
    )

}

