import React, { useEffect, useState } from "react";
import "./Authorization.scss";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../api/request";
import { checkPasswordComplexity } from "check-password-complexity";

function Authorization() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [Result, setResult] = useState<any>(null);
  const [passwordVsPassword,setpasswordVsPassword] = useState<any>()
  const [redcolor,setRedColor] = useState<any>()
  // const [style,setStyle] = useState({color: "gray"})

  const passwordConfig = {
    minLength: 8,
    maxLength: 36,
    minLowerCase: 1,
    minUpperCase: 1,
    // returnScore: true,
  };

  const Email = (e: any) => {
    // console.log(e.target.value)
    setEmail(e.target.value);
  };
  const result: any = checkPasswordComplexity(password, passwordConfig);

  const [passwordCheck, setPAsswordCheck] = useState<any>();

  const Pass = (e: any) => {
    setPassword(e.target.value);

    const result: any = checkPasswordComplexity(e.target.value, passwordConfig);
    setResult(result);
    console.log(result);
    console.log(e.target.value);

    switch (result?.value) {
      case "strong":
        console.log(result.value);
        setPAsswordCheck(
          <div  className="strongpass">
            <span className="redBad"></span>
            <span className="orangeNormal"></span>
            <span className="yellowGood"></span>
            <span className="greenGoodpp"></span>
          </div>,
        );

        break;
      case "weak":
        setPAsswordCheck(
          <div  className="strongpass">
            <span className="redBad"></span>
            <span className="orangeNormal"></span>
            <span className="grayDefault" style={{ left: "-14px" }}></span>
            <span className="grayDefault" style={{ left: "-7px" }}></span>
          </div>,
        );

        break;
      case "medium":
        setPAsswordCheck(
          <div  className="strongpass">
            <span className="redBad"></span>
            <span className="orangeNormal"></span>
            <span className="yellowGood"></span>
            <span className="grayDefault" style={{ left: "-7px" }}></span>

          </div>,
        );

        break;
      case "tooWeak":
        setPAsswordCheck(
          <div className="strongpass">
            <span className="redBad"></span>
            <span className="grayDefault" style={{ left: "-22px" }}></span>
            <span className="grayDefault" style={{ left: "-14px" }}></span>
            <span className="grayDefault" style={{ left: "-7px" }}></span>
          </div>,
        );

        break;
    }
  };

  // let redColor:any
  const Pass2 = (e: any) => {
    setPassword2(e.target.value);
  };
  const Perevirka = () => {
    if (password == password2) {
      Regestration();
    } else {
      // console.log("НЕ СПІВПАДАЮТЬ");
      setpasswordVsPassword( <div className="passwordVsPassword">Паролі не співпадають</div>)
      if(Result?.value !==  "strong"){
        setRedColor({ color: "red" })
      }
    }
  };
  const Regestration = () => {
    console.log(password);
    console.log(email);


    if(Result?.value ==  "strong"){
      console.log("Fetch")
     

      const Fetch = async () => {
        try {
          // const i: any = await api.post("/user", {
          //   email: email,
          //   password: password,
          // });
          // console.log(i);

          // getdata()

          setRedColor({ color: "black" })
          setpasswordVsPassword(<div className="passwordVsPassword"></div>)
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (e) {
          console.log(e);
        }
      };
      Fetch()
    



      const getdata = async () =>{
        const data:any = await api.post("/login", {
          email: email,
          password:password,
        });
        if (data && data.token) {
          console.log(data.token);
          localStorage.setItem("data", data.token);
          localStorage.setItem("refresh", data.refreshToken);
        } else {
          console.log("ADA");
        }
      }

    }else{
      setRedColor({ color: "red" })
      console.log("adadssadad")
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
          <div className="ShowPassworda"  onClick={() => ShowPass()}>👁️</div>
          <h3 className="Authorization-h3">Зареєструватися</h3>
          <p className="email">Email</p>
          <input
            className="Authorization-input"
            onChange={(e) => Email(e)}
          ></input>
          <p className="password-1">Пароль</p>
          <input
            className="Authorization-input"
            onChange={(e) => Pass(e)}
            type={ShowPassword}
          ></input>
                    

          <span className="helpI">
            <span className="helpOi" style={redcolor}>
              ⓘ
            </span>
            <span className="helpI2">
              Паролі повинні включати не менше 8 знаків,які стосуються принаймні
              двох з наступних типів: літери верхнього та нижнього регістрів,
              цифри та символи.
            </span>
          </span>
          <div className="CheckPassword">
            {passwordCheck}
          </div>
          <p className="password-2">Повторіть пароль</p>
          <input
            className="Authorization-input"
            onChange={(e) => Pass2(e)}
          ></input>

          {passwordVsPassword}
          <div className="Registration" onClick={() => Perevirka()}>
            Зареєструватися
          </div>
          <div className="Have-Account">
            Вже є акаунт?
            <Link to={"/authorization"}>
              <span>Увійти</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Authorization;
