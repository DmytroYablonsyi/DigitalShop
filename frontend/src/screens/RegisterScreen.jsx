import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from "react-toastify";


const RegisterScreen = () => {
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [ register, {isLoading} ] = useRegisterMutation();

   const { userInfo } = useSelector((state) => state.auth);

   const { search } = useLocation();
   const sp = new URLSearchParams(search);
   const redirect = sp.get('redirect') || '/' ;


   useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
   }, [userInfo, redirect, navigate ])

   const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        toast.error('Passwords do not match');
        return
    } else {
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error) 
        }
    }
   
   }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
        <FormGroup className="my-3" controlId="name">
                <FormLabel>Name</FormLabel>
                <FormControl type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}>  
                </FormControl>
            </FormGroup>

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

            <FormGroup className="my-3" controlId="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>  
                </FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>Register</Button>
            { isLoading && <Loader/> }
        </Form>
        <Row className="py-3">
            <Col>
            Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen