/*
    Action bar creation. Uses id and displays the three different click options
    uses css from @fortawesome/fontawesome-free
 */

import './action-bar.css';
import {useActions} from "../hooks/use-actions";

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveCell, deleteCell} = useActions();

    return <div className="action-bar">
        {/* Put icons on to right side*/}

        {/* Make a seperate action button component on my own */}
        <button className="button is-primary is-small" onClick={() => moveCell(id, 'up')}>
            {/*Icon css added */}
            <span className="icon">
                <i className="fas fa-arrow-up">

                </i>
            </span>
        </button>
        <button className="button is-primary is-small" onClick={() => moveCell(id, 'down')}>
            {/*Icon css added */}
            <span className="icon">
                <i className="fas fa-arrow-down">

                </i>
            </span>
        </button>
        <button className="button is-primary is-small" onClick={() => deleteCell(id)}>
            {/*Icon css added */}
            <span className="icon">
                <i className="fas fa-times">

                </i>
            </span>
        </button>
    </div>
};

export default ActionBar;
