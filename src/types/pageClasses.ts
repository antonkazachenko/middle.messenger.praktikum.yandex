import {ChangeDataPage, LoginPage, RegisterPage} from "../pages";

type PageClass = typeof LoginPage | typeof RegisterPage | typeof ChangeDataPage;

export default PageClass;
