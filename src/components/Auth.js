import React from 'react';
import axios from 'axios-jsonp-pro'
import {createBrowserHistory} from 'history'
import * as qs from 'query-string';


class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            data:{
                response:{
                    items: [],
                    count: 0,
                }
            },
            auth: false,
            user: []
        }
    }
    history = new createBrowserHistory();
    get_token = ()=>{
        this.history.push('https://oauth.vk.com/authorize?client_id=7540247&redirect_uri=https://tofftytestoauth.netlify.app/&scope=friends&display=page&response_type=token');

    }
    exit =  ()=>{
        localStorage.clear();
        window.location.hash = "";
        window.location.reload();
    }
    renderData = ()=>{
        if (this.state.auth && this.state.data.response){
           /* console.log(this.state.data.response.items.length)*/
            if(this.state.data.response.items.length === 0){
               return <div>You have no friends</div>
            }

                return this.state.data.response.items
                    .map(person =>
                            <div className="friend">

                                <img src={person.photo_200} className="friend__photo" alt="user_photo"/>
                                <span>
                        {person.first_name}
                    </span>
                                <span>
                        {person.last_name}
                    </span>
                            </div>
                    )



        }
        else {
            return <div>Please Log in</div>
        }

    }
    renderName = ()=>{
        if (this.state.user.response){
            return <div>
                <span>
                    Hello &#160;
                </span>

                <span>
                    {this.state.user.response[0].first_name} &#160;
                </span>
                <span>
                    {this.state.user.response[0].last_name} &#160;
                </span>

            </div>
        }
    }
     componentDidMount() {
        console.log(this.state.auth);
        const parsed = qs.parse(this.props.location.hash);
         window.location.hash = "";
        if (localStorage.getItem('token')!== parsed.access_token && parsed.access_token !== undefined){
            localStorage.setItem('token', parsed.access_token);


        }
         axios.jsonp('https://api.vk.com/method/friends.search',{
             params:{
                 access_token: localStorage.getItem('token'),
                 v: '5.52',
                 count: '5',
                 fields: 'photo_200'
             }
         })
             .then((response) => {
                 this.setState({
                     data: response,
                     auth: true
                 });


             }).catch((err) => {
             console.log(err);
         });
         axios.jsonp('https://api.vk.com/method/users.get',{
             params:{
                 access_token: localStorage.getItem('token'),
                 v: '5.52',

             }
         })
             .then((response) => {
                 this.setState({
                     user: response
                 });

                 //console.log(response);
             }).catch((err) => {
             console.log(err);
         });



    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.data !== nextState.data;
    }

    render() {
        return(
                <div className="main">
                    <div>
                        {
                            this.renderName()
                        }
                    </div>
                    {

                        this.renderData()
                    }
                    <button onClick={this.get_token} className="main__button">Login</button>
                    <button onClick={this.exit} className="main__button">Exit</button>
                </div>
        )
    }
}

export default Auth;
