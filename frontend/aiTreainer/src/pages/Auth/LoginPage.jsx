import React,{useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import {useAuth} from '../../context/AuthContext';
// import authService from '../../services/authService';
import xyz from '../../'
import {BrainCircuit , Mail ,Lock ,ArrowRight} from 'lucide-react'
import toast from 'react-hot-toast';


const LoginPage = () => {

  const [email, setEmail] = useState('kunal@deep.com');
  const [password , setPassword] = useState ('Test@123');
  const [error , setError] = useState ('');
  const [focusedField, setFocusedField] =useState(null);

  const navigate = useNavigate();
  // const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try{
      const { token, user } = await authService.login(email, password);
      login(user, token);
      toast.success ('Logged in successfully!');
      navigate('/dashboard');
    } catch(err){
      setError(err.message || 'Failed to login. Please chech your credentails.');
      toast.error(err.message || 'Failed to login.');
    } finally{
      setLoading(false);
    }
  };

 return (
  <div className='text-red-800'>Triggu bhai</div>
//     <div className="">
//       <div className="" />
//       <div className="">
//         <div className="">
//           {/*Header*/}
//           <div className="">
//             <div className="">
//               <Brainircuit className="" strokeWidth={2}/>
//               </div> 
//               <h1 className="">
//                 Welcome back
//               </h1>
//               <p className="">
//                 Sign in to cntinue your journey
//               </p>
//               </div>

//               {/*Form*/}
//               <div className="">
//                 {/*Email Field*/}
//                 <div className="">
//                   <label className="">
//                     Email
//                   </label>
//                   <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === 'email' ? 'text-emerald-500' : 'text-slate-400'}`}>
//                     <Mail className="" strokeWidth={2} />
//                     </div>
//                     <input
//                      />
  )
};

export default LoginPage;
