import FormInput from "@/components/ui/forminput";
import { Box } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";

export default function CreateToken() {
  const form = useForm();

  return (
    <div className="w-full border-2 border-black mt-10 p-1">
      <div className="w-full max-w-3xl border-2 border-black p-8 bg-white">
        <div className="flex flex-col gap-4">
          <div className="bg-black p-4 w-16 flex justify-center">
            <Box color="white" />
          </div>
          <h1 className="text-3xl font-bold font-mono">CREATE TOKEN</h1>
          <div className="font-mono">
            Fill the details below to deploy your own cryptocurrency. No code needed.
          </div>
        </div>

        <div className="pt-8">
          <Form {...form}>
            <form className="flex flex-col gap-8">
              <FormInput
                label="TOKEN NAME"
                name="TokenName"
                classname={"bg-primary py-7 px-4 text-xl!"}
                placeholder="e.g. Billy Token"
              />

              <div className="flex gap-4 w-full max-w-3xl">
                <FormInput
                  label="TOKEN SYMBOL"
                  name="Symbol"
                  classname={"bg-primary py-7 px-4 text-xl!"}
                  placeholder="e.g. MSH"
                />

                <FormInput
                  label="DECIMALS"
                  name="Decimals"
                  classname={"bg-primary py-7 px-4 text-xl!"}
                  type="number"
                  placeholder="e.g. 6"
                />
              </div>

              <FormInput
                label="TOTAL SUPPLY"
                name="TotalSupply"
                classname={"bg-primary py-7 px-4 text-xl!"}
                placeholder="e.g. 1000000000"
              />

              <FormInput
                label="DESCRIPTION"
                name="Descripiton"
                classname={"bg-primary py-7 px-4 text-xl!"}
                placeholder="Short description about your token utility and purpose"
                descriptive={true}
              />

              <Button varient="primary" disabled={false} name={"+ Create Now"} classname={"font-bold"} />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
