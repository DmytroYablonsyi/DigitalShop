import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from "react-toastify";


const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [ login, {isLoading} ] = useLoginMutation();

   const { userInfo } = useSelector((state) => state.auth);

   const { search } = useLocation();
   console.log(useLocation())
   const sp = new URLSearchParams(search);
   console.log(sp)
   const redirect = sp.get('redirect') || '/' ;
   console.log(redirect)
   console.log(sp)


   useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
   }, [userInfo, redirect, navigate ])

   const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect);
    } catch (err) {
        toast.error(err?.data?.message || err.error) 
    }
   }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup className="my-3" controlId="email">
                <FormLabel>Email Address</FormLabel>
                <FormControl type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}>  
                </FormControl>
            </FormGroup>

            <FormGroup className="my-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}>  
                </FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>Sign In</Button>
            { isLoading && <Loader/> }
        </Form>
        <Row className="py-3">
            <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen