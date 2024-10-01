import React, { useEffect, useState } from 'react';
import Cookie from 'universal-cookie'
import Links from '../Links';
import { Button } from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash'


const LiveSSHOutput = ({ scriptId, command, script, onDelete }) => {
    const [output, setOutput] = useState([]);

    useEffect(() => {
        const token = new Cookie().get("userToken");

        const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(scriptId); // Send script ID to initiate SSH command
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setOutput((prevOutput) => [...prevOutput, data.output || data.error]);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, [scriptId]);

    return (
        <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px'}}>
                <h3 style={{margin:'0'}}>{command}</h3>
                <Button variant="btn btn-danger"
                    className='image-itme-btn'
                    onClick={onDelete}
                    >
                    <Icon size={20} icon={trash} />
                </Button>
            </div>
            
            <div style={styles.consoleContainer}>
                {output.map((line, index) => (
                    <div key={index}  style={styles.logEntry}>{line}</div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    consoleContainer: {
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'monospace',
        padding: '10px',
        borderRadius: '5px',
        maxHeight: '400px',
        overflowY: 'auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    logEntry: {
        padding: '5px 0',
        borderBottom: '1px solid #333',
    },
};

export default LiveSSHOutput;
