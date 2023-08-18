import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import { setUser } from "../store/global";

export const URL_API_ACCOUNTS =
  "https://64c7a27aa1fe0128fbd50f0a.mockapi.io/accounts";

export const LoginContainer = () => {
  const { handleSubmit, control } = useForm();
  const [loginSuccess, setLoginSuccess] = useState(true)

  const dispatch = useDispatch()

  const handleLogin = async (values) => {
    const resAccounts = await axios.get(URL_API_ACCOUNTS);
    const accountLoginFound = resAccounts.data.find(
      (account) => account.username === values.username
    );

    if (accountLoginFound && accountLoginFound.password === values.password) {
      setLoginSuccess(true)
      dispatch(setUser(accountLoginFound))
    } else {
      setLoginSuccess(false)
    }
  };

  return (
    <>
      <Container
        style={{ marginTop: 100, paddingLeft: 200, paddingRight: 200 }}
      >
        <h3>Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <InputGroup>
            <InputGroupText>@</InputGroupText>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="username" type="text" />
              )}
            />
          </InputGroup>
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="password" type="password" />
            )}
          />  
          <br />
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>

        <br/>
        <Toast    isOpen={!loginSuccess}>
          <ToastHeader icon='danger' toggle={() => setLoginSuccess(!loginSuccess)}>
            Login Failed
          </ToastHeader>
          <ToastBody>
              Pls check username, password
          </ToastBody>
        </Toast>
      </Container>
    </>
  );
};
