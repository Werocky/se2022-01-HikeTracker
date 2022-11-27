'use strict';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import API from '../API';

function VerifiedMessage() {

    useEffect(() => {
       async function verification(){
        try {
          await API.verify();
        } catch (err) {
          // handling error
        }
       }
       verification();
      }, []);

    return (
      <Alert variant="success">
        <Alert.Heading>Verification succeded!</Alert.Heading>
        <p>
            Now your account is verified.
        </p>
        <hr />
        <p className="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things
          nice and tidy.
        </p>
      </Alert>
    );
  }
  
  export default VerifiedMessage;