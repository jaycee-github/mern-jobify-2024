import {
    Link,
    Form,
    redirect,
    useNavigate,
    useActionData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // const errors = {
    // 	message: "",
    // };

    // if (data.password.length < 3) {
    // 	errors.message = "password too short";
    // 	return errors;
    // }

    // console.log(errors);

    try {
        await customFetch.post("/auth/login", data);
        toast.success("Logged-in Successfully!");
        return redirect("/dashboard");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
        // errors.message = error?.response?.data?.message;
        // return errors;
    }
};

const Login = () => {
    // const errors = useActionData();
    // console.log(errors);

    // use redirect for actions/loaders
    // use useNavigate for components
    const navigate = useNavigate();

    const loginDemoUser = async () => {
        const data = {
            email: "test@test.com",
            password: "secret123",
        };

        try {
            await customFetch.post("/auth/login", data);
            toast.success("Take a test drive!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Login</h4>
                {/* {errors?.message && (
					<p style={{ color: "red" }}>{errors.message}</p>
				)} */}
                <FormRow type="email" name="email" />
                <FormRow type="password" name="password" />
                <SubmitBtn formBtn />
                <button
                    type="button"
                    className="btn btn-block"
                    onClick={loginDemoUser}
                >
                    Explore the App
                </button>
                <p>
                    Not a member yet?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Login;
