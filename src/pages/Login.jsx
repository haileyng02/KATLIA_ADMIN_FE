import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Form, Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import signInProcess from "../utils/signInProcess";
import decorationImage from "../images/login-decoration.png";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //Sign in with email and password
  const signInWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const result = await appApi.post(
        routes.SIGN_IN,
        routes.getSigninBody(email, password)
      );
      console.log(result);
      signInProcess({
        token: result.data.access_token,
        dispatch,
        navigate,
      });
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message;
        if (message === "User's not exist") {
          form.setFields([
            {
              name: "email",
              errors: [message],
            },
          ]);
        } else if (message === "Password incorrect") {
          form.setFields([
            {
              name: "password",
              errors: [message],
            },
          ]);
        }
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  const handleOnCLick = () => {
    form.validateFields().then((values) => {
      signInWithEmailAndPassword(values.email, values.password);
    });
  };

  return (
    <div className="bg-[#FFEFD3] w-screen h-screen px-[3.47%] py-[70px]">
      <div className="bg-white w-full h-full rounded-[25px] border-1 border-[#00000080] flex justify-between">
        <img src={decorationImage} alt="Login" />
        <div className="h-full basis-1/2 flex flex-col justify-center  px-[3.7%]">
          <Spin spinning={loading}>
            <h1 className="font-inter font-bold text-[45px] text-customer-primary">
              Welcome Back!
            </h1>
            <Form form={form}>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "You must enter your email",
                  },
                  {
                    type: "email",
                    message: "This is not a valid email",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  className="login-input"
                />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "You must enter password",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Password"
                  className="login-input"
                />
              </Form.Item>
            </Form>
            <button
              onClick={handleOnCLick}
              className="bg-customer-primary w-full h-[52px] rounded-lg font-bold text-[#FAFAFA] mt-[53px]"
            >
              Sign In
            </button>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Login;
