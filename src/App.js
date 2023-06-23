import './App.css';

import React from 'react';
import { Form, Button, Accordion, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { encrypt, decrypt } from './security/encryption';

function App() {
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [key, setKey] = React.useState("")

  const [inputs, setInputs] = React.useState({})
  const [bodies, setBodies] = React.useState({})

  const [update, setUpdate] = React.useState(0)
  const firstRun = React.useRef(true)

  const dispatch = useDispatch()

  const savedNotes = useSelector(state=>state);

  React.useEffect(()=>{
    if(firstRun.current)
      firstRun.current=false
    else
      localStorage.setItem('state', JSON.stringify(savedNotes))
  }, [savedNotes])

  const addNewNote = ()=>{
    // const key = syncScrypt(body.normalize("NFKC"), "", N, r, p, dkLen)
    // console.log(key)
    if(title.length>0 && body.length>0){
      let encryptedBody = key.length>0?encrypt(body, key):body
      dispatch({type: 'add', newNote: {title: title, body: encryptedBody}})
      setTitle("")
      setBody("")
    }
    else
      alert("Note title and body both must be non-empty!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Tiny Journal App
        </h1>
        <p>
          Create notes for yourself and save them to local storage (nothing is saved to the cloud!)
        </p>
        <p style={{textAlign: 'center', maxWidth: '90%'}}>Encryption key note: if you would like to encrypt the notes you write, enter a "password" string into the encryption key field. The string will be run through a key derivation function (scrypt), and the resulting key will be used to encrypt your text with the AES algorithm.</p>
        <Form style={{width: '90%', paddingTop: '1%'}} onSubmit={addNewNote}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control value={title} onChange={(e)=>{
              e.preventDefault()
              setTitle(e.target.value)
            }} placeholder="Note title"/>
            <Form.Control value={body} onChange={(e)=>{
              e.preventDefault()
              setBody(e.target.value)
            }}  style={{marginTop: '1%'}} as="textarea" rows={15} placeholder="Your note here"/>
            <Form.Control value={key} onChange={(e)=>{
              e.preventDefault()
              setKey(e.target.value)
            }} style={{marginTop: '1.5%'}} type="password" rows={1} placeholder="Encryption key (optional)"/>
          </Form.Group>
        </Form>
        <Button variant="success" onClick={addNewNote} size="lg" style={{width: '40%', marginTop: '1%', marginBottom: '3%'}}>Save</Button>
        <h1>
          Old Notes
        </h1>
        <p>
          Here is a list of your previously saved notes (press enter to decrypt).
        </p>
          {
            savedNotes.notes.length===0?<h3>No notes yet!</h3>:<Accordion style={{width: '95%'}}>
              {
              savedNotes.notes.map(note=>{
              let noteId=note.title+note.body
              return(
              <Accordion.Item eventKey={noteId}>
                <Accordion.Header>
                  <p style={{marginRight: '3%'}}>{note.title}</p>
                  <Form onSubmit={(e)=>{
                    e.preventDefault()
                    let decryptKey=inputs[noteId]?inputs[noteId]:""
                    let bodyText=decryptKey.length>0?decrypt(note.body, decryptKey):note.body
                    let bodiesCopy=bodies
                    bodiesCopy[noteId]=bodyText
                    setBodies(bodiesCopy)
                    setUpdate(update+1)
                  }}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Control onClick={(e)=>{
                        e.stopPropagation()
                      }} value={inputs[noteId]?inputs[noteId]:""} onChange={(e)=>{
                        let inputCopy=inputs
                        inputCopy[noteId]=e.target.value
                        setInputs(inputCopy)
                        setUpdate(update+1)
                      }} placeholder="Password" type="password"/>
                    </Form.Group>
                  </Form>
                </Accordion.Header>
                <Accordion.Body style={{overflowWrap: 'break-word'}}>
                  {bodies[noteId]?bodies[noteId]:note.body}
                </Accordion.Body>
              </Accordion.Item>
              )
            })}
            </Accordion>
          }
        </header>
    </div>
  );
}

export default App;