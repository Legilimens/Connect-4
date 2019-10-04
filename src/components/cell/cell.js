import React from 'react';
import './cell.scss';

const Cell = (props) => <span className={'tableCell ' + (props.cellData !== 0 ? (props.cellData === 1 ? 'firstPlayer' : 'secondPlayer') : null)} />

export default Cell;