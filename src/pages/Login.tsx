import styled from 'styled-components';
import compLogo from '../assets/comp-logo.png';
import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { useGoogleLogin } from '@react-oauth/google';
import { UserContextActionTypes, useUserContext } from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
import { useIsLoggedInUser } from '../utils/customHooks';
import { useEffect } from 'react';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    max-width: 200px;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
      transform-origin: center center;
    }
  }
  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    text-align: center;
  }
`;

const Login = () => {
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedInUser();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      dispatch({
        type: UserContextActionTypes.SetLoggedInUser,
        payload: { user: codeResponse },
      });

      //   await getUserProfile(codeResponse.access_token);
      //   await isUserAdmin(codeResponse.access_token);
      navigate('/mybudget');
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  useEffect(() => {
    if (isLoggedIn) navigate('/mybudget');
  }, [isLoggedIn, navigate]);

  return (
    <LoginWrapper>
      <img src={compLogo} alt="Competence budget" />
      <Divider spacing="s" color="transparent" />
      <h1>My competence budget</h1>
      <Divider spacing="l" color="transparent" />
      <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
    </LoginWrapper>
  );
};

export default Login;
