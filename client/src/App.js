import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SingleProduct from './pages/SingleProduct';
import Footer from "./components/Footer";
import Nav from "./components/Nav";

import { Grid, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { Select, FormControl, MenuItem, OutlinedInput, InputLabel } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector} from 'react-redux';
import { CHANGE_PAGE_THEME } from "./utils/actions";
import CoffeeTheme from "./themes/coffee";
import MintTheme from "./themes/mint";
import IceTheme from "./themes/ice";

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)


    const handleChange = (event) => {
        const newTheme = event.target.value

        if(newTheme === MintTheme){
           return dispatch({
                type: CHANGE_PAGE_THEME,
                theme: MintTheme
            })
        }
        if(newTheme === CoffeeTheme){
           return dispatch({
                type: CHANGE_PAGE_THEME,
                theme: CoffeeTheme
            })
        }
        if(newTheme === IceTheme){
            return dispatch({
                type: CHANGE_PAGE_THEME,
                theme: IceTheme
            })
        }
        else{
            return dispatch({
                type: CHANGE_PAGE_THEME,
                theme: CoffeeTheme
            })
        }
        //need to add localstorage save to keep persistence
    };

    return (
        <ThemeProvider theme={state.theme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ mb:2 }}>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                                The Coffee Shop
                            </Typography>
                            <FormControl variant="outlined" sx={{ width: "15%" }}>
                                <InputLabel shrink htmlFor="select-theme">Choose Theme:</InputLabel>
                                <Select
                                    labelId="select-theme-label"
                                    id="select-theme"
                                    value={state.theme}
                                    onChange={handleChange}
                                    variant="outlined"
                                    input={ 
                                        <OutlinedInput
                                            labelwidth={20}
                                            notched={true}
                                            shrink="true"
                                        />
                                    }
                                >
                                    <MenuItem value={CoffeeTheme} id="coffee">Creamy Coffee</MenuItem>
                                    <MenuItem value={MintTheme} id="mint">Minty Mocha</MenuItem>
                                    <MenuItem value={IceTheme} id="ice">Icy Coffee</MenuItem>
                                </Select>
                            </FormControl>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <ApolloProvider client={client}>
                    <Router>
                        <div>
                            <Nav />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={Signup} />
                                <Route exact path="/products/:id" component={SingleProduct} />
                            </Switch>
                        </div>
                    </Router>
                </ApolloProvider>
                <Footer />
            </Container>
        </ThemeProvider>
    );
}

export default App;
