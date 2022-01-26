// Text editor
import React, { useState, useEffect, useRef } from "react";
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
import {Cell} from "../state/cell";
import {useActions} from "../hooks/use-actions";

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);

    const {updateCell} = useActions();

    useEffect(()=>{
        //click in
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                //console.log('Element clicked on is inside editor');
                return;
            }
            //console.log("element clicked isn not inside editor");

            setEditing(false);
        };
        document.addEventListener('click', listener, {capture: true});

        //click out
        return ()=> {
            document.removeEventListener('click', listener, {capture: true});
        }
    }, []);

    if(editing) {
        return (
            <div className={"text-editor"} ref={ref}>
                <MDEditor value={cell.content} onChange={(v)=> updateCell(cell.id, v || '')}/>
            </div>
        )
    }
    // find some way to launch with different text once
    return (
        <div className={"text-editor card"} onClick={()=> setEditing(true)}>
            <div className={"card-content"}>
                <MDEditor.Markdown source={cell.content || 'Click to edit'} />
            </div>
        </div>
    );
};

export default TextEditor;
