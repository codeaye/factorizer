import {
  Progress,
  Input,
  Box,
  Heading,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Button,
  Center,
} from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api";
import { useState } from "react";
import { HiOutlineClipboard } from "react-icons/hi";

function App() {
  const min = 0;
  const max = 15000;

  const [value, setValue] = useState(1);
  const [out, setOut] = useState("1");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetError = () => {
    setError(null);
    setIsError(false);
  };
  const getFactorial = async (n) => await invoke("factorial", { num: n });
  const handleOutput = async (value) => {
    const number = parseInt(value);
    setOut(await getFactorial(number));
    setLoading(false);
  };
  const handleInputChange = async (event) => {
    resetError();
    const value = event.target.value.replace(/\D/g, "");
    console.log(value);
    if (value == "" || !value || isNaN(value)) {
      setError("Input must be a number");
      setIsError(true);
      setValue(value);
      return setLoading(false);
    }
    const number = parseInt(value);
    if (number < min || number > max) {
      setError(`Input must be more than ${min} and less than ${max}`);
      setIsError(true);
      setValue(value);
      return setLoading(false);
    }
    setLoading(true);
    setValue(value);
    handleOutput(value);
  };
  const handleCopy = async () => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(out);
    } else {
      return document.execCommand("copy", true, out);
    }
  };

  return (
    <>
      
      <Center height="100vh">
        <Container>
          <Center mb={2.5}>
            <Heading>Factorizer</Heading>
          </Center>
          <Container>
            <FormControl isInvalid={isError}>
              <Input
                value={value}
                onChange={handleInputChange}
                placeholder="1"
                size="md"
                isDisabled={loading}
              />
              {isError ? (
                <FormErrorMessage>{error}</FormErrorMessage>
              ) : (
                <FormHelperText>Enter a number</FormHelperText>
              )}
            </FormControl>
          </Container>
          <Box mt={5} mb={5}>
            <Container centerContent>
              <Textarea
                value={out}
                placeholder="1"
                size="md"
                isDisabled={loading}
              />
            </Container>
          </Box>
          <Center>
            <Button
              colorScheme="green"
              onClick={handleCopy}
              isDisabled={loading}
            >
              <HiOutlineClipboard /> Copy
            </Button>
          </Center>
        </Container>
      </Center>
    </>
  );
}

export default App;
