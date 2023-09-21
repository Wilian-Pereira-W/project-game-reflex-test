import Header from '../Header';
import styles from './styles.module.scss';
function Login() {
  return (
    <div className={styles.container}>
      <Header />
      <form>
        <div className="input-container">
          <label>Nome</label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div>
        <a>Criar um conta</a>
      </div>
    </div>
  );
}

export default Login;
