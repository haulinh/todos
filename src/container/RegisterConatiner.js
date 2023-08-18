import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

export const URL_API_ACCOUNTS =
  "https://64c7a27aa1fe0128fbd50f0a.mockapi.io/accounts";

export const RegisterContainer = () => {
  const { handleSubmit, control } = useForm();

  const handleRegister = (values) => {
    axios.post(URL_API_ACCOUNTS, values);
  };

  return (
    <>
      <Container
        style={{ marginTop: 100, paddingLeft: 200, paddingRight: 200 }}
      >
        <h3>Register</h3>
        <form onSubmit={handleSubmit(handleRegister)}>
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
            Register
          </Button>
          <Link style={{marginLeft: 16}} to="/login">
            <Button>Login</Button>
          </Link>
        </form>
      </Container>
    </>
  );
};
