import * as React from 'react';
import Button from '@material-ui/core/Button';
import './assets/App.css';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>,
    <Container maxWidth="xs" className="login-container ">
          <form noValidate autoComplete="off">
            <div class="form-content">
                <TextField id="outlined-basic" size="small" label="Outlined" variant="outlined"/>
                <TextField id="outlined-basic" size="small"  label="Outlined" variant="outlined"/>
                <Button variant="contained"  size="small" color="primary">
                  Sign In
                </Button>
                <Button variant="contained"  size="small" color="success">
                  Sign Up
                </Button>
            </div>
          </form>
    </Container>
  );
}

export default App;