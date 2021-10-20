import React, {Fragment, useState} from 'react';
import '../App.css'

const Calculadora = () => {
    const [resultado, setResultado] = useState("");
    const handleClick = (e) => {
        setResultado(resultado.concat(e.target.name));
    }
    const clear = () => {
        setResultado("");
    }
    const borrar = () => {
        setResultado(resultado.slice(0,-1));
    }
    const calcular = () => {
        try{
            setResultado(eval(resultado).toString());
        }catch (err){
            setResultado("Error");
        }
    }
    return (
        <>
            <div className="container">
                <div>
                    <form className="pantalla">
                        <input type="text" value={resultado}/>
                    </form>
                </div>
                <div className="teclado">
                    <button className="botonEspecial" id="clear" onClick={clear}>Clear</button>
                    <button className="botonEspecial" onClick={borrar}>C</button>
                    <button className="botonEspecial" name="/" onClick={handleClick}>&divide;</button>
                    <button name="7" onClick={handleClick}>7</button>
                    <button name="8" onClick={handleClick}>8</button>
                    <button name="9" onClick={handleClick}>9</button>
                    <button className="botonEspecial" name="*" onClick={handleClick}>&times;</button>
                    <button name="4" onClick={handleClick}>4</button>
                    <button name="5" onClick={handleClick}>5</button>
                    <button name="6" onClick={handleClick}>6</button>
                    <button className="botonEspecial" name="-" onClick={handleClick}>&ndash;</button>
                    <button name="1" onClick={handleClick}>1</button>
                    <button name="2" onClick={handleClick}>2</button>
                    <button name="3" onClick={handleClick}>3</button>
                    <button className="botonEspecial" name="+" onClick={handleClick}>+</button>
                    <button name="0" onClick={handleClick}>0</button>
                    <button name="." onClick={handleClick}>.</button>
                    <button className="botonEspecial" id="resultado" onClick={calcular}>=</button>
                </div>
            </div>
        </>
    );
};

export default Calculadora;