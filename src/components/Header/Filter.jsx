import React, { useContext } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FiltersContext } from '../../context/filters'

const colorArray = ['#1B59CA', '#7C5E07', '#A04700', '#4F6A24', '#8F3E71', '#A82D20', '#323131', '#5E50B0']

const Filter = ({ closeModal, projectState }) => {
  const { filters, setFilters } = useContext(FiltersContext)
  const handleClickUser = userId => {
    window.alert('hola')
  }
  return (
    <>
      <div className='modal' onClick={e => e.stopPropagation()}>
        <h3>Filters</h3>
        <div className='thin-line' />
        <h5>Users</h5>
        <ul>
          <li>
            {projectState.users.map(user => (
              <label key={user.id} htmlFor={user.id}>
                <input
                  type='checkbox'
                  id={user.id}
                  value='first_checkbox'
                  onClick={() => handleClickUser(user.id)}
                />
                {user.name}
                <br />
              </label>
            ))}
          </li>
        </ul>
        <h5>Color</h5>
        <ul>
          <li>
            {colorArray.map(color => (
              <label key={color} htmlFor={color}>
                <input
                  type='checkbox'
                  id={color}
                  value='first_checkbox'
                //   onClick={() => setProjectState({ ...projectState, color })}
                />
                <div className='color-filter' style={{ backgroundColor: color }} />
                <br />
              </label>
            ))}
          </li>
        </ul>
        <h5>Dates</h5>
        <ul>
          <li>
            <label htmlFor='start-date'>
              <input type='checkbox' id='start-date' /> Ends Before:
            </label>
            <DatePicker className='datepicker' selected={filters.startDate} onChange={(date) => setFilters({ ...filters, startDate: date })} />
            <label htmlFor='end-date'>
              <input type='checkbox' id='end-date' /> Ends After:
            </label>
            <DatePicker className='datepicker' selected={filters.endDate} onChange={(date) => setFilters({ ...filters, endDate: date })} />
          </li>
        </ul>
        <div className='button-container'>
          <button className='close-button' style={{ width: '200px' }} onClick={closeModal}>Close</button>
        </div>
      </div>
    </>
  )
}

export default Filter
