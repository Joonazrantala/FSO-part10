import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignInForm from "../../components/SignInForm";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      //fake formik object for the test:
      const formik = {
        values: {
          username: "",
          password: "",
        },
        errors: {},
        touched: {},
        handleChange: (field) => (value) => {
          formik.values[field] = value; // manually mutate values (fine in tests)
        },
        handleSubmit: () => onSubmit({ ...formik.values }),
      };

      render(<SignInForm {...formik}></SignInForm>);
      screen.debug();

      fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.press(screen.getByText("Sign In"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
