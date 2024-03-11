// import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import {Button, ButtonProps,Image} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import {
    HeroLayout2,DeviceCreateForm,DeviceList,NavBarHeader,NavBarHeader2
} from './ui-components';


import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {DeviceCreateFormInputValues} from "./ui-components/DeviceCreateForm";
import {PrimitiveOverrideProps} from "./ui-components/NavBarHeader2";

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);


function test() {
    return <Button variation="primary">Hello world</Button>;
}

// export default App;

// let buttonProps = ButtonProps;

function App() {
    // @ts-ignore
    return (
        <div className="App">
            <header className="App-header">
                <NavBarHeader2></NavBarHeader2>
                {/*<NavBarHeader2 Button39493466:PrimitiveOverrideProps<ButtonProps> />*/}
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                {/*<p>*/}
                {/*    test Edit <code>src/App.tsx</code> and save to reload.*/}
                {/*</p>*/}
                <Authenticator>
                    {({signOut, user}) => (
                        <main>
                            {/*<h1>Hello {user.username}</h1>*/}
                            <button onClick={signOut}>Sign out</button>
                        </main>
                    )}
                </Authenticator>

                {/*<DeviceCreateForm onSuccess/ >*/}
                <DeviceCreateForm></DeviceCreateForm>

                {/*    import {*/}
                {/*    DeviceList*/}
                {/*} from './ui-components';*/}

                <DeviceList/>

                <HeroLayout2/>
                <Button variation="primary">hello amplify</Button>

                <a href="https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/RTL8710/aws_amplify/tree/main">
                <Image alt={"Deploy to Amplify Hosting"} src={"https://oneclick.amplifyapp.com/button.svg"}></Image>
                </a>

            </header>
        </div>
    );
}

export default App;
