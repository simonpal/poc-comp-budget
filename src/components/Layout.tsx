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
import { useCookie, useIsLoggedInUser } from '../utils/customHooks';
import { useEffect } from 'react';
import { DropMenuButton } from './DropMenuButton';
import { ToggleSwitch } from './ToggleSwitch';
import { Label } from './FormControl/Label';
import { TOKEN_COOKIE } from '../utils/constants';
import addDays from 'date-fns/addDays';

const PageWrapper = styled.div`
  width: 1024px;
  max-width: 100%;
  margin: 0 auto;
  border-left: ${({ theme }) => `1px solid ${theme.colors.silver}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.silver}`};
`;

const ListSwitch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) 0;
`;

const UserButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Header = styled.header(
  ({ theme }) => `
  padding: 2rem;
  border-bottom: 1px solid ${theme.colors.silver};
  h1 a {
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    text-decoration: none;
    img {
      max-width: 60px;
      margin-right: 0.5rem;
      display: inline-flex;
    }
  }
  @media screen and (min-width: ${theme.breakpoints.xs.min}px) and (max-width: ${theme.breakpoints.xs.max}px) {
    h1 {
      font-size: 1.3rem;
      a img {
        max-width: 50px;
      }
    }
    .logo-col {
      align-items: center;
      justify-content: center;
    }
  }
`
);

const ProfileWrapper = styled.div(
  ({ theme }) => `
  display: flex;
  gap: 1rem;
  > div {
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: ${theme.breakpoints.xs.min}px) and (max-width: ${theme.breakpoints.xs.max}px) {
    flex-direction: column;
    width: 100%;
    > div {
      justify-content: center;
    }
  }
`
);

const UserName = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 2rem;
`;

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const {
    state: { isAdmin, googleUser, storedSettings },
    dispatch,
  } = useUserContext();

  const isLoggedIn = useIsLoggedInUser();
  // const { preferedTheme, switchTheme } = usePreferedTheme();

  // const [cookieSettings, setCookieSettings] = useCookie(SETTINGS_COOKIE, '');
  const [_, updateItem] = useCookie(TOKEN_COOKIE, '');

  // const [, setValue] = useSessionStorage('cb-token', undefined);
  // const settings: CookieSettings = useMemo(() => {
  //   console.log('COOKIE SETTINGS', cookieSettings);
  //   if (cookieSettings && cookieSettings.length) {
  //     try {
  //       const data = JSON.parse(cookieSettings);
  //       console.log('SET SETTINGS', data);
  //       return data;
  //     } catch (e) {
  //       console.error(e);
  //       return undefined;
  //     }
  //   }
  //   return undefined;
  // }, [cookieSettings]);

  // const switchTheme = useCallback(() => {
  //   console.log('SWITCH THEME', settings);
  //   if (settings) {
  //     // const settings = JSON.parse(cookieSettings);
  //     console.log(settings);
  //     setCookieSettings(
  //       JSON.stringify({ ...settings, darkTheme: !settings.darkTheme }),
  //       SETTINGS_COOKIE_OPTIONS
  //     );
  //   }
  // }, [settings, setCookieSettings]);

  const switchTheme = (val: boolean) => {
    dispatch({
      type: UserContextActionTypes.SetStoredSettings,
      payload: { ...storedSettings, darkTheme: val },
    });
  };

  const navigate = useNavigate();

  const logOut = () => {
    googleLogout();
    updateItem('', { expires: addDays(new Date(), -1) });
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
          <Column lg="6" md="6" sm="6" xs="12" className="logo-col">
            <h1>
              <Link to="/mybudget">
                <img src={compLogo} alt="Competence budget" />
                Competence budget
              </Link>
            </h1>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12" alignItems="flex-end">
            <ProfileWrapper>
              {googleUser && (
                <DropMenuButton
                  fromRight
                  id="user-menu"
                  label={
                    <UserButton>
                      <UserName>{googleUser.name}</UserName>
                      <UserImage
                        url={googleUser.picture}
                        size={50}
                        alt={googleUser.name}
                      />
                    </UserButton>
                  }
                >
                  <ListSwitch>
                    <Label htmlFor="is-darkmode">Darkmode</Label>
                    <ToggleSwitch
                      id="is-darkmode"
                      name="is-darkmode"
                      checked={Boolean(storedSettings?.darkTheme)}
                      onChange={(val) => switchTheme(val)}
                    />
                  </ListSwitch>
                  {isAdmin && (
                    <Button
                      priority="tertiary"
                      onClick={() => navigate('/admin')}
                    >
                      Admin
                    </Button>
                  )}
                  <Button priority="tertiary" onClick={logOut}>
                    Log out
                  </Button>
                </DropMenuButton>
              )}
            </ProfileWrapper>
          </Column>
        </Grid>
      </Header>
      <Content>{children}</Content>
    </PageWrapper>
  );
};
