import React from 'react'
import { useDroppable } from '@dnd-kit/core'

const Droppable = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id
  })

  const style = {
    minHeight: props.isDragging ? '50px' : '0px'
  }

  return (
    <div className='droppable' style={style} ref={setNodeRef}>
      {props.children}
    </div>
  )
}

export default Droppable
