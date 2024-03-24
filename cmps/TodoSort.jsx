const { useState } = React

export function TodoSort({ onSetSort }) {

    function onChange(ev) {
        onSetSort(ev.target.value)
    }

    return (
        <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select onChange={onChange} id="sort">
                <option value="createdAt">Time</option>
                <option value="txt">Text</option>
            </select>
        </div>
    )
}
