import Footer from "../components/footer/Footer";
import LoginForm from "../components/forms/LoginForm";
import MyAppBar from "../components/my_app_bar/MyAppBar";

function LoginUser() {
  return (
    <div>
      <MyAppBar />
      <LoginForm />
      <Footer />
    </div>
  );
}
export default LoginUser;
