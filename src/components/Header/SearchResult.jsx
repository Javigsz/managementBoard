import { useStore } from '../../store/store'
import { useContext } from 'react'
import { FiltersContext } from '../../context/filters'

const SearchResult = ({ searchString }) => {
  const sections = useStore(state => state.project.sections)
  const users = useStore(state => state.project.users)
  const { filters, setFilters } = useContext(FiltersContext)

  //   const handleClickUser = (e, id) => {
  //     e.stopPropagation()
  //     console.log('ey')
  //     setFilters({ ...filters, users: [...filters.users, id] })
  //   }

  return (
    <>
      <div className='search-result'>
        {searchString.length > 2
          ? (
            <div>
              <div className='result-type'>
                <h3>Tasks</h3>
                <ul>
                  {sections.map(section => (
                    section.tasks.map(task => task.name.toLowerCase().includes(searchString.toLowerCase()) &&
                      <li key={task.id} className='search-result-item'>
                        <span className='bold-span'>{task.name}</span>
                        <span> from section {section.name}</span>
                      </li>
                    )
                  ))}
                  {sections.map(section => (
                    section.tasks.map(task => task.desc.toLowerCase().includes(searchString.toLowerCase()) &&
                      <li key={`${task.id}_desc`} className='search-result-item'>
                        {task.name}
                        <span> from section {section.name}</span>
                        <br />
                        <span className='desc-result'>Description: ...<span className='bold-span'>{searchString}</span>...</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
              <div>
                <h3>Sections</h3>
                <div>
                  {sections.map(section => section.name.toLowerCase().includes(searchString.toLowerCase()) &&
                    <div key={section.id} className='search-result-item'>
                      <span className='bold-span'>{section.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3>Users</h3>
                <ul>
                  {users.map(user => user.name.toLowerCase().includes(searchString.toLowerCase()) &&
                    <li key={user.id} className='search-result-item'>
                      <span className='bold-span'>{user.name}</span>
                      <br /> {user.username}
                    </li>
                  )}
                  {users.map(user => user.username.toLowerCase().includes(searchString.toLowerCase()) &&
                    <li key={`${user.id}_username`} className='search-result-item'>
                      {user.name}
                      <br /> <span className='bold-span'>{user.username}</span>
                    </li>)}
                </ul>
              </div>
            </div>
            )
          : (
            <div>
              At least 3 characters
            </div>
            )}
      </div>
    </>
  )
}

export default SearchResult
