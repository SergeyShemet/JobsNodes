import React, {useState} from "react";
import CardEditor from "./card-editor.component";


function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}

export const Card = (props) => {
    const [showModal, setShowModal] = useState(false);

    if (Array.isArray(props.job)) return(null);
    
    var date = new Date(props.job.expiresAt).toLocaleString("ru-RU");

    const jobPriorities =[{color: "green", text: "Низкий"}, {color: "blue", text: "Средний"}, {color: "red", text: "Высокий"}];
    const jobStatuses = ["К выполнению", "Выполняется", "Выполнена", "Отменена"];
    const cardStyle = [{backgroundColor: 'darksalmon'},{backgroundColor: 'aquamarine'},{backgroundColor: 'gainsboro'}]
    var cardSss = cardStyle[2];
    if ((Date.parse(props.job.expiresAt) < new Date()) && props.job.status < 2) cardSss = cardStyle[0];
    if (props.job.status === 2) cardSss = cardStyle[1];
    
    return (<>

        { showModal && <CardEditor setShowModal={setShowModal} job={props.job} isNew='0' currentUser={props.currentUser} refreshMode={props.refreshMode}/> }




        <div className="card" onClick={() => setShowModal(!showModal)}>
            <strong><h3><div className="card-header" style={cardSss}>{props.job.title}</div></h3></strong>
                <div className="card-body">
                <h4 className="card-title">{props.job.description}</h4>
                <p className="card-text">Приоритет: {jobPriorities[props.job.priority].text}</p>
                <p className="card-text">Статус выполнения: {jobStatuses[props.job.status]}</p>
         </div>
  <div className="card-footer my-0" style={{  marginBottom: '0' }} ><div>Выполнить до: {date}</div><span>Ответственный: {props.job.performer.lastName} {props.job.performer.firstName}</span></div>
</div>
        </>
    )
}