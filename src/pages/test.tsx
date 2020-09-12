import BaseHeader from "components/BaseHeader";
import Input from "components/Input";

export default function BasePage() {
  return (
    <>
      <div className="p-10 w-1/2 bg-red-400">
        <Input label="Cryptocurrency Code" />
      </div>

      <div className="p-10">
        <fieldset>
          <p>Some text</p>
          <p>Some text</p>
          <legend>Yeah</legend>
        </fieldset>
        <style jsx>{`
          fieldset {
            padding: 1rem;
            border: 1px solid black;
          }
        `}</style>
      </div>
    </>
  );
}
