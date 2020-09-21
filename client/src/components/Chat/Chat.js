import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

let socket

const Chat = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const {name, room} = queryParser(location.search)

    socket = io(ENDPOINT)
    
    setName(name)
    setRoom(room)

    socket.emit('join', {name, room}, () => {})

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search])

  return(
    <h1>Chat</h1>
  )
}

const queryParser = (queryString) => {
  queryString = queryString.substring(1)
  const params = queryString.split('&')
  const object = {}

  params.map(param => {
    const [key, value] = param.split('=')
    return object[key] = value
  })

  return object
}

export default Chat