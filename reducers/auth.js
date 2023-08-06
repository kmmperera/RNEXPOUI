
const initState = {
signin:false,
authenticating:false,
error:null,
loggedin:false,
signup:false,
user:{
	firstName: '',
    lastName: '',
    email: '',
	role:'',
	pofilePicture:null,
	_id:'',
	following:[],
        
	},
token:null,	
signinrequest:false,
signuprequest:false,

}

 const auth=(state = initState, action) => {
	switch (action.type) {
	case "authenticating":
            state = {
                ...state,
                authenticating: true,
				error:null,
				loggedin:false,
            }
            break;

	case "loginsuccess":
            state = {
                ...state,
		user:action.payload.user,
                authenticating: false,
				error:null,
				loggedin:true,
				token:action.payload.token,
				signinrequest:false,
				
            }
            break;

	case "loginfailed":
            state = {
                ...state,
				error:action.payload.error,
				signinrequest:false,
		
            }
            break;
	case "updatesuccess":
	state = {
                ...state,
				user:action.payload.user,
                
            }
            break;
	case "updatefailed":
	state = {
                ...state,
		        error:action.payload.error,
		
            }
            break;
	case "logout":
		state={
			
			...initState,
		}
	break;
	case "signupsuccess":
		state={
			
			...initState,
			signup:true,
			signuprequest:false,
			
		}
	break;
	case "signupfailed":
		state={
			
			...initState,
		 error:action.payload.error,
		 signuprequest:false,
		}
	break;

	case "propicchangeforauth":
	state = {
		...state,
		user: {...state.user , ...action.payload.updatedUser},


	}
	break;

	case "loginrequest" :

	state ={
		...state,
		signinrequest:true,
	}
	break;

	case "signuprequest" :

	state ={
		...state,
		signuprequest:true,
	}
	break;




default:
		state={...state,}
	
	

	}
return state;
}
export default auth;