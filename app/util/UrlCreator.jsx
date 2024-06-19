const UrlCreator = id => {
  const idPerruno = id.toString()
  const url = 'http://localhost:5173/profile/'

  return url + idPerruno
}

export default UrlCreator
