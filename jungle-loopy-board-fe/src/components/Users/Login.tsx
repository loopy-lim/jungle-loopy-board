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
import { RoutesLink } from "@/components/Link";
import { useLoginMutate } from "@/hooks/react-query/useUserQuery";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(20),
});

const Login = () => {
  const { mutate, isPending, isError } = useLoginMutate();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, { onSuccess: () => navigate("/") });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-72 flex-col items-center justify-center gap-3 p-4"
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
        <div className="h-4 text-red-600">
          {isError && "이메일이 없거나 비밀번호가 틀렸습니다."}
        </div>
        <div className="flex w-full gap-3 [&>*]:flex-1">
          <Button variant="outline" type="button" asChild>
            <RoutesLink to="/login">회원가입</RoutesLink>
          </Button>
          <Button disabled={isPending} type="submit">
            로그인
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Login;
