// No in browser stuff from design of app

import './code-cell.css';
import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from "./resizable";
import { Cell } from '../state';
import { useActions} from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import{ useCumulativeCode } from "../hooks/use-cumulative-code";

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const {updateCell, createBundle} = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    //bundling process
    useEffect(()=> {

        // if no bundle / if on load up
        if (!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        }

        const timer = setTimeout(async ()=> {
            createBundle(cell.id, cumulativeCode);
        }, 750);

        return() => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode, cell.id, createBundle]);

    return (
        <Resizable direction={"vertical"}>
            {/* 'calc(100% - 10px)' has to have spaces in numbers otherwise doesnt work
                   This was note to self for future referance */}
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction={"horizontal"}>
                    <CodeEditor
                        initalValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className={"progress-wrapper"}>
                {!bundle || bundle.loading === true ? (
                    <div className={"progress-cover"}>
                        <progress className={"progress is-small is-prumary"} max="100">
                            Loading
                        </progress>
                    </div>
                ) : (
                    <Preview code={bundle.code} bundlingStatus={bundle.err} />
                )}
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;
