import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ZERO_ADDRESS } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "./ui/card";
import Spinner from "./ui/spinner";

export function BridgeForm(props: {
  isEnabled: boolean;
  isLoading: boolean;
  onBridge: ({
    amount,
    recipientAddress,
  }: {
    amount: number;
    recipientAddress: string;
  }) => Promise<void>;
}) {
  const formSchema = z.object({
    amount: z.coerce.number().positive({
      message: "Amount must be positive number.",
    }),
    recipientAddress: z.string({}).regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Recipient address should be a valid ethereum address.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      recipientAddress: ZERO_ADDRESS,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await props.onBridge({
      amount: values.amount,
      recipientAddress: values.recipientAddress,
    });
  };

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USDC Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      disabled={!props.isEnabled || props.isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Amount of USDC you want to bridge to the Recipient Address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={ZERO_ADDRESS}
                      {...field}
                      disabled={!props.isEnabled || props.isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Recipient address in Ethereum Sepolia (Testnet)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!props.isEnabled || props.isLoading}
            >
              {props.isLoading && <Spinner />}
              Bridge
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
