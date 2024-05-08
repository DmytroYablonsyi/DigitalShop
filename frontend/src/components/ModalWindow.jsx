import { Alert } from 'react-bootstrap';

const AlertWindow = ({alertState, name}) =>  {

  return (
    <>
      <Alert show={alertState} variant="success" >
        <Alert.Heading>Success!</Alert.Heading>
        <p>
          { name } added to cart
        </p>
      </Alert>
    </>
  );
}

export default AlertWindow;
