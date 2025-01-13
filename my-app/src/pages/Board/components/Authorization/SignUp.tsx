// import React, { useState } from "react";
import React, { useState } from "react";
import "./SignUp.scss";
import api from "../../../../api/request";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const Email = (e: any) => {
    setEmail(e.target.value);
  };
  const [WrongPasswordOrEmail,setWrongPasswordOrEmail] = useState<any>()

  const Pass = (e: any) => {
    setPassword(e.target.value);
  };

  const SingUp = () => {
    let data: any;

    console.log(password, email);
    if (email == undefined || password == undefined) {
      console.log("undef");
    } else {
      const Fetch = async () => {
        try {
          data = await api.post("/login", {
            email,
            password,
          });
          if (data && data.token) {
            console.log(data.token);
            localStorage.setItem("data", data.token);
            localStorage.setItem("refresh", data.refreshToken);

            setWrongPasswordOrEmail(<div className="WrongPasswordOrEmail"></div> )

          } else {
            console.log("ADA");
          }
          setTimeout(() => {
            navigate("/");
          }, 400);
          
        } catch (e) {
          console.log(e);
          console.log("da")
          setWrongPasswordOrEmail(<div className="WrongPasswordOrEmail">Невірний пароль або email</div> )


        }
      };
      Fetch();
    }
  };
  const [ShowPassword,setShowPassword] = useState<any>("password")
  const ShowPass = () =>{
    
    if(ShowPassword == "password"){
      setShowPassword(" ")
    }else{
      setShowPassword("password")
    }
  }
 return (
    <>
      <div className="Authorization">
        <div className="Authorization-div1">
          <h3 className="SingUp">Вхід</h3>
          <p className="emailSign">Email</p>
          <input
            className="Authorization-input1"
            onChange={(e) => Email(e)}
          ></input>
          <p className="passwordSign" >Пароль</p>
          <input
            className="Authorization-input1"
            onChange={(e) => Pass(e)}
            type={ShowPassword}
          ></input>
          <div className="ShowPassword" onClick={() => ShowPass()}>👁️</div>
          {WrongPasswordOrEmail}
          <div className="Registration" onClick={() => SingUp()}>
            Увійти
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
