import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// action needs to return something
// else it will produce an error
export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // console.log(data);

    try {
        await customFetch.post("/auth/register", data);
        toast.success("Registration Successful!");
        return redirect("/login");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
};

const Register = () => {
    // const navigation = useNavigation();
    // console.log(navigation);

    // const isSubmitting = navigation.state === "submitting";

    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Register</h4>
                <FormRow type="text" name="name" />
                <FormRow
                    type="text"
                    name="lastName"
                    labelText="last name"
                    defaultValue="chavez"
                />
                <FormRow type="text" name="location" />
                <FormRow type="text" name="email" />
                <FormRow type="password" name="password" />
                <SubmitBtn formBtn />
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Register;
