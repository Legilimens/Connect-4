import React from 'react';
import Column from '../column/column.js';
import './table.scss';

function Table(props) {

	return (
		<div className="gameTable">
			{
				props.field.map((el, key) =>
					<Column
						key={key}
						className="column"
						onColumnPress={props.onPress}
						columnData={el}
						columnId={key}
					/>
				)
			}
		</div>
	)
}

export default Table;