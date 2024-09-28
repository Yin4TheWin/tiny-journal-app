import './App.css';

import React from 'react';
import { Form, Button, Accordion, Row, Col, Container, Card } from 'react-bootstrap';
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
      dispatch({type: 'add', newNote: {title: title, body: encryptedBody, date: Date.now()}})
      setTitle("")
      setBody("")
    }
    else
      alert("The title and body fields cannot be blank!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container className="text-center py-4">
          <h1 className="mb-3">Tiny Journal App</h1>
          <p className="lead">
          Capture your thoughts securely and store them locally — no cloud, no third parties!
          </p>
          <p className="small">
          Want extra protection? Simply enter a password in the encryption key field to safeguard your notes with powerful AES encryption. Just make sure to remember your password - no one's remembering it for you!
          </p>
        </Container>

        <Container className="mb-5">
          <Card className="p-4 shadow-sm">
            <Form onSubmit={addNewNote}>
              <Form.Group className="mb-3">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title"
                  className="mb-3"
                  size="lg"
                />
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  as="textarea"
                  rows={8}
                  placeholder="Your note here"
                  className="mb-3"
                  size="lg"
                />
                <Form.Control
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  type="password"
                  placeholder="Encryption key (optional)"
                  size="lg"
                />
              </Form.Group>
              <Button variant="primary" size="lg" className="d-flex justify-content-center mx-auto mt-3" block onClick={addNewNote}>
                Save Note
              </Button>
            </Form>
          </Card>
        </Container>

        <Container>
          <h2 className="text-center mb-4">Old Notes</h2>
          {savedNotes.notes.length === 0 ? (
            <h5 className="text-center">No notes yet!</h5>
          ) : (
            <Accordion>
              {savedNotes.notes.map(note => {
                let noteId = note.title + note.date;
                return (
                  <Accordion.Item eventKey={noteId} key={noteId}>
                    <Accordion.Header>
                    <div className="d-flex w-100 justify-content-between">
                      <span className='maintext'>{note.title}</span>
                      <span className='subtext'>{new Date(note.date).toLocaleString()}</span>
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Row className="mb-3">
                          <Col>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              value={inputs[noteId] || ""}
                              onChange={(e) => {
                                let inputCopy = { ...inputs };
                                inputCopy[noteId] = e.target.value;
                                setInputs(inputCopy);
                                setUpdate(update + 1);

                                let decryptKey = inputCopy[noteId];
                                let bodyText = decryptKey.length > 0 ? decrypt(note.body, decryptKey) : note.body;
                                let bodiesCopy = { ...bodies };
                                bodiesCopy[noteId] = bodyText;
                                setBodies(bodiesCopy);
                              }}
                            />
                          </Col>
                          <Col>
                            <Button type="submit" variant="secondary">Decrypt</Button>
                          </Col>
                        </Row>
                      </Form>
                      <p>{bodies[noteId] || note.body}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          )}
        </Container>
      </header>
    </div>
  );
}

export default App;