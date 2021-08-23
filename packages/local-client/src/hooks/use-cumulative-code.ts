import {useTypedSelector} from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {

    // creates array of code strings for lower cells to access previous cells code
    return  useTypedSelector((state) => {
        const {data, order} = state.cells;
        const orderedCells = order.map((id) => data[id]);

        // allows values to print in preview
        // React + Dom is added to make sure react components chan show with show()
        const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
    
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
      `;

        const showFuncNoop = 'var show = () => {}';

        const cumulativeCode = [];
        for (let c of orderedCells) {
            if(c.type === 'code') {
                if (c.id === cellId) {
                    cumulativeCode.push(showFunc);
                } else {
                    cumulativeCode.push(showFuncNoop)
                }
                cumulativeCode.push(c.content);
            }
            //checks if current cell
            if (c.id === cellId) {
                break;
            }
        }
        return cumulativeCode;
    }).join('\n');
}
