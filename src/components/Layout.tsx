// import React, { useEffect } from 'react';
import styled from 'styled-components';

import compLogo from '../assets/comp-logo.png';
import { googleLogout } from '@react-oauth/google';
import { Grid } from './Grid';
import { Column } from './Column';
import { Button } from './Button';
import { UserContextActionTypes, useUserContext } from '../utils/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserImage } from './UserImage';
import { useIsLoggedInUser, useSessionStorage } from '../utils/customHooks';
import { useEffect } from 'react';
import { BREAKPOINTS } from '../theme';

const PageWrapper = styled.div`
  width: 1024px;
  max-width: 100%;
  margin: 0 auto;
  border-left: ${({ theme }) => `1px solid ${theme.colors.silver}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.silver}`};
`;

const Header = styled.header`
  padding: 2rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.silver}`};
  h1 a {
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    text-decoration: none;
    img {
      max-width: 60px;
      margin-right: 0.5rem;
      display: inline-flex;
    }
  }
  @media screen and (min-width: ${BREAKPOINTS.xs
      .min}px) and (max-width: ${BREAKPOINTS.xs.max}px) {
    h1 {
      font-size: 1.3rem;
      a img {
        max-width: 50px;
      }
    }
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1rem;
  > div {
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: ${BREAKPOINTS.xs
      .min}px) and (max-width: ${BREAKPOINTS.xs.max}px) {
    flex-direction: column;
    width: 100%;
    > div {
      justify-content: center;
    }
  }
`;

const UserName = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
`;

const Content = styled.div`
  padding: 2rem;
`;

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const {
    state: { loggedInProfile, isAdmin },
    dispatch,
  } = useUserContext();

  const isLoggedIn = useIsLoggedInUser();

  const [, setValue] = useSessionStorage('cb-token', undefined);

  const navigate = useNavigate();

  const logOut = () => {
    googleLogout();
    setValue(undefined);
    dispatch({
      type: UserContextActionTypes.ResetUser,
      payload: true,
    });
    navigate('/login');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <PageWrapper>
      <Header>
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <h1>
              <Link to="/mybudget">
                <img src={compLogo} alt="Competence budget" />
                Competence budget
              </Link>
            </h1>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12" alignItems="flex-end">
            <ProfileWrapper>
              {isAdmin && (
                <Button onClick={() => navigate('/admin')}>Admin</Button>
              )}
              <Button priority="outline" onClick={logOut}>
                Log out
              </Button>
              {loggedInProfile && (
                <div>
                  <UserName>{loggedInProfile.profile.name}</UserName>
                  <UserImage
                    url={loggedInProfile.profile.picture}
                    size={50}
                    alt={loggedInProfile.profile.name}
                  />
                </div>
              )}
            </ProfileWrapper>
          </Column>
        </Grid>
      </Header>
      <Content>{children}</Content>
    </PageWrapper>
  );
};
