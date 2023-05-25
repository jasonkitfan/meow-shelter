import Footer from "../components/footer/Footer";
import UserRegistrationForm from "../components/forms/UserRegistrationForm";
import MyAppBar from "../components/my_app_bar/MyAppBar";

function RegisterUser() {
  return (
    <div>
      <MyAppBar />
      <UserRegistrationForm />
      <Footer />
    </div>
  );
}
export default RegisterUser;
