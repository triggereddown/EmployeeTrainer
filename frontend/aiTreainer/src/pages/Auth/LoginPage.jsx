// import React,{useState } from 'react';
// import {Link, useNavigate} from 'react-router-dom';
// // import {useAuth} from '../../context/AuthContext';
// // import authService from '../../services/authService';
// import xyz from '../../'
// import {BrainCircuit , Mail ,Lock ,ArrowRight} from 'lucide-react'
// import toast from 'react-hot-toast';

// const LoginPage = () => {

//   const [email, setEmail] = useState('kunal@deep.com');
//   const [password , setPassword] = useState ('Test@123');
//   const [error , setError] = useState ('');
//   const [focusedField, setFocusedField] =useState(null);

//   const navigate = useNavigate();
//   // const {login} = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try{
//       const { token, user } = await authService.login(email, password);
//       login(user, token);
//       toast.success ('Logged in successfully!');
//       navigate('/dashboard');
//     } catch(err){
//       setError(err.message || 'Failed to login. Please chech your credentails.');
//       toast.error(err.message || 'Failed to login.');
//     } finally{
//       setLoading(false);
//     }
//   };

//  return (
//   <div className='text-red-800'>Triggu bhai</div>
// //     <div className="">
// //       <div className="" />
// //       <div className="">
// //         <div className="">
// //           {/*Header*/}
// //           <div className="">
// //             <div className="">
// //               <Brainircuit className="" strokeWidth={2}/>
// //               </div>
// //               <h1 className="">
// //                 Welcome back
// //               </h1>
// //               <p className="">
// //                 Sign in to cntinue your journey
// //               </p>
// //               </div>

// //               {/*Form*/}
// //               <div className="">
// //                 {/*Email Field*/}
// //                 <div className="">
// //                   <label className="">
// //                     Email
// //                   </label>
// //                   <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === 'email' ? 'text-emerald-500' : 'text-slate-400'}`}>
// //                     <Mail className="" strokeWidth={2} />
// //                     </div>
// //                     <input
// //                      />
//   )
// };

// export default LoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token (adjust key if needed)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg mb-6">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-2xl font-medium text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    focusedField === "email"
                      ? "text-emerald-500"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    focusedField === "password"
                      ? "text-emerald-500"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Sign up
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
