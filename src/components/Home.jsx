import React, { useState, useEffect } from 'react';

const ControlledInput = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    const deleteTask = i => {
        list.splice(i, 1);
        setList([...list])
        
        actualizarLista([...list])
    }
    const deleteAll = () => {
        list.splice(0, list.length);
        setList([...list])
        actualizarLista([...list])
    }
   
    const largolista = list.length

    const actualizarLista = (todos) => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/matiasmunozs', {
            method: "PUT",
            body: JSON.stringify(todos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {

                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //here is were your code should start after the fetch finishes
                console.log(data); //this will print on the console the exact object received from the server
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    }

    const obtenerLista = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/matiasmunozs', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {

                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //here is were your code should start after the fetch finishes
                setList(data) //this will print on the console the exact object received from the server
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    }
    useEffect(() => {
        obtenerLista();

    }, [])

    return (
        <div>

            <div className="container">
                <h1 className="title"> To do List user: matiasmunozs</h1>
                <form className="inputedit" onSubmit={(evento) => {
                    evento.preventDefault();
                    let lista = list.concat({ label: task, done: false })
                    setList(lista);
                    evento.target.task.value = "";
                    actualizarLista(lista)
                }}>

                    <input placeholder="New task"
                        name="task"
                        type="text"
                        onChange={(evento) =>
                            setTask(evento.target.value)

                        }>

                    </input>
                </form>
                <ul>

                    {list.length > 0 ?
                        list.map(function ({ label, done }, i) {
                            return <div className="border rounded" key={i}><li>{label}
                                <button className="cerrar"
                                    onClick={() => deleteTask(i)}>x</button></li></div>
                        })

                        : <p className="empty">Empty list</p>}

                </ul>
                <div className="larglist"> {largolista} Item left</div>
                <br></br>
                <div> <button className="clearall"
                                    onClick={() => deleteAll()}>Clear All</button></div>




            </div>
        </div>
    )
}


export default ControlledInput;