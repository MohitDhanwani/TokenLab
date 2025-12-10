import FormInput from "@/components/ui/forminput";
import { Box } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { TokenFormSchema, TokenFormType } from "@/data/FormData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useWallet from "@/utils/ConnectWallet";
import { Connection, Transaction } from "@solana/web3.js";

export default function CreateToken() {
  const { walletAddress } = useWallet();

  const form = useForm<TokenFormType>({
    resolver: zodResolver(TokenFormSchema),
    defaultValues: {
      TokenName: "",
      Symbol: "",
      Decimals: "",
      TotalSupply: "",
      Description: "",
    },
  });

  const handleFormSubmit = async (data: TokenFormType) => {
    if (!walletAddress) {
      toast.error("Install Phantom Wallet before proceeding further");
      return;
    }
    const payload = { ...data, connectedWalletPublicKey: walletAddress };
    const backendMintResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/mintTokens`, payload);
    const response = await backendMintResponse.data;

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const tx1 = Transaction.from(Buffer.from(response.mintTx, "base64"));
    const signedTx1 = await (window as any).solana.signTransaction(tx1);
    const signatureOne = await connection.sendRawTransaction(signedTx1.serialize());
    await connection.confirmTransaction(signatureOne);

    const tx2 = Transaction.from(Buffer.from(response.mintAndSupplyTx, "base64"));
    const signedTx2 = await (window as any).solana.signTransaction(tx2);
    const signatureTwo = await connection.sendRawTransaction(signedTx2.serialize());
    await connection.confirmTransaction(signatureTwo);

    toast.success("Tokens created successfully! Please check your wallet");
  };

  return (
    <div className="w-full border-2 border-black mt-10 p-1">
      <div className="w-full max-w-3xl border-2 border-black p-8 bg-white">
        <div className="flex flex-col gap-4">
          <div className="bg-black p-4 w-16 flex justify-center">
            <Box color="white" />
          </div>
          <h1 className="text-3xl font-bold font-mono">CREATE TOKEN</h1>
          <div className="font-mono">Fill the details below to deploy your own cryptocurrency. No code needed.</div>
        </div>

        <div className="pt-8">
          <Form {...form}>
            <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(handleFormSubmit)}>
              <FormInput label="TOKEN NAME" name="TokenName" classname={"bg-primary py-7 px-4 text-xl!"} placeholder="e.g. Billy Token" />

              <div className="flex gap-4 w-full max-w-3xl">
                <FormInput label="TOKEN SYMBOL" name="Symbol" classname={"bg-primary py-7 px-4 text-xl!"} placeholder="e.g. MSH" />

                <FormInput label="DECIMALS" name="Decimals" classname={"bg-primary py-7 px-4 text-xl!"} placeholder="e.g. 6" />
              </div>

              <FormInput label="TOTAL SUPPLY" name="TotalSupply" classname={"bg-primary py-7 px-4 text-xl!"} placeholder="e.g. 1000000000" />

              <FormInput
                label="DESCRIPTION"
                name="Description"
                classname={"bg-primary py-7 px-4 text-xl!"}
                placeholder="Short description about your token utility and purpose"
                descriptive={true}
              />

              <Button varient="primary" disabled={false} name={"+ Create Now"} classname={"font-bold"} type="submit" />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
