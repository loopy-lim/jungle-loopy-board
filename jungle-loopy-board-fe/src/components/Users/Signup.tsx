import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutate } from "@/hooks/react-query/useUserQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RoutesLink } from "@/components/Link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(20),
  name: z.string().min(2).max(20),
});

const Signup = () => {
  const { mutate, isError } = useSignupMutate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => navigate("/"),
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <div className="flex h-full w-full min-w-[28rem] flex-col items-center justify-center rounded-lg bg-white p-8">
      <h1 className="text-3xl font-bold">SIGNUP</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-96 flex-col justify-center gap-3 p-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Password" type="password" />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="h-4 text-red-600">{isError && errorMessage}</div>
          <div className="flex w-full [&>*]:flex-1">
            <Button variant="default" type="submit">
              회원가입
            </Button>
          </div>

          <Button
            asChild
            variant={"ghost"}
            className="text-gray-400 hover:text-gray-600"
          >
            <RoutesLink to="/login">로그인</RoutesLink>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
