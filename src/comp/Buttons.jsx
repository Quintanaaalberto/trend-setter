import React from 'react';

class Buttons extends React.Component {
    traducir() {
        // Lógica para el primer botón
        console.log('Haz clic en el primer botón');
    }

    resumir() {
        // Lógica para el segundo botón
        console.log('Haz clic en el segundo botón');
    }

    corregir() {
        // Lógica para el tercer botón
        console.log('Haz clic en el tercer botón');
    }

    render() {
        return (
            <div>
                <button onClick={this.traducir}>Traducir</button>
                <button onClick={this.resumir}>Resumir</button>
                <button onClick={this.corregir}>Corregir</button>
            </div>
        );
    }
}

export default Buttons;
