import React from 'react'
import { useDroppable } from '@dnd-kit/core'

const Droppable = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id
  })

  return (
    <div className='droppable' ref={setNodeRef}>
      {props.children}
    </div>
  )
}

export default Droppable
