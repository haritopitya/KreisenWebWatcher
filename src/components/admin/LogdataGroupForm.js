import { getDatabase, off, onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import firebase from '../../utils/firebase'

const logdataGroupKey = '/current-logdata-group'

const LogdataGroupForm = () => {
  const [logdataGroup, setLogdataGroup] = useState('')
  const [validated, setValidated] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)


  useEffect(() => {
    const logdataGroupRef = ref(getDatabase(firebase), logdataGroupKey)
    onValue(logdataGroupRef, (snapshot) => {
      const logdataGroup = snapshot.val();
      setLogdataGroup(logdataGroup);
    })
    return () => { off(logdataGroupRef) };
  }, [])

  const onSubmit = () => {
    if (logdataGroup && logdataGroup.length >= 1) {
      set(ref(getDatabase(firebase), logdataGroupKey), logdataGroup)
        .then((e) => {
          setValidated(true);
          setIsValid(true);
          setIsInvalid(false);
        })
        .catch((e) => {
          setValidated(true);
          setIsValid(false);
          setIsInvalid(true);
          console.log(e);
        })
    } else {
      setValidated(true);
      setIsValid(false);
      setIsInvalid(true);
    }
  }

  const onUpdate = (e) => {
    setValidated(false)
    setLogdataGroup(e.target.value)
  }

  return (
    <InputGroup className="mb-6">
      <FormControl
        value={logdataGroup}
        onChange={onUpdate}
        isValid={validated && isValid}
        isInvalid={validated && isInvalid}
      />
      <Button
        variant="outline-light"
        onClick={onSubmit}
      >
        更新
      </Button>
      <FormControl.Feedback type="invalid">
        更新に失敗しました
      </FormControl.Feedback>
      <FormControl.Feedback type="valid">
        更新しました
      </FormControl.Feedback>
    </InputGroup>
  )
}

export default LogdataGroupForm