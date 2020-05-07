// React Todo

const ControlButton = (props) => {
    let elClass = "button"
    let symbol = "?";
    if (props.type === "del") {
        symbol = "✖";
    }
    if (props.type === "edit") {
        symbol = "✍";
    }
    if (props.type === "do") {
        symbol = "✅";
    }
    if (props.type === "undo") {
        symbol = "♻";
    }
    if (props.type === "add") {
        symbol = "+";
        elClass += " button--add"
    }
    return (
        <div className={elClass} onClick={props.action}>
            {symbol}
        </div>
    );
};

const ListItem = (props) => {
    // state
    const [editor, setEditor] = React.useState(false);
    const [text, setText] = React.useState(props.text);

    // action
    function actionToggleEditor() {
        setEditor(!editor);

    }
    function actionChange(event) {
        setText(event.target.value);

    }
    function actionSaveEditing() {
        setEditor(false);

    }
    function actionCancelEditing() {
        setEditor(false);
        setText(props.text);
    }
    function actionDelete() {
        props.delAction(props.id);
    }
    function actionCondition() {
        newText = text;
        props.changeCondition(props.id)
    }
    return (
        <React.Fragment>
            {!editor && (
                <div className={props.done ? "item item--done" : "item"}>
                    {!props.done && <ControlButton type="do" action={actionCondition} />}
                    {props.done && <ControlButton type="undo" action={actionCondition} />}

                    <div className="item__text">{text}</div>

                    {!props.done && (
                        <ControlButton
                            type="edit"
                            action={actionToggleEditor}

                        />
                    )}
                    <ControlButton type="del" action={actionDelete} />
                </div>
            )}
            {editor && (
                <div className={props.done ? "item item--done" : "item"}>
                    <input
                        type="text"
                        className="item__input"
                        value={text}
                        onChange={actionChange}
                        id="editor"
                    />
                    <ControlButton type="do" action={actionSaveEditing} />
                    <ControlButton type="del" action={actionCancelEditing} />
                </div>
            )}
        </React.Fragment>
    );

};

const List = (props) => {
    const [tasks, setTasks] = React.useState(props.tasks);
    let doneList = [];
    let undoneList = [];

    tasks.forEach((element, index) => {
        element.key = element.id
        if (element.done) {
            doneList.push(element);
        } else {
            undoneList.push(element);
        }
    });
    function actionAddTask() {
        count++
        let o = {
            text: ['New Task №' + count],
            done: false,
            id: count,
        }
        tasks.unshift(o)
        let newList = tasks.map((e) => e)
        setTasks(newList)
    }
    function changeCondition(key) {
        tasks.forEach((element) => {
            if (element.id == key) {
                element.text = [newText]
                element.done = !element.done;
            }
        })
        let newList = tasks.map((e) => e)
        setTasks(newList)
    }
    function actionDeleteTask(key) {
        let newList = [];
        tasks.forEach((element) => {
            if (element.key !== key) {
                newList.push(element);
            }
        });
        setTasks(newList);
    }
    return (
        <div className="list">
            {tasks.length === 0 && (
                <div className="list__section">Nothing to do...
                    <ControlButton type="add" action={actionAddTask} />
                </div>
            )}
            {tasks.length !== 0 && (
                <React.Fragment>
                    {undoneList.length !== 0 && (
                        <div className="list__section">To do:
                            <ControlButton type="add" action={actionAddTask} />
                        </div>
                    )}
                    {undoneList.map((element) => (
                        <ListItem
                            changeCondition={changeCondition}
                            text={element.text}
                            done={element.done}
                            key={element.id}
                            delAction={actionDeleteTask}
                            id={element.id}
                        />
                    ))}
                    {doneList.length !== 0 && (
                        <div className="list__section">Done:
                            {undoneList.length == 0 && <ControlButton type="add" action={actionAddTask} />}
                        </div>
                    )}
                    {doneList.map((element) => (
                        <ListItem
                            changeCondition={changeCondition}
                            text={element.text}
                            done={element.done}
                            key={element.id}
                            delAction={actionDeleteTask}
                            id={element.id}

                        />
                    ))}
                </React.Fragment>
            )}
        </div>
    );
};

let my_tasks = [
    {
        text: "Навчитися змінювати стейт всередині Item",
        done: false,
        id: 0,
    },
    {
        text: "Редагувати текст",
        done: false,
        id: 1,
    },
    {
        text:
            "Перевіряти чи є щось в списку done і не показувати заголовок якщо пусто",
        done: true,
        id: 2,
    },
    {
        text:
            "Перевіряти чи є щось в списку undone і не показувати заголовок якщо пусто",
        done: true,
        id: 3,
    },
    { text: "Показувати списки", done: true, id: 4, },
];
let newText;
let count = my_tasks.length
const Page = () => {
    return (
        <div>
            <List tasks={my_tasks} />
        </div>
    );
};

// Render

ReactDOM.render(<Page />, document.getElementById("root"));
