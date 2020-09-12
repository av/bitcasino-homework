import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";

export default function CryptoSelector() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log("SUBMIT", data);
  };

  console.log(watch("code"));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="code"
          label="Cryptocurrency Code"
          ref={register}
          className="mb-2"
        />
        <Button type="submit" className="w-full">
          <span>Add</span>
        </Button>
      </form>
    </>
  );
}
