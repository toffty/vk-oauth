import React from 'react';
import axios from 'axios'
import {createBrowserHistory} from 'history'
import * as qs from 'query-string';

class Auth extends React.Component{
    history = new createBrowserHistory();
    client_id = '754024'
    say = ()=>{
        this.history.push('https://oauth.vk.com/authorize?client_id=7540247&redirect_uri=http://localhost:3000/&scope=friends&display=page&response_type=code')

    }
    componentDidMount() {
        const parsed = qs.parse(this.props.location.search);
        if (parsed.code){
            this.history.push('https://oauth.vk.com/access_token?client_id=7540247&client_secret=M9eKUgWBU7XBrrilCJQZ&redirect_uri=http://localhost:3000/&code='+ parsed.code)
        }

    }

    render() {
        return(
            <div>Hello
            <button onClick={this.say}>KEKW</button>
            </div>
        )
    }
}

export default Auth
