// import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import {Button, ButtonProps,Image} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import {
    HeroLayout2, DeviceCreateForm, DeviceList, NavBarHeader,HeroLayout1, NavBarHeader2, MarketingPricing, Features2x2, CTASection,MarketingFooter
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
            {/*<header className="App-header">*/}
                <NavBarHeader2  overrides={{
                    Contact: {
                        color: "rgba(13,10,38,39)",
                        children:"Device",

                    },
                    Button39493466:{
                        children: "Register",
                        variation:"warning",
                        onClick: () => alert(`Saving forms`)
                        // onClick: () => <a href="Aws"></a>
                    }

                }}/>

                <HeroLayout2></HeroLayout2>
                <MarketingPricing></MarketingPricing>
                <Features2x2></Features2x2>
                <CTASection></CTASection>
                <MarketingFooter></MarketingFooter>



            {/*</header>*/}
        </div>
    );
}

export default App;
