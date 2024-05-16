import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import useSignup from "../../Hooks/useSignup";

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignup();   // **ABSTRACTION**



  return (
    <>
      <Input
        fontSize={14}
        size={'sm'}
        type="text"
        placeholder="enter your full name"
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />

      <Input
        fontSize={14}
        size={'sm'}
        type="text"
        placeholder="username"
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />

      <Input
        fontSize={14}
        size={'sm'}
        type="email"
        placeholder="enter your email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <InputGroup>
        <Input
          fontSize={14}
          size={'sm'}
          //type="password"
          type={showPassword ? "text" : "password"}
          placeholder="enter valid password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h='full'>
          <Button
            variant={'ghost'}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>

      )}

      <Button
      w={"full"}
      colorScheme='blue'
      size={"sm"}
      fontSize={14}
      isLoading={loading}
      onClick={() => signup(inputs)}
    >
      Sign Up
    </Button>
    </>
  );
};

export default Signup;