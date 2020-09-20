import React, { useEffect } from 'react'

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

const Chat = ({location}) => {
  useEffect(() => {
    const params = queryParser(location.search)
    console.log(params)
  })

  return(
    <h1>Chat</h1>
  )
}

export default Chat