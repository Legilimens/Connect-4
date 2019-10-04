import React from 'react';
import Cell from '../cell/cell.js';
import './column.scss';

function Column(props) {
	return (
		<div className="column" onClick={() => props.onColumnPress(props.columnId)}>
			{
				props.columnData.map((el, key) =>
					<Cell
						key={key}
						cellData={el}
					/>
				)
			}
		</div>
	)
}

export default Column;